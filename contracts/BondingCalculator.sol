// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './libraries/FixedPoint.sol';
import './libraries/SafeMath.sol';
import './interfaces/IBondingCalculator.sol';
import './interfaces/IBEP20.sol';
import './interfaces/IPancakePair.sol';

contract BondingCalculator is IBondingCalculator {

    using FixedPoint for uint;
    using FixedPoint for FixedPoint.uq112x112;
    using SafeMath for uint;
    using SafeMath for uint112;

    address public immutable SDOGE;

    constructor( address _SDOGE ) {
        require( _SDOGE != address(0) );
        SDOGE = _SDOGE;
    }

    function getKValue( address _pair ) public view returns( uint k_ ) {
        uint token0 = IBEP20( IPancakePair( _pair ).token0() ).decimals();
        uint token1 = IBEP20( IPancakePair( _pair ).token1() ).decimals();
        uint decimals = token0.add( token1 ).sub( IBEP20( _pair ).decimals() );

        (uint reserve0, uint reserve1, ) = IPancakePair( _pair ).getReserves();
        k_ = reserve0.mul(reserve1).div( 10 ** decimals );
    }

    function getTotalValue( address _pair ) public view returns ( uint _value ) {
        _value = getKValue( _pair ).sqrrt().mul(2);
    }

    function valuation( address _pair, uint amount_ ) external view override returns ( uint _value ) {
        uint totalValue = getTotalValue( _pair );
        uint totalSupply = IPancakePair( _pair ).totalSupply();

        _value = totalValue.mul( FixedPoint.fraction( amount_, totalSupply ).decode112with18() ).div( 1e18 );
    }

    function markdown( address _pair ) external view returns ( uint ) {
        ( uint reserve0, uint reserve1, ) = IPancakePair( _pair ).getReserves();

        uint reserve;
        if ( IPancakePair( _pair ).token0() == SDOGE ) {
            reserve = reserve1;
        } else {
            reserve = reserve0;
        }
        return reserve.mul( 2 * ( 10 ** IBEP20( SDOGE ).decimals() ) ).div( getTotalValue( _pair ) );
    }
}
