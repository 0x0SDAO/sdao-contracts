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

interface IBondInterface extends ethers.utils.Interface {
  functions: {
    "pendingPayoutFor(address)": FunctionFragment;
    "redeem(address,bool)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "pendingPayoutFor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [string, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "pendingPayoutFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;

  events: {};
}

export class IBond extends BaseContract {
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

  interface: IBondInterface;

  functions: {
    pendingPayoutFor(
      _depositor: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pendingPayout_: BigNumber }>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  pendingPayoutFor(
    _depositor: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  redeem(
    _recipient: string,
    _stake: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    pendingPayoutFor(
      _depositor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    pendingPayoutFor(
      _depositor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    pendingPayoutFor(
      _depositor: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    redeem(
      _recipient: string,
      _stake: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
