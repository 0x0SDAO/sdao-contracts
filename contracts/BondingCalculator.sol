// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './libraries/FixedPoint.sol';
import './libraries/SafeMath.sol';
import './interfaces/IBondingCalculator.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Pair.sol';

contract BondingCalculator is IBondingCalculator {
    using FixedPoint for uint;
    using FixedPoint for FixedPoint.uq112x112;
    using SafeMath for uint;
    using SafeMath for uint112;

    address public immutable SDAO;

    constructor( address _SDAO ) {
        require( _SDAO != address(0) );
        SDAO = _SDAO;
    }

    function getKValue( address _pair ) public view returns( uint k_ ) {
        uint token0 = IERC20( IUniswapV2Pair( _pair ).token0() ).decimals();
        uint token1 = IERC20( IUniswapV2Pair( _pair ).token1() ).decimals();
        (uint reserve0, uint reserve1, ) = IUniswapV2Pair( _pair ).getReserves();
        uint pairDecimals = IERC20( _pair ).decimals();

        k_ = (token0.add(token1) >= pairDecimals) ?
            reserve0.mul(reserve1).div( 10 ** token0.add( token1 ).sub( pairDecimals ) ) :
                reserve0.mul(reserve1).mul( 10 ** pairDecimals.sub( token0.add( token1 ) ) );
    }

    function getTotalValue( address _pair ) public view returns ( uint _value ) {
        _value = getKValue( _pair ).sqrrt().mul(2);
    }

    function valuation( address _pair, uint amount_ ) external view override returns ( uint _value ) {
        uint totalValue = getTotalValue( _pair );
        uint totalSupply = IUniswapV2Pair( _pair ).totalSupply();

        _value = totalValue.mul( FixedPoint.fraction( amount_, totalSupply ).decode112with18() ).div( 1e18 );
    }

    function markdown( address _pair ) external view returns ( uint ) {
        ( uint reserve0, uint reserve1, ) = IUniswapV2Pair( _pair ).getReserves();

        uint reserve;
        if ( IUniswapV2Pair( _pair ).token0() == SDAO ) {
            reserve = reserve1;
        } else {
            reserve = reserve0;
        }
        return reserve.mul( 2 * ( 10 ** IERC20( SDAO ).decimals() ) ).div( getTotalValue( _pair ) );
    }
}
