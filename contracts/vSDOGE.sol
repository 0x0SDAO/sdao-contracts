// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/ERC20.sol";
import "./libraries/Ownable.sol";

contract vSDOGE is Ownable, ERC20 {
    constructor(address treasury_) ERC20("Voucher ScholarDoge", "vSDOGE", 9) {
        require(treasury_ != address(0), "Treasury undefined");
        _mint(treasury_, 50000000000000);
    }

    function burn(uint256 amount_) external {
        _burn(msg.sender, amount_);
    }
}
