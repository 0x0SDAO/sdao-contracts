// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './libraries/SafeMath.sol';
import './libraries/SafeBEP20.sol';
import './libraries/Ownable.sol';
import './interfaces/IBEP20.sol';
import './interfaces/IStakedScholarDogeToken.sol';
import './interfaces/IWarmup.sol';
import './interfaces/IDistributor.sol';

contract Staking is Ownable {

    using SafeMath for uint256;
    using SafeBEP20 for IBEP20;

    address public immutable SDOGE;
    address public immutable sSDOGE;

    struct Epoch {
        uint length;
        uint number;
        uint endBlock;
        uint distribute;
    }
    Epoch public epoch;

    address public distributor;

    address public locker;
    uint public totalBonus;

    address public warmupContract;
    uint public warmupPeriod;

    constructor (
        address _SDOGE,
        address _sSDOGE,
        uint _epochLength,
        uint _firstEpochNumber,
        uint _firstEpochBlock
    ) {
        require( _SDOGE != address(0) );
        SDOGE = _SDOGE;
        require( _sSDOGE != address(0) );
        sSDOGE = _sSDOGE;

        epoch = Epoch({
        length: _epochLength,
        number: _firstEpochNumber,
        endBlock: _firstEpochBlock,
        distribute: 0
        });
    }

    struct Claim {
        uint deposit;
        uint gons;
        uint expiry;
        bool lock; // prevents malicious delays
    }
    mapping( address => Claim ) public warmupInfo;

    /**
        @notice stake SDOGE to enter warmup
        @param _amount uint
        @return bool
     */
    function stake( uint _amount, address _recipient ) external returns ( bool ) {
        rebase();

        IBEP20( SDOGE ).safeTransferFrom( msg.sender, address(this), _amount );

        Claim memory info = warmupInfo[ _recipient ];
        require( !info.lock, "Deposits for account are locked" );

        warmupInfo[ _recipient ] = Claim ({
        deposit: info.deposit.add( _amount ),
        gons: info.gons.add( IStakedScholarDogeToken( sSDOGE ).gonsForBalance( _amount ) ),
        expiry: epoch.number.add( warmupPeriod ),
        lock: false
        });

        IBEP20( sSDOGE ).safeTransfer( warmupContract, _amount );
        return true;
    }

    /**
        @notice retrieve sSDOGE from warmup
        @param _recipient address
     */
    function claim ( address _recipient ) public {
        Claim memory info = warmupInfo[ _recipient ];
        if ( epoch.number >= info.expiry && info.expiry != 0 ) {
            delete warmupInfo[ _recipient ];
            IWarmup( warmupContract ).retrieve( _recipient, IStakedScholarDogeToken( sSDOGE ).balanceForGons( info.gons ) );
        }
    }

    /**
        @notice forfeit sSDOGE in warmup and retrieve SDOGE
     */
    function forfeit() external {
        Claim memory info = warmupInfo[ msg.sender ];
        delete warmupInfo[ msg.sender ];

        IWarmup( warmupContract ).retrieve( address(this), IStakedScholarDogeToken( sSDOGE ).balanceForGons( info.gons ) );
        IBEP20( SDOGE ).safeTransfer( msg.sender, info.deposit );
    }

    /**
        @notice prevent new deposits to address (protection from malicious activity)
     */
    function toggleDepositLock() external {
        warmupInfo[ msg.sender ].lock = !warmupInfo[ msg.sender ].lock;
    }

    /**
        @notice redeem sSDOGE for SDOGE
        @param _amount uint
        @param _trigger bool
     */
    function unstake( uint _amount, bool _trigger ) external {
        if ( _trigger ) {
            rebase();
        }
        IBEP20( sSDOGE ).safeTransferFrom( msg.sender, address(this), _amount );
        IBEP20( SDOGE ).safeTransfer( msg.sender, _amount );
    }

    /**
        @notice returns the sSDOGE index, which tracks rebase growth
        @return uint
     */
    function index() public view returns ( uint ) {
        return IStakedScholarDogeToken( sSDOGE ).index();
    }

    /**
        @notice trigger rebase if epoch over
     */
    function rebase() public {
        if( epoch.endBlock <= block.number ) {

            IStakedScholarDogeToken( sSDOGE ).rebase( epoch.distribute, epoch.number );

            epoch.endBlock = epoch.endBlock.add( epoch.length );
            epoch.number++;

            if ( distributor != address(0) ) {
                IDistributor( distributor ).distribute();
            }

            uint balance = contractBalance();
            uint staked = IStakedScholarDogeToken( sSDOGE ).circulatingSupply();

            if( balance <= staked ) {
                epoch.distribute = 0;
            } else {
                epoch.distribute = balance.sub( staked );
            }
        }
    }

    /**
        @notice returns contract SDOGE holdings, including bonuses provided
        @return uint
     */
    function contractBalance() public view returns ( uint ) {
        return IBEP20( SDOGE ).balanceOf( address(this) ).add( totalBonus );
    }

    /**
        @notice provide bonus to locked staking contract
        @param _amount uint
     */
    function giveLockBonus( uint _amount ) external {
        require( msg.sender == locker );
        totalBonus = totalBonus.add( _amount );
        IBEP20( sSDOGE ).safeTransfer( locker, _amount );
    }

    /**
        @notice reclaim bonus from locked staking contract
        @param _amount uint
     */
    function returnLockBonus( uint _amount ) external {
        require( msg.sender == locker );
        totalBonus = totalBonus.sub( _amount );
        IBEP20( sSDOGE ).safeTransferFrom( locker, address(this), _amount );
    }

    enum DEPENDENCIES { DISTRIBUTOR, WARMUP, LOCKER }

    /**
        @notice sets the contract address for LP staking
        @param _dependency_ address
     */
    function setContract( DEPENDENCIES _dependency_, address _address ) external onlyManager() {
        if( _dependency_ == DEPENDENCIES.DISTRIBUTOR ) { // 0
            distributor = _address;
        } else if ( _dependency_ == DEPENDENCIES.WARMUP ) { // 1
            require( warmupContract == address( 0 ), "Warmup cannot be set more than once" );
            warmupContract = _address;
        } else if ( _dependency_ == DEPENDENCIES.LOCKER ) { // 2
            require( locker == address(0), "Locker cannot be set more than once" );
            locker = _address;
        }
    }

    /**
     * @notice set warmup period for new stakers
     * @param _warmupPeriod uint
     */
    function setWarmup( uint _warmupPeriod ) external onlyManager() {
        warmupPeriod = _warmupPeriod;
    }
}