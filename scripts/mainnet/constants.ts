import {BigNumber} from "ethers";

export const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

// TODO: See value to set below
export const TREASURY_QUEUE_LENGTH = 0;

// TODO: Edit constants step by step according to deployments
// TODO: Check values below for launch
// usdc init liq = 136.000
// sdao init liq = 27.200
// initial sdao price = 5 usdc
export const SDAO_LIQ_SDAO_USDC = BigNumber.from("0x18bcfe568000");
export const USDC_LIQ_SDAO_USDC = BigNumber.from("0x1faa3b5000");

export const TREASURY = "";
export const STAKING = "";
export const DISTRIBUTOR = "";
export const DAO = "";
export const PSDAO = "";
export const SDAO = "";

export const SDAO_USDC_LP = "";
export const USDC = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";
export const DAI = "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e";
export const WFTM = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";

export const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

export const DEX_FACTORY = "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3";
export const DEX_ROUTER = "0xf491e7b69e4244ad4002bc14e878a34207e38c29";

// Chainlink (mainnet: 0xf4766552D15AE4d256Ad41B6cf2933482B0680dc ; testnet: 0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D)
export const CHAINLINK_FTM_USD_PRICE_FEED = "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc";

export const REWARD_MANAGER_TYPE = 8;
export const DEBTOR_TYPE = 7;
export const LIQUIDITY_DEPOSITOR_TYPE = 4;
export const RESERVE_DEPOSITOR_TYPE = 0;
export const LIQUIDITY_TOKEN_TYPE = 5;
export const RESERVE_TOKEN_TYPE = 2;