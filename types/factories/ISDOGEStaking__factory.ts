/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISDOGEStaking, ISDOGEStakingInterface } from "../ISDOGEStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
    ],
    name: "stake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ISDOGEStaking__factory {
  static readonly abi = _abi;
  static createInterface(): ISDOGEStakingInterface {
    return new utils.Interface(_abi) as ISDOGEStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISDOGEStaking {
    return new Contract(address, _abi, signerOrProvider) as ISDOGEStaking;
  }
}
