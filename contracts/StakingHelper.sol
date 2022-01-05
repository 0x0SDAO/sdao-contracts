// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './interfaces/IBEP20.sol';
import './interfaces/IStaking.sol';

contract StakingHelper {

    address public immutable staking;
    address public immutable SDOGE;

    constructor ( address _staking, address _SDOGE ) {
        require( _staking != address(0) );
        staking = _staking;
        require( _SDOGE != address(0) );
        SDOGE = _SDOGE;
    }

    function stake( uint _amount ) external {
        IBEP20( SDOGE ).transferFrom( msg.sender, address(this), _amount );
        IBEP20( SDOGE ).approve( staking, _amount );
        IStaking( staking ).stake( _amount, msg.sender );
        IStaking( staking ).claim( msg.sender );
    }
}