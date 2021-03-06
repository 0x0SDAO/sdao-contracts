/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ChainLinkBNBBUSDPriceFeed,
  ChainLinkBNBBUSDPriceFeedInterface,
} from "../ChainLinkBNBBUSDPriceFeed";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "roundId",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "startedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "answeredInRound",
        type: "uint80",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060a88061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063feaf968c14602d575b600080fd5b6033607d565b604051808669ffffffffffffffffffff1681526020018581526020018481526020018381526020018269ffffffffffffffffffff1681526020019550505050505060405180910390f35b680200000000000365ee90640aef738bc0906361d67c36908190849056fea164736f6c6343000705000a";

export class ChainLinkBNBBUSDPriceFeed__factory extends ContractFactory {
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
  ): Promise<ChainLinkBNBBUSDPriceFeed> {
    return super.deploy(overrides || {}) as Promise<ChainLinkBNBBUSDPriceFeed>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ChainLinkBNBBUSDPriceFeed {
    return super.attach(address) as ChainLinkBNBBUSDPriceFeed;
  }
  connect(signer: Signer): ChainLinkBNBBUSDPriceFeed__factory {
    return super.connect(signer) as ChainLinkBNBBUSDPriceFeed__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChainLinkBNBBUSDPriceFeedInterface {
    return new utils.Interface(_abi) as ChainLinkBNBBUSDPriceFeedInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainLinkBNBBUSDPriceFeed {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ChainLinkBNBBUSDPriceFeed;
  }
}
