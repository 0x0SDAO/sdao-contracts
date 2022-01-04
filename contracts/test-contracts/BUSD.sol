// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/ERC20.sol";
import "../libraries/Ownable.sol";

contract BUSD is Ownable, ERC20 {
    uint256 public constant SUPPLY = 4850999388 * 10**18;

    constructor() ERC20("Binance Peg BUSD", "BUSD", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
