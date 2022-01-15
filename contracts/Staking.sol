// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import './libraries/SafeMath.sol';
import './libraries/SafeERC20.sol';
import './libraries/Ownable.sol';
import './interfaces/IERC20.sol';
import './interfaces/IStakedScholarDAOToken.sol';
import './interfaces/IDistributor.sol';

contract Staking is Ownable {
    /* ========== DEPENDENCIES ========== */

    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using SafeERC20 for IStakedScholarDAOToken;

    /* ========== EVENTS ========== */

    event DistributorSet(address distributor);
    event WarmupSet(uint256 warmup);

    /* ========== DATA STRUCTURES ========== */

    struct Epoch {
        uint256 length; // in seconds
        uint256 number; // since inception
        uint256 end; // timestamp
        uint256 distribute; // amount
    }

    struct Claim {
        uint256 deposit; // if forfeiting
        uint256 gons; // staked balance
        uint256 expiry; // end of warmup period
        bool lock; // prevents malicious delays for claim
    }

    /* ========== STATE VARIABLES ========== */

    IERC20 public immutable sdao;
    IStakedScholarDAOToken public immutable ssdao;

    Epoch public epoch;

    IDistributor public distributor;

    mapping(address => Claim) public warmupInfo;
    uint256 public warmupPeriod;
    uint256 private gonsInWarmup;

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address _sdao,
        address _ssdao,
        uint256 _epochLength,
        uint256 _firstEpochNumber,
        uint256 _firstEpochTime
    )
    {
        require(_sdao != address(0), "Zero address: SDAO");
        sdao = IERC20(_sdao);
        require(_ssdao != address(0), "Zero address: SSDAO");
        ssdao = IStakedScholarDAOToken(_ssdao);

        epoch = Epoch({length: _epochLength, number: _firstEpochNumber, end: _firstEpochTime, distribute: 0});
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    /**
     * @notice stake SDAO to enter warmup
     * @param _to address
     * @param _amount uint
     * @param _claim bool
     * @return uint
     */
    function stake(
        address _to,
        uint256 _amount,
        bool _claim
    ) external returns (uint256) {
        sdao.safeTransferFrom(msg.sender, address(this), _amount);
        _amount = _amount.add(rebase()); // add bounty if rebase occurred

        if (_claim && warmupPeriod == 0) {
            return _send(_to, _amount);
        } else {
            Claim memory info = warmupInfo[_to];
            if (!info.lock) {
                require(_to == msg.sender, "External deposits for account are locked");
            }

            warmupInfo[_to] = Claim({
            deposit: info.deposit.add(_amount),
            gons: info.gons.add(ssdao.gonsForBalance(_amount)),
            expiry: epoch.number.add(warmupPeriod),
            lock: info.lock
            });

            gonsInWarmup = gonsInWarmup.add(ssdao.gonsForBalance(_amount));

            return _amount;
        }
    }

    /**
     * @notice retrieve stake from warmup
     * @param _to address
     * @return uint
     */
    function claim(address _to) public returns (uint256) {
        Claim memory info = warmupInfo[_to];

        if (!info.lock) {
            require(_to == msg.sender, "External claims for account are locked");
        }

        if (epoch.number >= info.expiry && info.expiry != 0) {
            delete warmupInfo[_to];

            gonsInWarmup = gonsInWarmup.sub(info.gons);

            return _send(_to, ssdao.balanceForGons(info.gons));
        }
        return 0;
    }

    /**
     * @notice forfeit stake and retrieve SDAO
     * @return uint
     */
    function forfeit() external returns (uint256) {
        Claim memory info = warmupInfo[msg.sender];
        delete warmupInfo[msg.sender];

        gonsInWarmup = gonsInWarmup.sub(info.gons);

        sdao.safeTransfer(msg.sender, info.deposit);

        return info.deposit;
    }

    /**
     * @notice prevent new deposits or claims from ext. address (protection from malicious activity)
     */
    function toggleLock() external {
        warmupInfo[msg.sender].lock = !warmupInfo[msg.sender].lock;
    }

    /**
     * @notice redeem SSDAO for SDAO
     * @param _to address
     * @param _amount uint
     * @param _trigger bool
     * @return amount_ uint
     */
    function unstake(
        address _to,
        uint256 _amount,
        bool _trigger
    ) external returns (uint256 amount_) {
        amount_ = _amount;
        uint256 bounty;
        if (_trigger) {
            bounty = rebase();
        }
        ssdao.safeTransferFrom(msg.sender, address(this), _amount);
        amount_ = amount_.add(bounty);

        require(amount_ <= sdao.balanceOf(address(this)), "Insufficient SDAO balance in contract");
        sdao.safeTransfer(_to, amount_);
    }

    /**
     * @notice trigger rebase if epoch over
     * @return uint256
     */
    function rebase() public returns (uint256) {
        uint256 bounty;
        if (epoch.end <= block.timestamp) {
            ssdao.rebase(epoch.distribute, epoch.number);

            epoch.end = epoch.end.add(epoch.length);
            epoch.number++;

            if (address(distributor) != address(0)) {
                distributor.distribute();
                bounty = distributor.retrieveBounty(); // Will mint sdao for this contract if there exists a bounty
            }
            uint256 balance = sdao.balanceOf(address(this));
            uint256 staked = ssdao.circulatingSupply();
            if (balance <= staked.add(bounty)) {
                epoch.distribute = 0;
            } else {
                epoch.distribute = balance.sub(staked).sub(bounty);
            }
        }
        return bounty;
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    /**
     * @notice send staker their amount as SSDAO
     * @param _to address
     * @param _amount uint
     */
    function _send(
        address _to,
        uint256 _amount
    ) internal returns (uint256) {
        ssdao.safeTransfer(_to, _amount); // send as SSDAO (equal unit as SDAO)

        return _amount;
    }

    /* ========== VIEW FUNCTIONS ========== */

    /**
     * @notice returns the SSDAO index, which tracks rebase growth
     * @return uint
     */
    function index() public view returns (uint256) {
        return ssdao.index();
    }

    /**
     * @notice total supply in warmup
     */
    function supplyInWarmup() public view returns (uint256) {
        return ssdao.balanceForGons(gonsInWarmup);
    }

    /**
     * @notice seconds until the next epoch begins
     */
    function secondsToNextEpoch() external view returns (uint256) {
        return epoch.end.sub(block.timestamp);
    }

    /* ========== MANAGERIAL FUNCTIONS ========== */

    /**
     * @notice sets the contract address for LP staking
     * @param _distributor address
     */
    function setDistributor(address _distributor) external onlyManager {
        distributor = IDistributor(_distributor);
        emit DistributorSet(_distributor);
    }

    /**
     * @notice set warmup period for new stakers
     * @param _warmupPeriod uint
     */
    function setWarmupLength(uint256 _warmupPeriod) external onlyManager {
        warmupPeriod = _warmupPeriod;
        emit WarmupSet(_warmupPeriod);
    }
}