// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/ERC20.sol";
import "../libraries/Ownable.sol";

contract USDC18 is Ownable, ERC20 {
    uint256 public constant SUPPLY = 640254840 * 10e18;

    constructor() ERC20("USD9 coin", "USDC9", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
