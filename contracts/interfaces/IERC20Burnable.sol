// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./IERC20.sol";

interface IERC20Burnable is IERC20 {
    function burn(uint256 amount_) external;

    function burnFrom(address account_, uint256 amount_) external;
}