// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './libraries/SafeMath.sol';
import './libraries/BEP20.sol';
import './libraries/BEP20Permit.sol';
import './libraries/VaultOwned.sol';

contract ScholarDogeToken is BEP20Permit, VaultOwned {

    using SafeMath for uint256;

    constructor() BEP20("ScholarDoge token", "SDOGE", 9) {
    }

    function mint(address account_, uint256 amount_) external onlyVault() {
        _mint(account_, amount_);
    }

    function burn(uint256 amount) public virtual {
        _burn(msg.sender, amount);
    }

    function burnFrom(address account_, uint256 amount_) public virtual {
        _burnFrom(account_, amount_);
    }

    function _burnFrom(address account_, uint256 amount_) public virtual {
        uint256 decreasedAllowance_ =
        allowance(account_, msg.sender).sub(
            amount_,
            "BEP20: burn amount exceeds allowance"
        );

        _approve(account_, msg.sender, decreasedAllowance_);
        _burn(account_, amount_);
    }
}