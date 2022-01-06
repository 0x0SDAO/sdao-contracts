// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './interfaces/IBEP20.sol';

contract StakingWarmup {

    address public immutable staking;
    address public immutable sSDOGE;

    constructor ( address _staking, address _sSDOGE ) {
        require( _staking != address(0) );
        staking = _staking;
        require( _sSDOGE != address(0) );
        sSDOGE = _sSDOGE;
    }

    function retrieve( address _staker, uint _amount ) external {
        require( msg.sender == staking );
        IBEP20( sSDOGE ).transfer( _staker, _amount );
    }
}