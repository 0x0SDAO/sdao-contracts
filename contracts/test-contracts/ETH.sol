// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/BEP20.sol";
import "../libraries/Ownable.sol";

contract ETH is Ownable, BEP20 {
    uint256 public constant SUPPLY = 1404999 * 10**18;

    constructor() BEP20("Binance Peg Ethereum", "ETH", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
