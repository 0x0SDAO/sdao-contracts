// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

interface ISDOGEStaking {
    function stake(uint256 amount_, address recipient_) external returns (uint256);
}