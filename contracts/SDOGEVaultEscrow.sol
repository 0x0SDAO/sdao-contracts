// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/SafeERC20.sol";

contract SDOGEVaultEscrow {
    using SafeERC20 for IERC20;

    address public immutable sdogeVault;
    address public immutable sSDOGE;

    constructor(address vault_, address sSDOGE_) {
        require(vault_ != address(0));
        sdogeVault = vault_;
        require(sSDOGE_ != address(0));
        sSDOGE = sSDOGE_;
    }

    function retrieve(address recipient_, uint256 amount_) external {
        require(msg.sender == sdogeVault);
        IERC20(sSDOGE).safeTransfer(recipient_, amount_);
    }
}
