// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./interfaces/IBEP20.sol";
import "./libraries/SafeMath.sol";

contract ScholarDogeCirculatingSupply {
    using SafeMath for uint;

    bool public isInitialized;

    address public SDOGE;
    address public owner;
    address[] public nonCirculatingSDOGEAddresses;


    constructor( address _owner ) {
        owner = _owner;
    }

    function initialize( address _sdoge ) external returns ( bool ) {
        require( msg.sender == owner, "caller is not owner" );
        require( isInitialized == false );

        SDOGE = _sdoge;

        isInitialized = true;

        return true;
    }

    function SDOGECirculatingSupply() external view returns ( uint ) {
        uint _totalSupply = IBEP20( SDOGE ).totalSupply();

        uint _circulatingSupply = _totalSupply.sub( getNonCirculatingSDOGE() );

        return _circulatingSupply;
    }

    function getNonCirculatingSDOGE() public view returns ( uint ) {
        uint _nonCirculatingSDOGE;

        for( uint i=0; i < nonCirculatingSDOGEAddresses.length; i = i.add( 1 ) ) {
            _nonCirculatingSDOGE = _nonCirculatingSDOGE.add( IBEP20( SDOGE ).balanceOf( nonCirculatingSDOGEAddresses[i] ) );
        }

        return _nonCirculatingSDOGE;
    }

    function setNonCirculatingSDOGEAddresses( address[] calldata _nonCirculatingAddresses ) external returns ( bool ) {
        require( msg.sender == owner, "Sender is not owner" );
        nonCirculatingSDOGEAddresses = _nonCirculatingAddresses;

        return true;
    }

    function transferOwnership( address _owner ) external returns ( bool ) {
        require( msg.sender == owner, "Sender is not owner" );

        owner = _owner;

        return true;
    }
}