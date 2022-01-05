/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface PDOGEStakingInterface extends ethers.utils.Interface {
  functions: {
    "acceptWalletChange(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "pDOGE()": FunctionFragment;
    "redeem(uint256)": FunctionFragment;
    "redeemableFor(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "reservoir()": FunctionFragment;
    "sdoge()": FunctionFragment;
    "setTerms(address,uint256,uint256)": FunctionFragment;
    "terms(address)": FunctionFragment;
    "tokenIn()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferWallet(address)": FunctionFragment;
    "walletChange(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptWalletChange",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pDOGE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemableFor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "reservoir", values?: undefined): string;
  encodeFunctionData(functionFragment: "sdoge", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setTerms",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "terms", values: [string]): string;
  encodeFunctionData(functionFragment: "tokenIn", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferWallet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "walletChange",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptWalletChange",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pDOGE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemableFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reservoir", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sdoge", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setTerms", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "terms", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenIn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "walletChange",
    data: BytesLike
  ): Result;

  events: {
    "LogChangeWallet(address,address)": EventFragment;
    "LogRedeem(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogChangeWallet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogRedeem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type LogChangeWalletEvent = TypedEvent<
  [string, string] & { oldWallet: string; newWallet: string }
>;

export type LogRedeemEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    account: string;
    tokenInAmount: BigNumber;
    tokenOutAmount: BigNumber;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class PDOGEStaking extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: PDOGEStakingInterface;

  functions: {
    acceptWalletChange(
      oldWallet_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pDOGE(overrides?: CallOverrides): Promise<[string]>;

    redeem(
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeemableFor(
      vester_: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reservoir(overrides?: CallOverrides): Promise<[string]>;

    sdoge(overrides?: CallOverrides): Promise<[string]>;

    setTerms(
      vester_: string,
      amountCanClaim_: BigNumberish,
      rate_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    terms(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        percent: BigNumber;
        claimed: BigNumber;
        max: BigNumber;
      }
    >;

    tokenIn(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferWallet(
      newWallet_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    walletChange(arg0: string, overrides?: CallOverrides): Promise<[string]>;
  };

  acceptWalletChange(
    oldWallet_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pDOGE(overrides?: CallOverrides): Promise<string>;

  redeem(
    amount_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeemableFor(vester_: string, overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reservoir(overrides?: CallOverrides): Promise<string>;

  sdoge(overrides?: CallOverrides): Promise<string>;

  setTerms(
    vester_: string,
    amountCanClaim_: BigNumberish,
    rate_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  terms(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      percent: BigNumber;
      claimed: BigNumber;
      max: BigNumber;
    }
  >;

  tokenIn(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferWallet(
    newWallet_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  walletChange(arg0: string, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptWalletChange(
      oldWallet_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    pDOGE(overrides?: CallOverrides): Promise<string>;

    redeem(amount_: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    redeemableFor(
      vester_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    reservoir(overrides?: CallOverrides): Promise<string>;

    sdoge(overrides?: CallOverrides): Promise<string>;

    setTerms(
      vester_: string,
      amountCanClaim_: BigNumberish,
      rate_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    terms(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        percent: BigNumber;
        claimed: BigNumber;
        max: BigNumber;
      }
    >;

    tokenIn(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferWallet(
      newWallet_: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    walletChange(arg0: string, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "LogChangeWallet(address,address)"(
      oldWallet?: string | null,
      newWallet?: null
    ): TypedEventFilter<
      [string, string],
      { oldWallet: string; newWallet: string }
    >;

    LogChangeWallet(
      oldWallet?: string | null,
      newWallet?: null
    ): TypedEventFilter<
      [string, string],
      { oldWallet: string; newWallet: string }
    >;

    "LogRedeem(address,uint256,uint256)"(
      account?: string | null,
      tokenInAmount?: null,
      tokenOutAmount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { account: string; tokenInAmount: BigNumber; tokenOutAmount: BigNumber }
    >;

    LogRedeem(
      account?: string | null,
      tokenInAmount?: null,
      tokenOutAmount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { account: string; tokenInAmount: BigNumber; tokenOutAmount: BigNumber }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    acceptWalletChange(
      oldWallet_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pDOGE(overrides?: CallOverrides): Promise<BigNumber>;

    redeem(
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeemableFor(
      vester_: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reservoir(overrides?: CallOverrides): Promise<BigNumber>;

    sdoge(overrides?: CallOverrides): Promise<BigNumber>;

    setTerms(
      vester_: string,
      amountCanClaim_: BigNumberish,
      rate_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    terms(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    tokenIn(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferWallet(
      newWallet_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    walletChange(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptWalletChange(
      oldWallet_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pDOGE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeem(
      amount_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeemableFor(
      vester_: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reservoir(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sdoge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTerms(
      vester_: string,
      amountCanClaim_: BigNumberish,
      rate_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    terms(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenIn(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferWallet(
      newWallet_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    walletChange(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
