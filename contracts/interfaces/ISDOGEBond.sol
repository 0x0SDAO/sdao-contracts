// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

interface ISDOGEBond {
    function deposit(
        uint256 amount_,
        uint256 maxPrice_,
        address depositor_,
        bytes32 referralCode_
    ) external returns (uint256);

    function isLiquidityBond() external view returns (bool);

    function tokenIn() external view returns (address);

    function sdogeValue(uint256 amount_) external view returns (uint256 value_, address token_);
}
