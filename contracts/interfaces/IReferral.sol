// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

interface IReferral {
    function calcRewards(
        bytes32 code_,
        uint256 payout_,
        address depositor_
    ) external view returns (uint256, uint256);

    function depositRewards(bytes32 code_, uint256 rewards_) external;
}