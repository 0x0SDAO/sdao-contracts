/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IBEP20Mintable,
  IBEP20MintableInterface,
} from "../IBEP20Mintable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "ammount_",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IBEP20Mintable__factory {
  static readonly abi = _abi;
  static createInterface(): IBEP20MintableInterface {
    return new utils.Interface(_abi) as IBEP20MintableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBEP20Mintable {
    return new Contract(address, _abi, signerOrProvider) as IBEP20Mintable;
  }
}