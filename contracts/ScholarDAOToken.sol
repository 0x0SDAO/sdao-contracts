// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './interfaces/IERC20Burnable.sol';
import './libraries/SafeMath.sol';
import './libraries/ERC20.sol';
import './libraries/ERC20Permit.sol';
import './libraries/VaultOwned.sol';

contract ScholarDAOToken is ERC20Permit, VaultOwned {
    using SafeMath for uint256;

    address public immutable psdao;

    constructor(address _psdao) ERC20("ScholarDAO token", "SDAO", 9) {
        psdao = _psdao;
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
            "ERC20: burn amount exceeds allowance"
        );

        _approve(account_, msg.sender, decreasedAllowance_);
        _burn(account_, amount_);
    }

    /**
        @notice Claims SDAO from PSDAO
    */
    function claimWithPSDAO() external {
        uint amountToClaim = IERC20( psdao ).balanceOf(msg.sender);

        IERC20Burnable( psdao ).burnFrom(msg.sender, amountToClaim);
        _mint( msg.sender, amountToClaim );
    }
}