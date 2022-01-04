/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MinterOwned, MinterOwnedInterface } from "../MinterOwned";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldMinter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newMinter",
        type: "address",
      },
    ],
    name: "MinterSet",
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
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "minter",
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
    name: "owner",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter_",
        type: "address",
      },
    ],
    name: "setMinter",
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
        name: "newOwner_",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b03191633178082556040516001600160a01b039190911691907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3610442806100696000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b1461009a578063f2fde38b146100a2578063fca3b5aa146100c857610067565b8063075461721461006c578063715018a614610090575b600080fd5b610074610102565b604080516001600160a01b039092168252519081900360200190f35b610098610111565b005b6100746101c7565b610098600480360360208110156100b857600080fd5b50356001600160a01b03166101d6565b6100ee600480360360208110156100de57600080fd5b50356001600160a01b03166102e2565b604080519115158252519081900360200190f35b6001546001600160a01b031690565b6000546001600160a01b03163314610170576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a36000805473ffffffffffffffffffffffffffffffffffffffff19169055565b6000546001600160a01b031690565b6000546001600160a01b03163314610235576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661027a5760405162461bcd60e51b81526004018080602001828103825260268152602001806104106026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b600080546001600160a01b03163314610342576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03821661039d576040805162461bcd60e51b815260206004820152601d60248201527f4d696e7465722063616e6e6f742062652061646472657373207a65726f000000604482015290519081900360640190fd5b600180546001600160a01b0384811673ffffffffffffffffffffffffffffffffffffffff19831617928390556040805192821680845290519093909116917f02b23d62d8f733974f8cb13eb804b20135521322b70997c991fc01406632389f919081900360200190a25060019291505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a164736f6c6343000705000a";

export class MinterOwned__factory extends ContractFactory {
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
  ): Promise<MinterOwned> {
    return super.deploy(overrides || {}) as Promise<MinterOwned>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MinterOwned {
    return super.attach(address) as MinterOwned;
  }
  connect(signer: Signer): MinterOwned__factory {
    return super.connect(signer) as MinterOwned__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MinterOwnedInterface {
    return new utils.Interface(_abi) as MinterOwnedInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MinterOwned {
    return new Contract(address, _abi, signerOrProvider) as MinterOwned;
  }
}
