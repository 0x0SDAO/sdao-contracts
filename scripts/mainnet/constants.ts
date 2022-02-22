import {BigNumber} from "ethers";
import {ethers} from "hardhat";

export const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

// TODO: See value to set below
export const TREASURY_QUEUE_LENGTH = 0;

// TODO: Edit constants step by step according to deployments
// TODO: Check values below for launch
// dai init liq = ?
// sdao init liq = 75000
export const SDAO_LIQ_SDAO_DAI = BigNumber.from("0x44364c5bb000");
export const DAI_LIQ_SDAO_DAI = BigNumber.from("0x1ccc9324511e45000000");
export const SDAO_TEAM_ALLOC = BigNumber.from("0x2d79883d2000");
export const SDAO_PRIVATE_SALE_ALLOC = BigNumber.from("0xcca2e5131000");
export const SDAO_DEVELOPMENT_PARTNERSHIP_ALLOC = BigNumber.from("0x5af3107a4000");
export const SDAO_DONATIONS_ALLOC = BigNumber.from("0x16bcc41e9000");
export const SDAO_MARKETING_ALLOC = BigNumber.from("0x16bcc41e9000");

export const TREASURY = "";
export const STAKING = "";
export const DISTRIBUTOR = "";
export const PSDAO = "";
export const SDAO = "";

export const DEVELOPMENT_PARTNERSHIP_WALLET = "";
export const MARKETING_WALLET = "";
export const DONATIONS_WALLET = "";
export const DAO_WALLET = "";

export const SDAO_DAI_LP = "";
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