// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/SafeMath.sol";
import "./libraries/Ownable.sol";
import "./libraries/SafeERC20.sol";

contract PrivateSale is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    event RateSet(uint256 oldRate, uint256 newRate);
    event BuyerApproval(address indexed buyer);

    IERC20 public tokenIn;

    IERC20 public pDOGE;

    address private treasury;

    uint256 public pDOGERate;

    mapping(address => bool) public approvedBuyers;

    constructor(
        address pDOGE_,
        address tokenIn_,
        uint256 pDOGERate_,
        address treasury_
    ) {
        pDOGE = IERC20(pDOGE_);
        tokenIn = IERC20(tokenIn_);
        pDOGERate = pDOGERate_;
        treasury = treasury_;
    }

    function setRate(uint256 newRate) external onlyOwner() returns (uint256) {
        uint256 oldRate = pDOGERate;
        pDOGERate = newRate;

        emit RateSet(oldRate, pDOGERate);

        return pDOGERate;
    }

    function _approveBuyer(address newBuyer_) internal onlyOwner() returns (bool) {
        approvedBuyers[newBuyer_] = true;
        emit BuyerApproval(newBuyer_);

        return approvedBuyers[newBuyer_];
    }

    function approveBuyer(address newBuyer_) external onlyOwner() returns (bool) {
        return _approveBuyer(newBuyer_);
    }

    function approveBuyers(address[] calldata newBuyers_) external onlyOwner() returns (uint256) {
        for (uint256 iteration_ = 0; newBuyers_.length > iteration_; iteration_++) {
            _approveBuyer(newBuyers_[iteration_]);
        }
        return newBuyers_.length;
    }

    function _calcAmountRaised(uint256 amountPaid_) internal view returns (uint256) {
        return amountPaid_.mul(pDOGERate);
    }

    function buySDOGE(uint256 amountPaid_) external returns (bool) {
        require(approvedBuyers[msg.sender], "Buyer not approved.");
        uint256 amountRaised = _calcAmountRaised(amountPaid_);
        tokenIn.safeTransferFrom(msg.sender, treasury, amountPaid_);
        pDOGE.safeTransfer(msg.sender, amountRaised);
        return true;
    }

    function withdrawTokens(address tokenToWithdraw_) external onlyOwner() returns (bool) {
        IERC20(tokenToWithdraw_).safeTransfer(msg.sender, IERC20(tokenToWithdraw_).balanceOf(address(this)));
        return true;
    }
}
