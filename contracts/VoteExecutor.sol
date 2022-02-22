// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./libraries/Ownable.sol";
import "./libraries/SafeMath.sol";

// Contract used to execute DAO votes.
// This contract will be the owner of project contracts and
// will be able to add and then execute updates according
// to the votes (externally triggered on vote results).
contract VoteExecutor is Ownable {
    using SafeMath for uint256;

    struct Update {
        uint256 execTime;
        bool pushedByExecutor;
        bool cancelled;
    }

    struct UpdateCallData {
        address target;
        bytes updateCalldata;
    }

    // Safety delay before executing an update, can be
    // cancelled during pending delay by owner (multisig)
    uint256 public safetyExecDelay = 1 days;
    // Safety delay used if update pushed by owner (multisig)
    uint256 public emergencyExecDelay = 3 days;
    // Updates count
    uint256 public updateCount;
    // Stores the executor, the EOA that will call updates
    address public immutable executor;
    // Stores the updates
    mapping(uint256 => Update) public updates;
    // Stores the updates calldata, freed after call
    mapping(uint256 => UpdateCallData) public updatesCallData;

    event SafetyExecDelayUpdated(uint256 newDelay);
    event EmergencyExecDelayUpdated(uint256 newDelay);
    event UpdatePushed(
        uint256 indexed index,
        address indexed target,
        uint256 indexed execTime,
        bool pushedByExecutor,
        bytes updateCalldata
    );
    event UpdateExecuted(
        uint256 indexed index
    );
    event CancelUpdate(uint256 indexed index);

    constructor(address _executor) {
        executor = _executor;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == executor || msg.sender == _owner,
            "Only authorized"
        );

        _;
    }

    function updateSafetyExecDelay(uint256 delay)
        external
        onlyOwner
    {
        require(
            delay >= 28800,
            "Delay must be at least 8 hours"
        );

        safetyExecDelay = delay;
    }

    function updateEmergencyExecDelay(uint256 delay)
        external
        onlyOwner
    {
        require(
            delay >= 28800,
            "Delay must be at least 8 hours"
        );

        emergencyExecDelay = delay;
    }

    function pushUpdate(address target, bytes calldata updateCalldata)
        external
        onlyAuthorized
    {
        uint256 execTime;
        bool pushedByExecutor;

        if (msg.sender == executor) {
            execTime = block.timestamp.add(safetyExecDelay);
            pushedByExecutor = true;
        } else {
            execTime = block.timestamp.add(emergencyExecDelay);
        }

        updates[updateCount] = Update(
            execTime,
            pushedByExecutor,
            false
        );
        updatesCallData[updateCount] = UpdateCallData(
            target,
            updateCalldata
        );

        UpdatePushed(
            updateCount,
            target,
            execTime,
            pushedByExecutor,
            updateCalldata
        );

        updateCount++;
    }

    function cancelUpdate(uint256 index) external onlyAuthorized {
        require(_validPendingUpdate(index), "Invalid update");

        updates[index].cancelled = true;

        delete updatesCallData[index];

        CancelUpdate(index);
    }

    function execUpdate(uint256 index) external {
        require(_validPendingUpdate(index), "Invalid update");
        require(_canExecuteUpdate(index), "Must execute previous ones first");

        UpdateCallData memory updateCallData = updatesCallData[index];

        require(
            block.timestamp >= updates[index].execTime,
            "Delay still pending"
        );

        delete updatesCallData[index];

        (bool result,) = updateCallData.target.call(updateCallData.updateCalldata);

        require(result, "Update call failed");

        UpdateExecuted(index);
    }

    function _validPendingUpdate(uint256 index) private view returns (bool) {
        return (
            updates[index].execTime != 0 &&
            !updates[index].cancelled &&
            updatesCallData[index].target != address(0)
        );
    }

    function _canExecuteUpdate(uint256 index) private view returns (bool) {
        // Ensure FIFO on update call, previous ones must be called first
        return (
            index == 0 ||
            updates[index - 1].cancelled ||
            !_validPendingUpdate(index - 1)
        );
    }
}
