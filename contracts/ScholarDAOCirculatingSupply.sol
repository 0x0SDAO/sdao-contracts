// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./interfaces/IERC20.sol";
import "./libraries/SafeMath.sol";

contract ScholarDAOCirculatingSupply {
    using SafeMath for uint;

    bool public isInitialized;

    address public sdao;
    address public owner;
    address[] public nonCirculatingSDAOAddresses;

    constructor( address _owner ) {
        owner = _owner;
    }

    function initialize( address _sdao ) external returns ( bool ) {
        require( msg.sender == owner, "caller is not owner" );
        require( isInitialized == false );

        sdao = _sdao;

        isInitialized = true;

        return true;
    }

    function sdaoCirculatingSupply() external view returns ( uint ) {
        uint _totalSupply = IERC20( sdao ).totalSupply();

        uint _circulatingSupply = _totalSupply.sub( getNonCirculatingSDAO() );

        return _circulatingSupply;
    }

    function getNonCirculatingSDAO() public view returns ( uint ) {
        uint _nonCirculatingSDAO;

        for( uint i=0; i < nonCirculatingSDAOAddresses.length; i = i.add( 1 ) ) {
            _nonCirculatingSDAO = _nonCirculatingSDAO.add( IERC20( sdao ).balanceOf( nonCirculatingSDAOAddresses[i] ) );
        }

        return _nonCirculatingSDAO;
    }

    function setNonCirculatingSDAOAddresses( address[] calldata _nonCirculatingAddresses ) external returns ( bool ) {
        require( msg.sender == owner, "Sender is not owner" );
        nonCirculatingSDAOAddresses = _nonCirculatingAddresses;

        return true;
    }

    function transferOwnership( address _owner ) external returns ( bool ) {
        require( msg.sender == owner, "Sender is not owner" );

        owner = _owner;

        return true;
    }
}