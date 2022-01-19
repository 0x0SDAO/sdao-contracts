import {BigNumber} from "ethers";

export const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

// TODO: See value to set below
export const TREASURY_QUEUE_LENGTH = 0;

// TODO: Edit constants step by step according to deployments
// TODO: Check values below for launch
// dai init liq = 136.000
// sdao init liq = 27.200
// initial sdao price = 5 dai
export const SDAO_LIQ_SDAO_DAI = BigNumber.from("0x18bcfe568000");
export const DAI_LIQ_SDAO_DAI = BigNumber.from("0x1ccc9324511e45000000");

export const TREASURY = "0x8e7d55F9A94659610EC08b3387719bE0CAc17C63";
export const STAKING = "0x726966982D95A52364806A48758337B3f31266a9";
export const DISTRIBUTOR = "0x6B09D347262DdFf61c7c6e4681954cBd7269362B";
export const DAO = "0xcF176AE921BF3A4A4C7CD8010Fc52457A128DE22";
export const PSDAO = "0x01740450366A8FCF2f011334c4F288E3F4AAA6D1";
export const SDAO = "0xa5EB86C8B86Bd10C4D2b38189c5F54c6B4BdA91C";

export const SDAO_DAI_LP = "0xcE62411aD29961C70950F8ad25D55d6B14e6fF42";
export const DAI = "0x792492FEDB1c282a48456e72762D4290cED55612";
export const WFTM = "0x7e6059D144018743301a43513B9019FAaEF32A95";

export const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

export const DEX_FACTORY = "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3";
export const DEX_ROUTER = "0xf491e7b69e4244ad4002bc14e878a34207e38c29";

// Chainlink (mainnet: 0xf4766552D15AE4d256Ad41B6cf2933482B0680dc ; testnet: 0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D)
export const CHAINLINK_FTM_USD_PRICE_FEED = "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D";

export const REWARD_MANAGER_TYPE = 8;
export const DEBTOR_TYPE = 7;
export const LIQUIDITY_DEPOSITOR_TYPE = 4;
export const RESERVE_DEPOSITOR_TYPE = 0;
export const LIQUIDITY_TOKEN_TYPE = 5;
export const RESERVE_TOKEN_TYPE = 2;