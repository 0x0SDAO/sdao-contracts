// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "../libraries/BEP20.sol";
import "../libraries/Ownable.sol";

contract BUSDT is Ownable, BEP20 {
    uint256 public constant SUPPLY = 3879997922 * 10**18;

    constructor() BEP20("BUSDT Stablecoin", "BUSDT", 18) {
        _mint(msg.sender, SUPPLY);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
