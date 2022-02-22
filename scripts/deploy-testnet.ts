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
  ScholarDAOCirculatingSupply, ScholarDAOToken,
  StakedScholarDAOToken,
  Staking,
  Treasury,
  UniswapV2Factory,
  UniswapV2Router
} from "../types";
import {
  DEVELOPMENT_PARTNERSHIP_WALLET,
  DONATIONS_WALLET,
  MARKETING_WALLET,
  SDAO_DEVELOPMENT_PARTNERSHIP_ALLOC,
  SDAO_DONATIONS_ALLOC, SDAO_MARKETING_ALLOC,
  SDAO_PRIVATE_SALE_ALLOC,
  SDAO_TEAM_ALLOC
} from "./mainnet/constants";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  const baseNonce = ethers.provider.getTransactionCount(deployer.address);
  let nonceOffset = 0;

  function getNonce() {
    return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
  }

  // --- Prepare network (create fake tokens, pcs contracts) ---
  console.log("[Deploy test tokens]");

  const DAI = await ethers.getContractFactory("DAI");
  const dai = await DAI.deploy({nonce: getNonce()}) as ERC20;

  await dai.deployed();

  console.log("DAI deployed to:", dai.address);

  const WFTM = await ethers.getContractFactory("WFTM");
  const wftm = await WFTM.deploy({nonce: getNonce()}) as ERC20;

  await wftm.deployed();

  console.log("WFTM deployed to:", wftm.address);

  console.log("[Deploy test DEX]");

  const deadAddr = "0x000000000000000000000000000000000000dEaD";
  const zeroAddr = "0x0000000000000000000000000000000000000000";

  const dexFactoryFeeToSetter = deadAddr;
  const DexFactory = await ethers.getContractFactory("UniswapV2Factory");
  const dexFactory = await DexFactory.deploy(dexFactoryFeeToSetter, {nonce: getNonce()}) as UniswapV2Factory;

  await dexFactory.deployed();

  console.log("Dex factory deployed to:", dexFactory.address);

  const DexRouter = await ethers.getContractFactory("UniswapV2Router");
  const dexRouter = await DexRouter.deploy(
      dexFactory.address,
      wftm.address,
      {nonce: getNonce()}
  ) as UniswapV2Router;

  await dexRouter.deployed();

  console.log("Dex router deployed to:", dexRouter.address);

  console.log("[Deploy initial test liquidity]");

  const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 12000;

  const DAI_LIQ_DAI_WFTM = BigNumber.from("0x351b07458e8070d1b52000");
  const WFTM_LIQ_DAI_WFTM = BigNumber.from("0x1255642e6f604cd36c1849");

  await waitFor(dai.approve(dexRouter.address, MAX_APPROVE, {nonce: getNonce()}));
  await waitFor(wftm.approve(dexRouter.address, MAX_APPROVE, {nonce: getNonce()}));

  console.log("[Adding DAI-WFTM liquidity]");

  await waitFor(dexRouter.addLiquidity(
      dai.address,
      wftm.address,
      DAI_LIQ_DAI_WFTM,
      WFTM_LIQ_DAI_WFTM,
      DAI_LIQ_DAI_WFTM,
      WFTM_LIQ_DAI_WFTM,
      deployer.address,
      addLpDeadline,
      {nonce: getNonce()}
  ));

  console.log("[Deploying test contracts]");

  // TODO Create presale deployment
  const PSDAO = await ethers.getContractFactory("PresaleScholarDAOToken");
  const psdao = await PSDAO.deploy({nonce: getNonce()}) as PresaleScholarDAOToken;

  await psdao.deployed();

  console.log("PSDAO deployed to:", psdao.address);

  // TODO: Define price below /!\
  // rate set to 0.2 => 20% (% price of DAI) = amount * 20 / 100
  const psdaoRate = 20;
  const PrivateSale = await ethers.getContractFactory("PrivateSale");
  const privateSale = await PrivateSale.deploy(
      psdao.address,
      dai.address,
      psdaoRate,
      {nonce: getNonce()}
  ) as PrivateSale;

  await privateSale.deployed();

  console.log("PrivateSale deployed to:", privateSale.address);

  await waitFor(psdao.transfer(privateSale.address, SDAO_PRIVATE_SALE_ALLOC, {nonce: getNonce()}));

  await waitFor(psdao.addApprovedSeller(privateSale.address, {nonce: getNonce()}));
  await waitFor(privateSale.approveBuyer(deployer.address, {nonce: getNonce()}));

  // TODO: Whitelist buyers / purchase
  // TODO: psdao.approve(privateSale, maxApprove) && privateSale.burnRemainingPSDAOD() / privateSale.withdrawTokenIn() -> add to liquidity / keep some in treasury ?
  // TODO: Set private sale owner as multisig ? same as DAO ? ++ safety

  const SDAO = await ethers.getContractFactory("ScholarDAOToken");
  const sdao = await SDAO.deploy(psdao.address, {nonce: getNonce()}) as ScholarDAOToken;

  await sdao.deployed();

  console.log("SDAO deployed to:", sdao.address);

  await waitFor(psdao.approve(sdao.address, MAX_APPROVE, {nonce: getNonce()}));
  await waitFor(sdao.enableClaim({nonce: getNonce()}));
  await waitFor(sdao.claimWithPSDAO({nonce: getNonce()}));

  const TeamTimelock = await ethers.getContractFactory("ScholarDAOTeamTimelock");
  const teamTimelock = await TeamTimelock.deploy(sdao.address, deployer.address, {nonce: getNonce()});

  console.log("Team timelock deployed to:", teamTimelock.address);

  await waitFor(sdao.transfer(teamTimelock.address, SDAO_TEAM_ALLOC, {nonce: getNonce()}));
  await waitFor(sdao.transfer("0x0000000000000000000000000000000000000001", SDAO_DEVELOPMENT_PARTNERSHIP_ALLOC, {nonce: getNonce()}));
  await waitFor(sdao.transfer("0x0000000000000000000000000000000000000002", SDAO_MARKETING_ALLOC, {nonce: getNonce()}));
  await waitFor(sdao.transfer("0x0000000000000000000000000000000000000003", SDAO_DONATIONS_ALLOC, {nonce: getNonce()}));

  const treasuryQueueLength = 0;
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(
      sdao.address,
      dai.address,
      treasuryQueueLength,
      {nonce: getNonce()}
  ) as Treasury;

  await treasury.deployed();

  console.log("Treasury deployed to:", treasury.address);

  await waitFor(sdao.setVault(treasury.address, {nonce: getNonce()}));

  const SSDAO = await ethers.getContractFactory("StakedScholarDAOToken");
  const ssdao = await SSDAO.deploy({nonce: getNonce()}) as StakedScholarDAOToken;

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
      stakingFirstEpochTime,
      {nonce: getNonce()}
  ) as Staking;

  await staking.deployed();

  console.log("SDAO staking deployed to:", staking.address);

  await waitFor(ssdao.initialize(staking.address, {nonce: getNonce()}));

  // See value to set here, block nb including tx was 12793518 (+14)
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
      treasury.address,
      sdao.address,
      staking.address,
      {nonce: getNonce()}
  ) as Distributor;

  await distributor.deployed();

  console.log("Distributor deployed to:", distributor.address);

  // TODO: Set real DAO here later (safe fantom multisig)
  const DAO = "0x87D9c9Ffc5315547818AeA637B64430244C656b1";
  const daiBondCalculator = zeroAddr;
  const BondDepository = await ethers.getContractFactory("BondDepository");
  const daiBond = await BondDepository.deploy(
      sdao.address,
      dai.address,
      treasury.address,
      DAO,
      daiBondCalculator,
      {nonce: getNonce()}
  ) as BondDepository;

  await daiBond.deployed();

  console.log("DAI bond deployed to:", daiBond.address);

  const reserveDepositorType = 0;

  await waitFor(treasury.queue(reserveDepositorType, daiBond.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveDepositorType, daiBond.address, dai.address, {nonce: getNonce()}));

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
      daiBondInitialDebt,
      {nonce: getNonce()}
  ));

  await waitFor(daiBond.setStaking(staking.address, true, {nonce: getNonce()}));

  await waitFor(staking.setDistributor(distributor.address, {nonce: getNonce()}));

  // 10 000% of total sdao supply / 100 -> 0.01
  // last olympus v2: 2714
  const stakingDistributorRate = 600;

  await waitFor(distributor.addRecipient(staking.address, stakingDistributorRate, {nonce: getNonce()}));

  // TODO: Initialize a first deposit (staking) to init data;

  const rewardManagerType = 8;

  await waitFor(treasury.queue(rewardManagerType, distributor.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(rewardManagerType, distributor.address, zeroAddr, {nonce: getNonce()}));

  const liquidityDepositorType = 4;

  // TODO: See why here adding deployer itself to liquidity depositor if testing, remove for mainnet.
  await waitFor(treasury.queue(liquidityDepositorType, deployer.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityDepositorType, deployer.address, zeroAddr, {nonce: getNonce()}));

  // TODO: See why here adding deployer itself to reserve depositor if testing, remove for mainnet.
  await waitFor(treasury.queue(reserveDepositorType, deployer.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveDepositorType, deployer.address, zeroAddr, {nonce: getNonce()}));

  // TODO: See if below used for testing
  const depositAmount = BigNumber.from("0xa604b9a42df9ca00000");

  await waitFor(dai.approve(treasury.address, depositAmount, {nonce: getNonce()}));

  // First DAI deposit (generates SDAO base liquidity -> added to lp)
  const depositProfit = BigNumber.from("0x13d3b5419000")

  await waitFor(treasury.deposit(depositAmount, dai.address, depositProfit, {nonce: getNonce()}));
  await waitFor(dexFactory.createPair(sdao.address, dai.address, {nonce: getNonce()}));

  const SDAO_DAI_PAIR = await dexFactory.getPair(sdao.address, dai.address);

  console.log("SDAO-DAI pair address:", SDAO_DAI_PAIR);

  // TODO: Check values below for launch
  // dai init liq = 136.000
  // sdao init liq = 27.200
  // initial sdao price = 5 dai
  const SDAO_LIQ_SDAO_DAI = BigNumber.from("0x18bcfe568000");
  const DAI_LIQ_SDAO_DAI = BigNumber.from("0x1ccc9324511e45000000");

  await waitFor(sdao.approve(dexRouter.address, SDAO_LIQ_SDAO_DAI, {nonce: getNonce()}));
  await waitFor(dai.approve(dexRouter.address, DAI_LIQ_SDAO_DAI, {nonce: getNonce()}));

  await waitFor(dexRouter.addLiquidity(
      dai.address,
      sdao.address,
      DAI_LIQ_SDAO_DAI,
      SDAO_LIQ_SDAO_DAI,
      DAI_LIQ_SDAO_DAI,
      SDAO_LIQ_SDAO_DAI,
      deployer.address,
      addLpDeadline,
      {nonce: getNonce()}
  ));

  const BondingCalculator = await ethers.getContractFactory("BondingCalculator");
  const bondingCalculator = await BondingCalculator.deploy(sdao.address, {nonce: getNonce()});

  await bondingCalculator.deployed();

  console.log("Bonding calculator deployed to:", bondingCalculator.address);

  const sdaoDaiBond = await BondDepository.deploy(
      sdao.address,
      SDAO_DAI_PAIR,
      treasury.address,
      DAO,
      bondingCalculator.address,
      {nonce: getNonce()}
  ) as BondDepository;

  await sdaoDaiBond.deployed();

  console.log("SDAO-DAI LP bond deployed to:", sdaoDaiBond.address);

  await waitFor(treasury.queue(liquidityDepositorType, sdaoDaiBond.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityDepositorType, sdaoDaiBond.address, dai.address, {nonce: getNonce()}));

  const liquidityTokenType = 5;

  await waitFor(treasury.queue(liquidityTokenType, SDAO_DAI_PAIR, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(liquidityTokenType, SDAO_DAI_PAIR, bondingCalculator.address, {nonce: getNonce()}));

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
      sdaoDaiBondInitialDebt,
      {nonce: getNonce()}
  ));

  await waitFor(sdaoDaiBond.setStaking(staking.address, true, {nonce: getNonce()}));

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
      chainLinkFTMUSDPriceFeed.address,
      {nonce: getNonce()}
  ) as BondDepositoryWFTM;

  await wftmBond.deployed();

  console.log("WFTM bond deployed to:", wftmBond.address);

  const RedeemHelper = await ethers.getContractFactory("RedeemHelper");
  const redeemHelper = await RedeemHelper.deploy({nonce: getNonce()}) as RedeemHelper;

  await redeemHelper.deployed();

  console.log("Redeem helper deployed to:", redeemHelper.address);

  await waitFor(redeemHelper.addBondContract(daiBond.address, {nonce: getNonce()}));
  await waitFor(redeemHelper.addBondContract(daiBond.address, {nonce: getNonce()}));
  await waitFor(redeemHelper.addBondContract(sdaoDaiBond.address, {nonce: getNonce()}));
  await waitFor(redeemHelper.addBondContract(wftmBond.address, {nonce: getNonce()}));

  const CirculatingSupply = await ethers.getContractFactory("ScholarDAOCirculatingSupply");
  const circulatingSupply = await CirculatingSupply.deploy(deployer.address, {nonce: getNonce()}) as ScholarDAOCirculatingSupply;

  await circulatingSupply.deployed();

  console.log("ScholarDAO circulating supply deployed to:", circulatingSupply.address);

  await waitFor(circulatingSupply.initialize(sdao.address, {nonce: getNonce()}));
  // TODO: See if need to add more below
  await waitFor(circulatingSupply.setNonCirculatingSDAOAddresses(
      [distributor.address, deadAddr, zeroAddr],
      {nonce: getNonce()}
  ));

  await waitFor(treasury.queue(rewardManagerType, wftmBond.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(rewardManagerType, wftmBond.address, zeroAddr, {nonce: getNonce()}));

  const reserveTokenType = 2;

  await waitFor(treasury.queue(reserveTokenType, wftm.address, {nonce: getNonce()}));
  // Need to wait x seconds
  await delay(treasuryQueueLength);
  await waitFor(treasury.toggle(reserveTokenType, wftm.address, zeroAddr, {nonce: getNonce()}));

  // TODO: See if below was needed
  const wftmBondVestingValue = 100000;

  await waitFor(wftmBond.setBondTerms(0, wftmBondVestingValue, {nonce: getNonce()}));

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
      wftmBondInitialDebt,
      {nonce: getNonce()}
  ));

  await waitFor(wftmBond.setStaking(staking.address, true, {nonce: getNonce()}));

  // TODO: See if below needed, if so see if way to refactor this.

  // const bcvBondTerm = 4;
  // const daiBondBcvBondTermValue = 498;
  //
  // await waitFor(daiBond.setBondTerms(bcvBondTerm, daiBondBcvBondTermValue));
  //
  // const sdaoDaiBondBcvBondTermValue = 201;
  //
  // await waitFor(sdaoDaiBond.setBondTerms(bcvBondTerm, sdaoDaiBondBcvBondTermValue));

  // Once everything set, delegating ownership to DAO multisig
  // TODO: From DAO wallet, pull all managements to take ownership
  // TODO: See flow for private sale / ownership in order to secure the whole process
  // await waitFor(psdao.pushManagement(DAO));
  // await waitFor(privateSale.pushManagement(DAO));
  // await waitFor(treasury.pushManagement(DAO));
  // await waitFor(staking.pushManagement(DAO));
  // await waitFor(ssdao.pushManagement(DAO));
  // await waitFor(distributor.pushManagement(DAO));
  // await waitFor(daiBond.pushManagement(DAO));
  // await waitFor(sdaoDaiBond.pushManagement(DAO));
  // await waitFor(wftmBond.pushManagement(DAO));
  // await waitFor(circulatingSupply.transferOwnership(DAO));
  // await waitFor(redeemHelper.pushManagement(DAO));

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
