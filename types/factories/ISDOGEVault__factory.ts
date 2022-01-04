/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISDOGEVault, ISDOGEVaultInterface } from "../ISDOGEVault";

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

export class ISDOGEVault__factory {
  static readonly abi = _abi;
  static createInterface(): ISDOGEVaultInterface {
    return new utils.Interface(_abi) as ISDOGEVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISDOGEVault {
    return new Contract(address, _abi, signerOrProvider) as ISDOGEVault;
  }
}
