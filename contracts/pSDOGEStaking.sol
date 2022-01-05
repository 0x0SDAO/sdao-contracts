// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/Ownable.sol";
import "./libraries/SafeMath.sol";
import "./libraries/SafeERC20.sol";

import "./interfaces/IERC20Burnable.sol";
import "./interfaces/IPSDOGE.sol";
import "./interfaces/ISDOGE.sol";
import "./interfaces/IReservoir.sol";

contract pDOGEStaking is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public immutable pDOGE;
    address public immutable sdoge;
    address public immutable tokenIn;
    address public immutable reservoir;

    struct Term {
        uint256 percent; // 4 decimals ( 5000 = 0.5% )
        uint256 claimed;
        uint256 max;
    }
    mapping(address => Term) public terms;
    mapping(address => address) public walletChange;

    event LogRedeem(address indexed account, uint256 tokenInAmount, uint256 tokenOutAmount);
    event LogChangeWallet(address indexed oldWallet, address newWallet);

    constructor(
        address sdoge_,
        address pDOGE_,
        address tokenIn_,
        address reservoir_
    ) {
        require(pDOGE_ != address(0));
        pDOGE = pDOGE_;
        require(sdoge_ != address(0));
        sdoge = sdoge_;
        require(tokenIn_ != address(0));
        tokenIn = tokenIn_;
        require(reservoir_ != address(0));
        reservoir = reservoir_;
    }

    // Sets terms for a new wallet
    function setTerms(
        address vester_,
        uint256 amountCanClaim_,
        uint256 rate_
    ) external onlyOwner() returns (bool) {
        require(amountCanClaim_ >= terms[vester_].max, "cannot lower amount claimable");
        require(rate_ >= terms[vester_].percent, "cannot lower vesting rate");

        terms[vester_].max = amountCanClaim_;
        terms[vester_].percent = rate_;

        return true;
    }

    // Allows wallet to redeem pDOGE for SDOGE
    function redeem(uint256 amount_) external returns (bool) {
        Term memory info = terms[msg.sender];
        require(redeemable(info) >= amount_, "Not enough vested");
        require(info.max.sub(info.claimed) >= amount_, "Claimed over max");

        terms[msg.sender].claimed = info.claimed.add(amount_);

        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amount_);
        IPSDOGE(pDOGE).burnFrom(msg.sender, amount_);

        IERC20(tokenIn).safeIncreaseAllowance(reservoir, amount_);
        uint256 sdogeAmount = IReservoir(reservoir).deposit(tokenIn, amount_, 0);

        IERC20(sdoge).safeTransfer(msg.sender, sdogeAmount);

        emit LogRedeem(msg.sender, amount_, sdogeAmount);

        return true;
    }

    // Allows wallet owner to transfer rights to a new address
    function transferWallet(address newWallet_) external returns (bool) {
        require(terms[msg.sender].percent != 0);
        walletChange[msg.sender] = newWallet_;
        return true;
    }

    // Allows wallet to pull rights from an old address
    function acceptWalletChange(address oldWallet_) external returns (bool) {
        require(walletChange[oldWallet_] == msg.sender, "Wallet not transfer");

        walletChange[oldWallet_] = address(0);
        terms[msg.sender] = terms[oldWallet_];
        delete terms[oldWallet_];

        emit LogChangeWallet(oldWallet_, msg.sender);

        return true;
    }

    // Amount a wallet can redeem based on current supply
    function redeemableFor(address vester_) public view returns (uint256) {
        return redeemable(terms[vester_]);
    }

    function redeemable(Term memory info_) internal view returns (uint256 redeemable_) {
        uint256 totalRedeemable = ISDOGE(sdoge).circulatingSupply().mul(info_.percent).mul(1000);
        uint256 claimed = info_.claimed;
        if (totalRedeemable > claimed) {
            redeemable_ = (totalRedeemable).sub(claimed);
        } else {
            redeemable_ = 0;
        }
    }
}
