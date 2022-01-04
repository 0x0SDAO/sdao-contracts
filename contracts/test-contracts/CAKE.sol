// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/ERC20.sol";
import "../libraries/Ownable.sol";

contract CAKE is Ownable, ERC20 {
    uint256 public constant SUPPLY = 587071911 * 10**18;

    constructor() ERC20("Pancake token", "CAKE", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}