// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/ERC20.sol";
import "../libraries/Ownable.sol";

contract ETH is Ownable, ERC20 {
    uint256 public constant SUPPLY = 1404999 * 10**18;

    constructor() ERC20("Binance Peg Ethereum", "ETH", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
