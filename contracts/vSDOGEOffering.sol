// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/SafeERC20.sol";
import "./libraries/Ownable.sol";

contract vSDOGEOffering is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public immutable vSDOGE;
    address public immutable tokenIn;
    address public immutable treasury;

    uint256 public rate;
    uint256 public endBlock;
    bool public offeringStarted;

    uint256 public totalWhiteListed;

    mapping(address => bool) participants;
    mapping(address => bool) whiteListed;

    event LogStart(uint256 rate, uint256 startBlock, uint256 endBlock);
    event LogWhiteListBuyers(address[] buyers);

    modifier notStarted() {
        require(!offeringStarted, "Already started");
        _;
    }

    modifier notEnded() {
        require(offeringStarted && block.number <= endBlock, "Offering is over");
        _;
    }

    modifier notRunning() {
        require(!offeringStarted || block.number > endBlock, "Offering still running");
        _;
    }

    constructor(
        address vSDOGE_,
        address tokenIn_,
        address treasury_
    ) {
        require(vSDOGE_ != address(0), "vSDOGE undefined");
        vSDOGE = vSDOGE_;
        require(tokenIn_ != address(0), "TokenIn undefined");
        tokenIn = tokenIn_;
        require(treasury_ != address(0), "Treasury undefined");
        treasury = treasury_;
    }

    function start(uint256 rate_, uint256 offeringPeriod_) external onlyOwner() notStarted() {
        require(rate_ > 0, "Rate cannot be zero");
        rate = rate_;
        endBlock = block.number.add(offeringPeriod_);
        offeringStarted = true;

        emit LogStart(rate, block.number, endBlock);
    }

    function whiteListBuyers(address[] memory buyers_) external onlyOwner() notStarted() {
        totalWhiteListed = totalWhiteListed.add(buyers_.length);

        for (uint256 i = 0; i < buyers_.length; i++) {
            whiteListed[buyers_[i]] = true;
        }

        emit LogWhiteListBuyers(buyers_);
    }

    function buyToken(uint256 tokenInAmount_) external notEnded() {
        require(whiteListed[msg.sender], "Not whitelisted");
        require(!participants[msg.sender], "Already participated");

        participants[msg.sender] = true;

        uint256 purchaseAmount = getRate(tokenInAmount_);

        require(purchaseAmount <= getCapPerBuyer(), "Over individual cap");
        totalWhiteListed = totalWhiteListed.sub(1);

        IERC20(tokenIn).safeTransferFrom(msg.sender, treasury, tokenInAmount_);
        IERC20(vSDOGE).safeTransfer(msg.sender, purchaseAmount);
    }

    function claimRemaining(address recipient_) external onlyOwner() notRunning() {
        require(recipient_ != address(0), "recipient undefined");
        IERC20(vSDOGE).safeTransfer(recipient_, IERC20(vSDOGE).balanceOf(address(this)));
    }

    function getCapPerBuyer() public view returns (uint256) {
        if (totalWhiteListed == 0) return 0;
        return IERC20(vSDOGE).balanceOf(address(this)).div(totalWhiteListed);
    }

    function getRate(uint256 tokenInAmount_) public view returns (uint256) {
        if (rate == 0) return 0;
        return uint256(1e9).mul(tokenInAmount_).div(rate);
    }
}
