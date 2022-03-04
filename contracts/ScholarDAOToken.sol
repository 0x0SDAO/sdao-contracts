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

    bool public claimEnabled;
    bool public safeLaunch = true;
    address public pair;

    // Stores the last buy / sells timestamp per address
    mapping(address => uint256) private safeLaunchDexCalls;

    constructor(address _psdao) ERC20("ScholarDAO token", "$SDAO", 9) {
        require(_psdao != address(0), "ScholarDAO: $PSDAO cannot be 0 address");
        psdao = _psdao;
    }

    function enableClaim() external onlyOwner() {
        claimEnabled = true;
    }

    function disableSafeLaunch() external onlyOwner() {
        safeLaunch = false;
    }

    function setPair(address pair_) external onlyOwner() {
        pair = pair_;
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

    function _beforeTokenTransfer(
        address sender,
        address recipient,
        uint256 amount
    )
        internal
        virtual
        override
    {
        if (safeLaunch) {
            // Checks if buying or selling tokens
            if (recipient == pair) {
                // Checks if already sold during this block
                require(
                     block.timestamp > safeLaunchDexCalls[sender],
                    "Already interacted with dex pair during this block"
                );

                safeLaunchDexCalls[sender] = block.timestamp + 120;
            } else if (sender == pair) {
                // Checks if bought during block => prevent sandwich
                safeLaunchDexCalls[recipient] = block.timestamp + 120;
            }
        }
    }

    /**
        @notice Claims SDAO from PSDAO
    */
    function claimWithPSDAO() external {
        require(claimEnabled, "Claim not enabled yet");
        uint amountToClaim = IERC20( psdao ).balanceOf(msg.sender);

        IERC20Burnable( psdao ).burnFrom(msg.sender, amountToClaim);
        _mint( msg.sender, amountToClaim );
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
}