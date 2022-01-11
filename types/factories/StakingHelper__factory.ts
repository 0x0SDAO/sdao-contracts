/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StakingHelper, StakingHelperInterface } from "../StakingHelper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_staking",
        type: "address",
      },
      {
        internalType: "address",
        name: "_SDOGE",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "SDOGE",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "staking",
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
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516104aa3803806104aa8339818101604052604081101561003357600080fd5b5080516020909101516001600160a01b03821661004f57600080fd5b6001600160601b0319606083901b166080526001600160a01b03811661007457600080fd5b606081811b6001600160601b03191660a052608051901c91506001600160a01b03166103e06100ca6000398060a2528061011552806101c652508060c652806101f552806102b0528061034952506103e06000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063226d9634146100465780634cf088d91461006a5780637acb775714610072575b600080fd5b61004e6100a0565b604080516001600160a01b039092168252519081900360200190f35b61004e6100c4565b61009e6004803603604081101561008857600080fd5b50803590602001356001600160a01b03166100e8565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b604080516323b872dd60e01b81523360048201523060248201526044810184905290516001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016916323b872dd9160648083019260209291908290030181600087803b15801561015d57600080fd5b505af1158015610171573d6000803e3d6000fd5b505050506040513d602081101561018757600080fd5b50516101c45760405162461bcd60e51b81526004018080602001828103825260248152602001806103b06024913960400191505060405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561025b57600080fd5b505af115801561026f573d6000803e3d6000fd5b505050506040513d602081101561028557600080fd5b505060408051637acb775760e01b8152600481018490526001600160a01b03838116602483015291517f000000000000000000000000000000000000000000000000000000000000000090921691637acb7757916044808201926020929091908290030181600087803b1580156102fb57600080fd5b505af115801561030f573d6000803e3d6000fd5b505050506040513d602081101561032557600080fd5b505060408051630f41a04d60e11b81526001600160a01b03838116600483015291517f000000000000000000000000000000000000000000000000000000000000000090921691631e83409a9160248082019260009290919082900301818387803b15801561039357600080fd5b505af11580156103a7573d6000803e3d6000fd5b50505050505056fe5374616b696e6748656c7065723a2053444f4745207472616e73666572206661696c6564a164736f6c6343000705000a";

export class StakingHelper__factory extends ContractFactory {
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
    _staking: string,
    _SDOGE: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakingHelper> {
    return super.deploy(
      _staking,
      _SDOGE,
      overrides || {}
    ) as Promise<StakingHelper>;
  }
  getDeployTransaction(
    _staking: string,
    _SDOGE: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_staking, _SDOGE, overrides || {});
  }
  attach(address: string): StakingHelper {
    return super.attach(address) as StakingHelper;
  }
  connect(signer: Signer): StakingHelper__factory {
    return super.connect(signer) as StakingHelper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingHelperInterface {
    return new utils.Interface(_abi) as StakingHelperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingHelper {
    return new Contract(address, _abi, signerOrProvider) as StakingHelper;
  }
}
