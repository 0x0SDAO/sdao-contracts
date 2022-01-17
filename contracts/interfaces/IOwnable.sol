// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

interface IOwnable {
    function renounceManagement() external;

    function pushManagement( address newOwner_ ) external;

    function pullManagement() external;
}