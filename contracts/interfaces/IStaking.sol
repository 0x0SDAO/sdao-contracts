// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

interface IStaking {
    function stake(address _to, uint256 _amount, bool _claim) external returns (uint256);
    function claim(address _recipient) external returns (uint);
    function unstake(address _to, uint256 _amount, bool _trigger) external returns (uint256);
    function forfeit() external returns (uint);
    function index() external view returns (uint);
    function supplyInWarmup() external view returns (uint);
    function secondsToNextEpoch() external view returns (uint);
    function rebase() external returns (uint256);
}