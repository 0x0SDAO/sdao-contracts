// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {BigNumber} from "ethers";
import {waitFor} from "./txHelper";
import {
  BondDepository,
  BondDepositoryWFTM,
  Distributor,
  PresaleScholarDAOToken,
  PrivateSale,
  RedeemHelper,
  ScholarDAOCirculatingSupply,
  StakedScholarDAOToken,
  Staking,
  Treasury
} from "../types";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  // TODO: Set real DAO here later
  const DAO = deployer.address;
  const deadAddr = "0x000000000000000000000000000000000000dEaD";
  const zeroAddr = "0x0000000000000000000000000000000000000000";
  
  const WFTM = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
  const wftm = await ethers.getContractAt("ERC20", WFTM, deployer);
  const DAI = "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e";
  const dai = await ethers.getContractAt("ERC20", DAI, deployer);

  console.log("[Deploying contracts]");

  // TODO Create presale deployment
  const PSDAO = await ethers.getContractFactory("PresaleScholarDAOToken");
  const psdao = await PSDAO.deploy() as PresaleScholarDAOToken;

  await psdao.deployed();

  console.log("PSDAO deployed to:", psdao.address);

  // TODO: Define price below /!\ USCD decimals = 6
  // rate set to 5% (% price of DAI) = 100 / 5 = 20 DAI
  const psdaoRate = 5;
  const PrivateSale = await ethers.getContractFactory("PrivateSale");
  const privateSale = await PrivateSale.deploy(
      psdao.address,
      dai.address,
      psdaoRate
  ) as PrivateSale;

  await privateSale.deployed();

  console.log("PrivateSale deployed to:", privateSale.address);

  await waitFor(psdao.addApprovedSeller(privateSale.address));

  // TODO: Whitelist buyers / purchase
  // TODO: psdao.approve(privateSale, maxApprove) && privateSale.burnRemainingPSDAOD() / privateSale.withdrawTokenIn() -> add to liquidity / keep some in treasury ?
  // TODO: Set private sale owner as multisig ? same as DAO ? ++ safety

  const SDAO = await ethers.getContractFactory("ScholarDAOToken");
  const sdao = await SDAO.deploy(psdao.address);

  await sdao.deployed();

  console.log("SDAO deployed to:", sdao.address);

  const treasuryQueueLength = 0;
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(
      sdao.address,
      dai.address,
      treasuryQueueLength
  ) as Treasury;

  await treasury.deployed();

  console.log("Treasury deployed to:", treasury.address);

  await waitFor(sdao.setVault(treasury.address));

  const SSDAO = await ethers.getContractFactory("StakedScholarDAOToken");
  const ssdao = await SSDAO.deploy() as StakedScholarDAOToken;

  await ssdao.deployed();

  console.log("Staked SDAO deployed to:", ssdao.address);

  // TODO: Check epoch values below
  const stakingEpochLength = 28800;
  const stakingFirstEpochNumber = 1;
  const stakingFirstEpochTime = (await ethers.provider.getBlock("latest")).timestamp;

  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(
      sdao.address,
      ssdao.address,
      stakingEpochLength,
      stakingFirstEpochNumber,
      stakingFirstEpochTime
  ) as Staking;

  await staking.deployed();

  console.log("SDAO staking deployed to:", staking.address);

  await waitFor(ssdao.initialize(staking.address));

  // See value to set here, block nb including tx was 12793518 (+14)
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
      treasury.address,
      sdao.address,
      staking.address
  ) as Distributor;

  await distributor.deployed();

  console.log("Distributor deployed to:", distributor.address);

  const daiBondCalculator = zeroAddr;
  const BondDepository = await ethers.getContractFactory("BondDepository");
  const daiBond = await BondDepository.deploy(
      sdao.address,
      dai.address,
      treasury.address,
      DAO,
      daiBondCalculator
  ) as BondDepository;

  await daiBond.deployed();

  console.log("DAI bond deployed to:", daiBond.address);

  const reserveDepositorType = 0;

  await waitFor(treasury.queue(reserveDepositorType, daiBond.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveDepositorType, daiBond.address, dai.address));

  const daiBondControlVariable = 0;
  const daiBondVestingTerm = 604800;
  const daiBondMinPrice = 430;
  const daiBondMaxPayout = 1000;
  const daiBondFee = 10000;
  const daiBondMaxDebt = 1000000000000000;
  const daiBondInitialDebt = 0;

  await waitFor(daiBond.initializeBondTerms(
      daiBondControlVariable,
      daiBondVestingTerm,
      daiBondMinPrice,
      daiBondMaxPayout,
      daiBondFee,
      daiBondMaxDebt,
      daiBondInitialDebt
  ));

  await waitFor(daiBond.setStaking(staking.address, true));
  
  await waitFor(staking.setDistributor(distributor.address));

  // 10 000% of total sdao supply / 100 -> 0.01
  // last olympus v2: 2714
  const stakingDistributorRate = 2714;

  await waitFor(distributor.addRecipient(staking.address, stakingDistributorRate));

  // TODO: Initialize a first deposit (staking) to init data;

  const rewardManagerType = 8;

  await waitFor(treasury.queue(rewardManagerType, distributor.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(rewardManagerType, distributor.address, zeroAddr));

  const liquidityDepositorType = 4;

  // TODO: See why here adding deployer itself to liquidity depositor if testing, remove for mainnet.
  await waitFor(treasury.queue(liquidityDepositorType, deployer.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityDepositorType, deployer.address, zeroAddr));

  // TODO: See why here adding deployer itself to reserve depositor if testing, remove for mainnet.
  await waitFor(treasury.queue(reserveDepositorType, deployer.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveDepositorType, deployer.address, zeroAddr));

  // TODO: See if below used for testing
  const depositAmount = BigNumber.from("0xa604b9a42df9ca00000");

  await waitFor(dai.approve(treasury.address, depositAmount));

  // First DAI deposit (generates SDAO base liquidity -> added to lp)
  // TODO: See if needed below
  const depositProfit = BigNumber.from("0x13d3b5419000")

  await waitFor(treasury.deposit(depositAmount, dai.address, depositProfit));

  const DEX_FACTORY = "0x152ee697f2e276fa89e96742e9bb9ab1f2e61be3";
  const dexFactory = await ethers.getContractAt("IUniswapV2Factory", DEX_FACTORY, deployer);

  await waitFor(dexFactory.createPair(sdao.address, dai.address));

  const SDAO_DAI_PAIR = await dexFactory.getPair(sdao.address, dai.address);
  
  console.log("SDAO-DAI pair address:", SDAO_DAI_PAIR);
  
  const DEX_ROUTER = "0xf491e7b69e4244ad4002bc14e878a34207e38c29";
  const dexRouter = await ethers.getContractAt("UniswapV2Router", DEX_ROUTER, deployer);
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 120;

  // TODO: Check values below for launch
  // dai init liq = 136.000
  // sdao init liq = 27.200
  // initial sdao price = 5 dai
  const SDAO_LIQ_SDAO_DAI = BigNumber.from("0x18bcfe568000");
  const DAI_LIQ_SDAO_DAI = BigNumber.from("0x1ccc9324511e45000000");

  await waitFor(sdao.approve(dexRouter.address, SDAO_LIQ_SDAO_DAI));
  await waitFor(dai.approve(dexRouter.address, DAI_LIQ_SDAO_DAI));

  await waitFor(dexRouter.addLiquidity(
      dai.address,
      sdao.address,
      DAI_LIQ_SDAO_DAI,
      SDAO_LIQ_SDAO_DAI,
      DAI_LIQ_SDAO_DAI,
      SDAO_LIQ_SDAO_DAI,
      deadAddr,
      addLpDeadline
  ));

  const BondingCalculator = await ethers.getContractFactory("BondingCalculator");
  const bondingCalculator = await BondingCalculator.deploy(sdao.address);

  await bondingCalculator.deployed();

  console.log("Bonding calculator deployed to:", bondingCalculator.address);

  const sdaoDaiBond = await BondDepository.deploy(
      sdao.address,
      SDAO_DAI_PAIR,
      treasury.address,
      DAO,
      bondingCalculator.address
  ) as BondDepository;

  await sdaoDaiBond.deployed();

  console.log("SDAO-DAI LP bond deployed to:", sdaoDaiBond.address);

  await waitFor(treasury.queue(liquidityDepositorType, sdaoDaiBond.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityDepositorType, sdaoDaiBond.address, dai.address));

  const liquidityTokenType = 5;

  await waitFor(treasury.queue(liquidityTokenType, SDAO_DAI_PAIR));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityTokenType, SDAO_DAI_PAIR, bondingCalculator.address));

  const sdaoDaiBondControlVariable = 0;
  const sdaoDaiBondVestingTerm = 604800;
  const sdaoDaiBondMinPrice = 205;
  const sdaoDaiBondMaxPayout = 1000;
  const sdaoDaiBondFee = 10000;
  const sdaoDaiBondMaxDebt = 1000000000000000;
  const sdaoDaiBondInitialDebt = 0;

  await waitFor(sdaoDaiBond.initializeBondTerms(
      sdaoDaiBondControlVariable,
      sdaoDaiBondVestingTerm,
      sdaoDaiBondMinPrice,
      sdaoDaiBondMaxPayout,
      sdaoDaiBondFee,
      sdaoDaiBondMaxDebt,
      sdaoDaiBondInitialDebt
  ));

  await waitFor(sdaoDaiBond.setStaking(staking.address, true));

  // Chainlink (mainnet: 0xf4766552D15AE4d256Ad41B6cf2933482B0680dc ; testnet: 0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D)
  const CHAINLINK_FTM_USD_PRICE_FEED = "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc";
  const chainLinkFTMUSDPriceFeed = await ethers.getContractAt("AggregatorV3Interface", CHAINLINK_FTM_USD_PRICE_FEED, deployer);

  console.log("ChainLink FTM-USD price feed at:", chainLinkFTMUSDPriceFeed.address);

  const BondDepositoryWFTM = await ethers.getContractFactory("BondDepositoryWFTM");
  const wftmBond = await BondDepositoryWFTM.deploy(
      sdao.address,
      wftm.address,
      treasury.address,
      DAO,
      chainLinkFTMUSDPriceFeed.address
  ) as BondDepositoryWFTM;

  await wftmBond.deployed();

  console.log("WFTM bond deployed to:", wftmBond.address);

  const RedeemHelper = await ethers.getContractFactory("RedeemHelper");
  const redeemHelper = await RedeemHelper.deploy() as RedeemHelper;

  await redeemHelper.deployed();

  console.log("Redeem helper deployed to:", redeemHelper.address);

  await waitFor(redeemHelper.addBondContract(daiBond.address));
  await waitFor(redeemHelper.addBondContract(daiBond.address));
  await waitFor(redeemHelper.addBondContract(sdaoDaiBond.address));
  await waitFor(redeemHelper.addBondContract(wftmBond.address));

  const CirculatingSupply = await ethers.getContractFactory("ScholarDAOCirculatingSupply");
  const circulatingSupply = await CirculatingSupply.deploy(deployer.address) as ScholarDAOCirculatingSupply;

  await circulatingSupply.deployed();

  console.log("ScholarDAO circulating supply deployed to:", circulatingSupply.address);

  await waitFor(circulatingSupply.initialize(sdao.address));
  // TODO: See if need to add more below
  await waitFor(circulatingSupply.setNonCirculatingSDAOAddresses(
      [distributor.address, deadAddr, zeroAddr]
  ));

  await waitFor(treasury.queue(rewardManagerType, wftmBond.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(rewardManagerType, wftmBond.address, zeroAddr));

  const reserveTokenType = 2;

  await waitFor(treasury.queue(reserveTokenType, wftm.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveTokenType, wftm.address, zeroAddr));

  // TODO: See if below was needed
  const wftmBondVestingValue = 100000;

  await waitFor(wftmBond.setBondTerms(0, wftmBondVestingValue));

  const wftmBondControlVariable = 0;
  const wftmBondVestingTerm = 604800;
  const wftmBondMinPrice = 160;
  const wftmBondMaxPayout = 1000;
  const wftmBondMaxDebt = 1000000000000000;
  const wftmBondInitialDebt = 0;

  await waitFor(wftmBond.initializeBondTerms(
      wftmBondControlVariable,
      wftmBondVestingTerm,
      wftmBondMinPrice,
      wftmBondMaxPayout,
      wftmBondMaxDebt,
      wftmBondInitialDebt
  ));

  await waitFor(wftmBond.setStaking(staking.address, true));

  // Once everything set, delegating ownership to DAO multisig
  // TODO: From DAO wallet, pull all managements to take ownership
  // TODO: See flow for private sale / ownership in order to secure the whole process
  await waitFor(psdao.pushManagement(DAO));
  await waitFor(privateSale.pushManagement(DAO));
  await waitFor(treasury.pushManagement(DAO));
  await waitFor(staking.pushManagement(DAO));
  await waitFor(ssdao.pushManagement(DAO));
  await waitFor(distributor.pushManagement(DAO));
  await waitFor(daiBond.pushManagement(DAO));
  await waitFor(sdaoDaiBond.pushManagement(DAO));
  await waitFor(wftmBond.pushManagement(DAO));
  await waitFor(circulatingSupply.transferOwnership(DAO));
  await waitFor(redeemHelper.pushManagement(DAO));

  // const firstAdjustmentIndex = 0;
  // const firstAdjustmentAdd = true;
  // const firstAdjustmentRate = 10000;
  // const firstAdjustmentTarget = 5000;
  //
  // await waitFor(distributor.setAdjustment(
  //     firstAdjustmentIndex,
  //     firstAdjustmentAdd,
  //     firstAdjustmentRate,
  //     firstAdjustmentTarget
  // ));

  // TODO: See if below needed or need to adjust according to DAO votes
  // const thirdAdjustmentIndex = 2;
  // const thirdAdjustmentAdd = false;
  // const thirdAdjustmentRate = 33000;
  // const thirdAdjustmentTarget = 6000;
  //
  // await waitFor(distributor.setAdjustment(
  //     thirdAdjustmentIndex,
  //     thirdAdjustmentAdd,
  //     thirdAdjustmentRate,
  //     thirdAdjustmentTarget
  // ));
  //
  // // TODO: See if below needed or need to adjust according to DAO votes
  // const fourthAdjustmentIndex = 12;
  // const fourthAdjustmentAdd = false;
  // const fourthAdjustmentRate = 64;
  // const fourthAdjustmentTarget = 3900;
  //
  // await waitFor(distributor.setAdjustment(
  //     fourthAdjustmentIndex,
  //     fourthAdjustmentAdd,
  //     fourthAdjustmentRate,
  //     fourthAdjustmentTarget
  // ));

  // Then adjusting Bonds with setBondTerms
  // Then adjusting staking with distributor.addRecipient
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
