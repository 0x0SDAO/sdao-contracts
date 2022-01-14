// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/ERC20.sol";
import "../libraries/Ownable.sol";

contract DAI is Ownable, ERC20 {
    uint256 public constant SUPPLY = 335559271 * 10e18;

    constructor() ERC20("DAI Stablecoin", "DAI", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
