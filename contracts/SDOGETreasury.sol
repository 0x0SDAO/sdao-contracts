// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./libraries/SafeMath.sol";
import "./interfaces/IERC20.sol";

// Multisig wallet to keep funds SAFU
// Will require owners / 2 + 1 confirmations to execute
contract SDOGETreasury {
    using SafeMath for uint256;

    struct Transaction {
        address to;
        uint256 value;
        address token;
        bytes data;
        bool executed;
        uint256 numConfirmations;
    }
    
    address[] public owners;
    mapping(address => uint256) public ownerIndexes;
    mapping(address => bool) public isOwner;
    uint256 public numConfirmationsRequired;

    // mapping from tx index => owner => bool
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    Transaction[] public transactions;
    
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    
    event SubmitTx(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        address token,
        bytes data
    );
    
    event ConfirmTx(address indexed owner, uint256 indexed txIndex);
    
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
    
    event ExecuteTx(address indexed owner, uint256 indexed txIndex);

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        
        _;
    }

    modifier txExists(uint256 _txIndex) {
        require(
            _txIndex < transactions.length,
            "Tx does not exist"
        );
        
        _;
    }

    modifier notExecuted(uint256 _txIndex) {
        require(
            !transactions[_txIndex].executed,
            "Tx already executed"
        );
        
        _;
    }

    modifier notConfirmed(uint256 _txIndex) {
        require(
            !isConfirmed[_txIndex][msg.sender],
            "Tx already confirmed"
        );
        
        _;
    }

    constructor(
        address[] memory _owners
    )
    {
        require(
            _owners.length > 0,
            "Owners required"
        );

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(
                owner != address(0),
                "Invalid owner"
            );
            require(
                !isOwner[owner],
                "Owner not unique"
            );

            isOwner[owner] = true;
            ownerIndexes[owner] = i;
            owners.push(owner);
        }

        numConfirmationsRequired = _owners.length.div(2).add(1);
    }

    receive() payable external {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTx(
        address _to,
        uint256 _value,
        address _token,
        bytes memory _data
    )
        public
        onlyOwner
    {
        uint256 txIndex = transactions.length;

        transactions.push(Transaction({
            to: _to,
            value: _value,
            token: _token,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));

        emit SubmitTx(msg.sender, txIndex, _to, _value, _token, _data);
    }
    
    function submitOwnerTx(address _target)
        public
        onlyOwner
    {
        uint256 txIndex = transactions.length;

        transactions.push(Transaction({
            to: _target,
            value: 0,
            token: address(0),
            data: "",
            executed: false,
            numConfirmations: 0
        }));

        emit SubmitTx(msg.sender, txIndex, _target, 0, address(0), "");
    }

    function confirmTx(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTx(msg.sender, _txIndex);
    }

    function executeTransaction(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "ScholarDogeTreasury: cannot execute tx"
        );

        transaction.executed = true;
        
        if (transaction.value == 0) {
            // If no value => updating owners
            if (isOwner[transaction.to]) {
                isOwner[transaction.to] = false;
                ownerIndexes[transaction.to] = 0;
                
                delete owners[ownerIndexes[transaction.to]];
            } else {
                isOwner[transaction.to] = true;
                ownerIndexes[transaction.to] = owners.length.sub(1);
                
                owners.push(transaction.to);
            }
            
            numConfirmationsRequired = owners.length.div(2).add(1);
        } else {
            if (transaction.token == address(0)) {
                // Sending bnb
                (bool success, )
                    = transaction.to.call{value: transaction.value}(transaction.data);

                require(success, "ScholarDogeTreasury: BNB tx failed");
            } else {
                // Sending token
                bool success
                    = IERC20(transaction.token).transfer(transaction.to, transaction.value);

                require(success, "ScholarDogeTreasury: Token tx failed");
            }
        }

        emit ExecuteTx(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            isConfirmed[_txIndex][msg.sender],
            "ScholarDogeTreasury: tx not confirmed"
        );

        transaction.numConfirmations = transaction.numConfirmations.sub(1);
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
    
    function getOwnerCount() public view returns (uint256) {
        return owners.length;
    }

    function getTransaction(uint256 _txIndex)
        public
        view
        returns (
            address to,
            uint256 value,
            address token,
            bytes memory data,
            bool executed,
            uint256 numConfirmations)
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.token,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }
}