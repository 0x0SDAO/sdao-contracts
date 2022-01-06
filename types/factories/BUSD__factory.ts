/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BUSD, BUSDInterface } from "../BUSD";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPulled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipPushed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "policy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pullManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "pushManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceManagement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252601081526f109a5b985b98d948141959c8109554d160821b602080830191909152825180840184526004815263109554d160e21b91810191909152600080546001600160a01b03191633178082559351929391926012926001600160a01b031691907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908290a38251620000b79060059060208601906200027d565b508151620000cd9060069060208501906200027d565b506007805460ff191660ff9290921691909117905550620000fd9050336b0faca713c2807565a7f0000062000103565b62000329565b6001600160a01b0382166200015f576040805162461bcd60e51b815260206004820152601f60248201527f42455032303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6200016c30838362000216565b62000188816004546200021b60201b620008ae1790919060201c565b6004556001600160a01b038216600090815260026020908152604090912054620001bd918390620008ae6200021b821b17901c565b6001600160a01b0383166000818152600260209081526040918290209390935580518481529051919230927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b505050565b60008282018381101562000276576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620002b5576000855562000300565b82601f10620002d057805160ff191683800117855562000300565b8280016001018555821562000300579182015b8281111562000300578251825591602001919060010190620002e3565b506200030e92915062000312565b5090565b5b808211156200030e576000815560010162000313565b610ecb80620003396000396000f3fe608060405234801561001057600080fd5b506004361061011b5760003560e01c806342966c68116100b257806395d89b4111610081578063a9059cbb11610066578063a9059cbb1461034a578063c50497ae14610376578063dd62ed3e1461037e5761011b565b806395d89b4114610316578063a457c2d71461031e5761011b565b806342966c68146102a557806346f68ee9146102c25780635a96ac0a146102e857806370a08231146102f05761011b565b806318160ddd116100ee57806318160ddd1461020b57806323b872dd14610225578063313ce5671461025b57806339509351146102795761011b565b80630505c8c91461012057806306fdde0314610144578063089208d8146101c1578063095ea7b3146101cb575b600080fd5b6101286103ac565b604080516001600160a01b039092168252519081900360200190f35b61014c6103bb565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561018657818101518382015260200161016e565b50505050905090810190601f1680156101b35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c9610451565b005b6101f7600480360360408110156101e157600080fd5b506001600160a01b038135169060200135610507565b604080519115158252519081900360200190f35b61021361051d565b60408051918252519081900360200190f35b6101f76004803603606081101561023b57600080fd5b506001600160a01b03813581169160208101359091169060400135610523565b61026361058c565b6040805160ff9092168252519081900360200190f35b6101f76004803603604081101561028f57600080fd5b506001600160a01b038135169060200135610595565b6101c9600480360360208110156102bb57600080fd5b50356105cb565b6101c9600480360360208110156102d857600080fd5b50356001600160a01b03166105d8565b6101c96106e4565b6102136004803603602081101561030657600080fd5b50356001600160a01b031661079b565b61014c6107b6565b6101f76004803603604081101561033457600080fd5b506001600160a01b038135169060200135610817565b6101f76004803603604081101561036057600080fd5b506001600160a01b038135169060200135610866565b610213610873565b6102136004803603604081101561039457600080fd5b506001600160a01b0381358116916020013516610883565b6000546001600160a01b031690565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104475780601f1061041c57610100808354040283529160200191610447565b820191906000526020600020905b81548152906001019060200180831161042a57829003601f168201915b5050505050905090565b6000546001600160a01b031633146104b0576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600061051433848461090f565b50600192915050565b60045490565b60006105308484846109fb565b610582843361057d85604051806060016040528060288152602001610dc4602891396001600160a01b038a1660009081526003602090815260408083203384529091529020549190610b58565b61090f565b5060019392505050565b60075460ff1690565b3360008181526003602090815260408083206001600160a01b0387168452909152812054909161051491859061057d90866108ae565b6105d53382610bef565b50565b6000546001600160a01b03163314610637576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661067c5760405162461bcd60e51b8152600401808060200182810382526026815260200180610d7c6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917fea8258f2d9ddb679928cf34b78cf645b7feda9acc828e4dd82d014eaae270eba91a36001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6001546001600160a01b0316331461072d5760405162461bcd60e51b8152600401808060200182810382526022815260200180610da26022913960400191505060405180910390fd5b600154600080546040516001600160a01b0393841693909116917faa151555690c956fc3ea32f106bb9f119b5237a061eaa8557cff3e51e3792c8d91a36001546000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03909216919091179055565b6001600160a01b031660009081526002602052604090205490565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104475780601f1061041c57610100808354040283529160200191610447565b6000610514338461057d85604051806060016040528060258152602001610e35602591393360009081526003602090815260408083206001600160a01b038d1684529091529020549190610b58565b60006105143384846109fb565b6b0faca713c2807565a7f0000081565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b600082820183811015610908576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b0383166109545760405162461bcd60e51b8152600401808060200182810382526024815260200180610d586024913960400191505060405180910390fd5b6001600160a01b0382166109995760405162461bcd60e51b8152600401808060200182810382526022815260200180610e9d6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260036020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610a405760405162461bcd60e51b8152600401808060200182810382526025815260200180610d336025913960400191505060405180910390fd5b6001600160a01b038216610a855760405162461bcd60e51b8152600401808060200182810382526023815260200180610e126023913960400191505060405180910390fd5b610a90838383610ceb565b610acd81604051806060016040528060268152602001610dec602691396001600160a01b0386166000908152600260205260409020549190610b58565b6001600160a01b038085166000908152600260205260408082209390935590841681522054610afc90826108ae565b6001600160a01b0380841660008181526002602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610be75760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610bac578181015183820152602001610b94565b50505050905090810190601f168015610bd95780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b038216610c345760405162461bcd60e51b8152600401808060200182810382526021815260200180610e5a6021913960400191505060405180910390fd5b610c4082600083610ceb565b610c7d81604051806060016040528060228152602001610e7b602291396001600160a01b0385166000908152600260205260409020549190610b58565b6001600160a01b038316600090815260026020526040902055600454610ca39082610cf0565b6004556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b505050565b600061090883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610b5856fe42455032303a207472616e736665722066726f6d20746865207a65726f206164647265737342455032303a20617070726f76652066726f6d20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a206d757374206265206e6577206f776e657220746f2070756c6c42455032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636542455032303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542455032303a207472616e7366657220746f20746865207a65726f206164647265737342455032303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f42455032303a206275726e2066726f6d20746865207a65726f206164647265737342455032303a206275726e20616d6f756e7420657863656564732062616c616e636542455032303a20617070726f766520746f20746865207a65726f2061646472657373a164736f6c6343000705000a";

export class BUSD__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BUSD> {
    return super.deploy(overrides || {}) as Promise<BUSD>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BUSD {
    return super.attach(address) as BUSD;
  }
  connect(signer: Signer): BUSD__factory {
    return super.connect(signer) as BUSD__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BUSDInterface {
    return new utils.Interface(_abi) as BUSDInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): BUSD {
    return new Contract(address, _abi, signerOrProvider) as BUSD;
  }
}
