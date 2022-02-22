// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {waitFor} from "../txHelper";
import {
  BondDepository,
  BondDepositoryWFTM,
  Distributor,
  RedeemHelper,
  Staking,
  Treasury
} from "../../types";
import {
  CHAINLINK_FTM_USD_PRICE_FEED,
  DAI,
  DAO_WALLET,
  DISTRIBUTOR,
  LIQUIDITY_DEPOSITOR_TYPE,
  LIQUIDITY_TOKEN_TYPE,
  RESERVE_DEPOSITOR_TYPE,
  RESERVE_TOKEN_TYPE,
  REWARD_MANAGER_TYPE,
  SDAO,
  SDAO_DAI_LP,
  STAKING,
  TREASURY,
  TREASURY_QUEUE_LENGTH,
  WFTM,
  ZERO_ADDR
} from "./constants";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  const wftm = await ethers.getContractAt("ERC20", WFTM, deployer);
  const dai = await ethers.getContractAt("ERC20", DAI, deployer);
  const sdao = await ethers.getContractAt("PresaleScholarDAOToken", SDAO, deployer);
  const treasury = await ethers.getContractAt("Treasury", TREASURY, deployer) as Treasury;
  const staking = await ethers.getContractAt("Staking", STAKING, deployer) as Staking;
  const distributor = await ethers.getContractAt("Distributor", DISTRIBUTOR, deployer) as Distributor;

  const daiBondCalculator = ZERO_ADDR;
  const BondDepository = await ethers.getContractFactory("BondDepository");
  const daiBond = await BondDepository.deploy(
      sdao.address,
      dai.address,
      treasury.address,
      DAO_WALLET,
      daiBondCalculator
  ) as BondDepository;

  await daiBond.deployed();

  console.log("DAI bond deployed to:", daiBond.address);

  await waitFor(treasury.queue(RESERVE_DEPOSITOR_TYPE, daiBond.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(RESERVE_DEPOSITOR_TYPE, daiBond.address, dai.address));

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

  const BondingCalculator = await ethers.getContractFactory("BondingCalculator");
  const bondingCalculator = await BondingCalculator.deploy(sdao.address);

  await bondingCalculator.deployed();

  console.log("Bonding calculator deployed to:", bondingCalculator.address);

  const sdaoDaiBond = await BondDepository.deploy(
      sdao.address,
      SDAO_DAI_LP,
      treasury.address,
      DAO_WALLET,
      bondingCalculator.address
  ) as BondDepository;

  await sdaoDaiBond.deployed();

  console.log("SDAO-DAI LP bond deployed to:", sdaoDaiBond.address);

  await waitFor(treasury.queue(LIQUIDITY_DEPOSITOR_TYPE, sdaoDaiBond.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(LIQUIDITY_DEPOSITOR_TYPE, sdaoDaiBond.address, dai.address));

  await waitFor(treasury.queue(LIQUIDITY_TOKEN_TYPE, SDAO_DAI_LP));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(LIQUIDITY_TOKEN_TYPE, SDAO_DAI_LP, bondingCalculator.address));

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

  const chainLinkFTMUSDPriceFeed = await ethers.getContractAt("AggregatorV3Interface", CHAINLINK_FTM_USD_PRICE_FEED, deployer);

  console.log("ChainLink FTM-USD price feed at:", chainLinkFTMUSDPriceFeed.address);

  const BondDepositoryWFTM = await ethers.getContractFactory("BondDepositoryWFTM");
  const wftmBond = await BondDepositoryWFTM.deploy(
      sdao.address,
      wftm.address,
      treasury.address,
      DAO_WALLET,
      chainLinkFTMUSDPriceFeed.address
  ) as BondDepositoryWFTM;

  await wftmBond.deployed();

  console.log("WFTM bond deployed to:", wftmBond.address);

  await waitFor(treasury.queue(REWARD_MANAGER_TYPE, wftmBond.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(REWARD_MANAGER_TYPE, wftmBond.address, ZERO_ADDR));

  await waitFor(treasury.queue(RESERVE_TOKEN_TYPE, wftm.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(RESERVE_TOKEN_TYPE, wftm.address, ZERO_ADDR));

  const RedeemHelper = await ethers.getContractFactory("RedeemHelper");
  const redeemHelper = await RedeemHelper.deploy() as RedeemHelper;

  await redeemHelper.deployed();

  console.log("Redeem helper deployed to:", redeemHelper.address);

  await waitFor(redeemHelper.addBondContract(daiBond.address));
  await waitFor(redeemHelper.addBondContract(daiBond.address));
  await waitFor(redeemHelper.addBondContract(sdaoDaiBond.address));
  await waitFor(redeemHelper.addBondContract(wftmBond.address));

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
  await waitFor(treasury.pushManagement(DAO_WALLET));
  await waitFor(daiBond.pushManagement(DAO_WALLET));
  await waitFor(daiBond.pushManagement(DAO_WALLET));
  await waitFor(sdaoDaiBond.pushManagement(DAO_WALLET));
  await waitFor(wftmBond.pushManagement(DAO_WALLET));
  await waitFor(redeemHelper.pushManagement(DAO_WALLET));

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
