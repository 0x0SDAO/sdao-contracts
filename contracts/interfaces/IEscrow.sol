// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

interface IEscrow {
    function retrieve(address recipient, uint256 amount) external;
}