// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/SafeERC20.sol";

contract SDOGEStakingEscrow {
    using SafeERC20 for IERC20;

    address public immutable sdogeStaking;
    address public immutable sSDOGE;

    constructor(address staking_, address sSDOGE_) {
        require(staking_ != address(0));
        sdogeStaking = staking_;
        require(sSDOGE_ != address(0));
        sSDOGE = sSDOGE_;
    }

    function retrieve(address recipient_, uint256 amount_) external {
        require(msg.sender == sdogeStaking);
        IERC20(sSDOGE).safeTransfer(recipient_, amount_);
    }
}
