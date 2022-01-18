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
  ERC20,
  PresaleScholarDAOToken,
  PrivateSale,
  RedeemHelper,
  ScholarDAOCirculatingSupply,
  StakedScholarDAOToken,
  Staking,
  Treasury,
  UniswapV2Factory,
  UniswapV2Router
} from "../types";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  // --- Prepare network (create fake tokens, pcs contracts) ---
  console.log("[Deploy test tokens]");

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy() as ERC20;

  await usdc.deployed();

  console.log("USDC deployed to:", usdc.address);
  
  const DAI = await ethers.getContractFactory("DAI");
  const dai = await DAI.deploy() as ERC20;

  await dai.deployed();

  console.log("DAI deployed to:", dai.address);

  const WFTM = await ethers.getContractFactory("WFTM");
  const wftm = await WFTM.deploy() as ERC20;

  await wftm.deployed();

  console.log("WFTM deployed to:", wftm.address);

  console.log("[Deploy test DEX]");

  const deadAddr = "0x000000000000000000000000000000000000dEaD";
  const zeroAddr = "0x0000000000000000000000000000000000000000";

  const dexFactoryFeeToSetter = deadAddr;
  const DexFactory = await ethers.getContractFactory("UniswapV2Factory");
  const dexFactory = await DexFactory.deploy(dexFactoryFeeToSetter) as UniswapV2Factory;

  await dexFactory.deployed();

  console.log("Dex factory deployed to:", dexFactory.address);

  const DexRouter = await ethers.getContractFactory("UniswapV2Router");
  const dexRouter = await DexRouter.deploy(
      dexFactory.address,
      wftm.address
  ) as UniswapV2Router;

  await dexRouter.deployed();

  console.log("Dex router deployed to:", dexRouter.address);

  console.log("[Deploy initial test liquidity]");

  const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 12000;
  const USDC_LIQ_USDC_DAI = BigNumber.from("0x182c969cb6c");
  const DAI_LIQ_USDC_DAI = BigNumber.from("0x3839a4208d7769b893e");

  await waitFor(usdc.approve(dexRouter.address, MAX_APPROVE));
  await waitFor(dai.approve(dexRouter.address, MAX_APPROVE));

  console.log("[Adding USDC-DAI liquidity]");

  await waitFor(dexRouter.addLiquidity(
      usdc.address,
      dai.address,
      USDC_LIQ_USDC_DAI,
      DAI_LIQ_USDC_DAI,
      USDC_LIQ_USDC_DAI,
      DAI_LIQ_USDC_DAI,
      deadAddr,
      addLpDeadline
  ));

  const USDC_LIQ_USDC_WFTM = BigNumber.from("0x3a63e44dbfb2");
  const WFTM_LIQ_USDC_WFTM = BigNumber.from("0x1255642e6f604cd36c1849");

  await waitFor(usdc.approve(dexRouter.address, MAX_APPROVE));
  await waitFor(wftm.approve(dexRouter.address, MAX_APPROVE));

  console.log("[Adding USDC-WFTM liquidity]");

  await waitFor(dexRouter.addLiquidity(
      usdc.address,
      wftm.address,
      USDC_LIQ_USDC_WFTM,
      WFTM_LIQ_USDC_WFTM,
      USDC_LIQ_USDC_WFTM,
      WFTM_LIQ_USDC_WFTM,
      deadAddr,
      addLpDeadline
  ));

  console.log("[Deploying test contracts]");

  // TODO Create presale deployment
  const PSDAO = await ethers.getContractFactory("PresaleScholarDAOToken");
  const psdao = await PSDAO.deploy() as PresaleScholarDAOToken;

  await psdao.deployed();

  console.log("PSDAO deployed to:", psdao.address);

  // TODO: Define price below /!\ USCD decimals = 6
  // rate set to 5% (% price of USDC) = 100 / 5 = 20 USDC
  const psdaoRate = 5;
  const PrivateSale = await ethers.getContractFactory("PrivateSale");
  const privateSale = await PrivateSale.deploy(
      psdao.address,
      usdc.address,
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
      usdc.address,
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

  // TODO: Set real DAO here later (safe fantom multisig)
  const DAO = "0x87D9c9Ffc5315547818AeA637B64430244C656b1";
  const usdcBondCalculator = zeroAddr;
  const BondDepository = await ethers.getContractFactory("BondDepository");
  const usdcBond = await BondDepository.deploy(
      sdao.address,
      usdc.address,
      treasury.address,
      DAO,
      usdcBondCalculator
  ) as BondDepository;

  await usdcBond.deployed();

  console.log("USDC bond deployed to:", usdcBond.address);

  const reserveDepositorType = 0;

  await waitFor(treasury.queue(reserveDepositorType, usdcBond.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveDepositorType, usdcBond.address, usdc.address));

  const usdcBondControlVariable = 0;
  const usdcBondVestingTerm = 144000;
  const usdcBondMinPrice = 300;
  const usdcBondMaxPayout = 1000;
  const usdcBondFee = 10000;
  const usdcBondMaxDebt = 1000000000000000;
  const usdcBondInitialDebt = 0;

  await waitFor(usdcBond.initializeBondTerms(
      usdcBondControlVariable,
      usdcBondVestingTerm,
      usdcBondMinPrice,
      usdcBondMaxPayout,
      usdcBondFee,
      usdcBondMaxDebt,
      usdcBondInitialDebt
  ));

  await waitFor(usdcBond.setStaking(staking.address, true));

  const daiBondCalculator = zeroAddr;
  const daiBond = await BondDepository.deploy(
      sdao.address,
      dai.address,
      treasury.address,
      DAO,
      daiBondCalculator
  ) as BondDepository;

  await daiBond.deployed();

  console.log("DAI bond deployed to:", daiBond.address);

  await waitFor(treasury.queue(reserveDepositorType, daiBond.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveDepositorType, daiBond.address, dai.address));

  const daiBondControlVariable = 0;
  const daiBondVestingTerm = 144000;
  const daiBondMinPrice = 300;
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
  const depositAmount = BigNumber.from("0xb68a0aa00");

  await waitFor(usdc.approve(treasury.address, depositAmount));

  // First USDC deposit (generates SDAO base liquidity -> added to lp)
  // TODO: See if below used for testing /!\ careful to decimals
  const depositProfit = BigNumber.from("0x13d3b5419000")

  await waitFor(treasury.deposit(depositAmount, usdc.address, depositProfit));
  await waitFor(dexFactory.createPair(sdao.address, usdc.address));

  const SDAO_USDC_PAIR = await dexFactory.getPair(sdao.address, usdc.address);

  console.log("SDAO-USDC pair address:", SDAO_USDC_PAIR);

  // TODO: Check values below for launch
  // usdc init liq = 136.000
  // sdao init liq = 27.200
  // initial sdao price = 5 usdc
  const SDAO_LIQ_SDAO_USDC = BigNumber.from("0x18bcfe568000");
  const USDC_LIQ_SDAO_USDC = BigNumber.from("0x1faa3b5000");

  await waitFor(sdao.approve(dexRouter.address, SDAO_LIQ_SDAO_USDC));
  await waitFor(usdc.approve(dexRouter.address, USDC_LIQ_SDAO_USDC));

  await waitFor(dexRouter.addLiquidity(
      usdc.address,
      sdao.address,
      USDC_LIQ_SDAO_USDC,
      SDAO_LIQ_SDAO_USDC,
      USDC_LIQ_SDAO_USDC,
      SDAO_LIQ_SDAO_USDC,
      deadAddr,
      addLpDeadline
  ));

  const BondingCalculator = await ethers.getContractFactory("BondingCalculator");
  const bondingCalculator = await BondingCalculator.deploy(sdao.address);

  await bondingCalculator.deployed();

  console.log("Bonding calculator deployed to:", bondingCalculator.address);

  const sdaoUsdcBond = await BondDepository.deploy(
      sdao.address,
      SDAO_USDC_PAIR,
      treasury.address,
      DAO,
      bondingCalculator.address
  ) as BondDepository;

  await sdaoUsdcBond.deployed();

  console.log("SDAO-USDC LP bond deployed to:", sdaoUsdcBond.address);

  await waitFor(treasury.queue(liquidityDepositorType, sdaoUsdcBond.address));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityDepositorType, sdaoUsdcBond.address, usdc.address));

  const liquidityTokenType = 5;

  await waitFor(treasury.queue(liquidityTokenType, SDAO_USDC_PAIR));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityTokenType, SDAO_USDC_PAIR, bondingCalculator.address));

  const sdaoUsdcBondControlVariable = 0;
  const sdaoUsdcBondVestingTerm = 144000;
  const sdaoUsdcBondMinPrice = 200;
  const sdaoUsdcBondMaxPayout = 1000;
  const sdaoUsdcBondFee = 10000;
  const sdaoUsdcBondMaxDebt = 1000000000000000;
  const sdaoUsdcBondInitialDebt = 0;

  await waitFor(sdaoUsdcBond.initializeBondTerms(
      sdaoUsdcBondControlVariable,
      sdaoUsdcBondVestingTerm,
      sdaoUsdcBondMinPrice,
      sdaoUsdcBondMaxPayout,
      sdaoUsdcBondFee,
      sdaoUsdcBondMaxDebt,
      sdaoUsdcBondInitialDebt
  ));

  await waitFor(sdaoUsdcBond.setStaking(staking.address, true));

  // Chainlink (mainnet: 0xf4766552D15AE4d256Ad41B6cf2933482B0680dc ; testnet: 0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D)
  const CHAINLINK_FTM_USD_PRICE_FEED = "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D";
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

  await waitFor(redeemHelper.addBondContract(usdcBond.address));
  await waitFor(redeemHelper.addBondContract(daiBond.address));
  await waitFor(redeemHelper.addBondContract(sdaoUsdcBond.address));
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
  const wftmBondVestingTerm = 144000;
  const wftmBondMinPrice = 200;
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

  // TODO: See if below needed, if so see if way to refactor this.

  const bcvBondTerm = 4;
  const usdcBondBcvBondTermValue = 498;

  await waitFor(usdcBond.setBondTerms(bcvBondTerm, usdcBondBcvBondTermValue));

  const daiBondBcvBondTermValue = 498;

  await waitFor(daiBond.setBondTerms(bcvBondTerm, daiBondBcvBondTermValue));

  const sdaoUsdcBondBcvBondTermValue = 201;

  await waitFor(sdaoUsdcBond.setBondTerms(bcvBondTerm, sdaoUsdcBondBcvBondTermValue));

  // Once everything set, delegating ownership to DAO multisig
  // TODO: From DAO wallet, pull all managements to take ownership
  // TODO: See flow for private sale / ownership in order to secure the whole process
  await waitFor(psdao.pushManagement(DAO));
  await waitFor(privateSale.pushManagement(DAO));
  await waitFor(treasury.pushManagement(DAO));
  await waitFor(staking.pushManagement(DAO));
  await waitFor(ssdao.pushManagement(DAO));
  await waitFor(distributor.pushManagement(DAO));
  await waitFor(usdcBond.pushManagement(DAO));
  await waitFor(daiBond.pushManagement(DAO));
  await waitFor(sdaoUsdcBond.pushManagement(DAO));
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
