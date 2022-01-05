// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/Ownable.sol";
import "./libraries/SafeERC20.sol";
import "./libraries/SafeMath.sol";

contract vSDOGEStaking is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    uint256 public immutable redeemEndBlock;

    IERC20 public immutable sdoge;
    IERC20 public immutable vSDOGE;

    mapping(address => uint256) public userInfo;

    modifier redemptionEnded() {
        require(block.number > redeemEndBlock, "Redemption period has not ended");
        _;
    }

    modifier redemptionNotEnd() {
        require(block.number < redeemEndBlock, "Redemption period has ended");
        _;
    }

    constructor(
        address sdoge_,
        address vSDOGE_,
        uint256 redeemPeriod_ // in blocks
    ) {
        require(sdoge_ != address(0), "Address cannot be zero");
        sdoge = IERC20(sdoge_);
        require(vSDOGE_ != address(0), "Address cannot be zero");
        vSDOGE = IERC20(vSDOGE_);
        redeemEndBlock = block.number.add(redeemPeriod_);
    }

    function redeem(uint256 amount) external redemptionNotEnd() {
        require(vSDOGE.balanceOf(msg.sender) >= amount, "Not enough balance");

        userInfo[msg.sender] = userInfo[msg.sender].add(amount);

        vSDOGE.safeTransferFrom(msg.sender, address(this), amount);
        sdoge.safeTransfer(msg.sender, amount);
    }

    function reclaim() external redemptionEnded() {
        require(userInfo[msg.sender] > 0, "No vSDOGE to withdraw");

        uint256 amount = userInfo[msg.sender];
        userInfo[msg.sender] = 0;
        vSDOGE.safeTransfer(msg.sender, amount);
    }

    function withdraw() external onlyOwner() redemptionEnded() {
        uint256 amount = sdoge.balanceOf(address(this));
        sdoge.safeTransfer(msg.sender, amount);
    }
}
