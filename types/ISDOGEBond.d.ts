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

interface ISDOGEBondInterface extends ethers.utils.Interface {
  functions: {
    "deposit(uint256,uint256,address,bytes32)": FunctionFragment;
    "isLiquidityBond()": FunctionFragment;
    "sdogeValue(uint256)": FunctionFragment;
    "tokenIn()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isLiquidityBond",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sdogeValue",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "tokenIn", values?: undefined): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isLiquidityBond",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sdogeValue", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenIn", data: BytesLike): Result;

  events: {};
}

export class ISDOGEBond extends BaseContract {
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

  interface: ISDOGEBondInterface;

  functions: {
    deposit(
      amount_: BigNumberish,
      maxPrice_: BigNumberish,
      depositor_: string,
      referralCode_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isLiquidityBond(overrides?: CallOverrides): Promise<[boolean]>;

    sdogeValue(
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { value_: BigNumber; token_: string }>;

    tokenIn(overrides?: CallOverrides): Promise<[string]>;
  };

  deposit(
    amount_: BigNumberish,
    maxPrice_: BigNumberish,
    depositor_: string,
    referralCode_: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isLiquidityBond(overrides?: CallOverrides): Promise<boolean>;

  sdogeValue(
    amount_: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string] & { value_: BigNumber; token_: string }>;

  tokenIn(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deposit(
      amount_: BigNumberish,
      maxPrice_: BigNumberish,
      depositor_: string,
      referralCode_: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isLiquidityBond(overrides?: CallOverrides): Promise<boolean>;

    sdogeValue(
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string] & { value_: BigNumber; token_: string }>;

    tokenIn(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    deposit(
      amount_: BigNumberish,
      maxPrice_: BigNumberish,
      depositor_: string,
      referralCode_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isLiquidityBond(overrides?: CallOverrides): Promise<BigNumber>;

    sdogeValue(
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenIn(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      amount_: BigNumberish,
      maxPrice_: BigNumberish,
      depositor_: string,
      referralCode_: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isLiquidityBond(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sdogeValue(
      amount_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenIn(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
