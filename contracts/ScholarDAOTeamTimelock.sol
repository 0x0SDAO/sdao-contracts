// SPDX-License-Identifier: MIT

pragma solidity 0.7.5;

import "./libraries/SafeERC20.sol";
import "./libraries/SafeMath.sol";

/**
 * @dev A token holder contract that will allow a beneficiary to extract
 * a % of tokens after a given interval time.
 */
contract ScholarDAOTeamTimelock {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Defines the release interval
    uint256 constant public RELEASE_PERCENTAGE = 4;
    
    // Defines the release interval
    uint256 constant public RELEASE_INTERVAL = 15 days;
    
    uint256 public releaseAmount;
    
    uint256 public nextWithdraw = block.timestamp;
    
    uint256 public baseTokenAmount;

    // ERC20 basic token contract being held
    IERC20 public token;

    // beneficiary of tokens, set to multisig wallet
    address public beneficiary;
    
    event TeamTokensWithdrawn(uint256 indexed amount);

    constructor(IERC20 _token, address _beneficiary) {
        token = _token;
        beneficiary = _beneficiary;
    }
    
    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function release() external virtual {
        require(
            block.timestamp >= nextWithdraw,
            "Cannot claim before release time"
        );
            
        nextWithdraw = nextWithdraw + RELEASE_INTERVAL;
        
        if (baseTokenAmount == 0)
            baseTokenAmount = token.balanceOf(address(this));

        uint256 amount = getReleaseAmount();

        require(
            amount > 0,
            "No tokens to release"
        );

        token.safeTransfer(beneficiary, amount);
    }
    
    function getReleaseAmount() public view returns (uint256) {
        uint256 amount = baseTokenAmount * RELEASE_PERCENTAGE / 100;
        uint256 currentBalance = token.balanceOf(address(this));

        if (amount > currentBalance)
            return currentBalance;
            
        return amount;
    }
}

