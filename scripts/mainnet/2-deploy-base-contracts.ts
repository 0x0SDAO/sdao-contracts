// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {waitFor} from "../txHelper";
import {
  Distributor,
  ScholarDAOCirculatingSupply,
  StakedScholarDAOToken,
  Staking,
  Treasury
} from "../../types";
import {
  DAO, DEBTOR_TYPE,
  DEX_FACTORY,
  DEX_ROUTER, LIQUIDITY_DEPOSITOR_TYPE,
  PSDAO, RESERVE_DEPOSITOR_TYPE, REWARD_MANAGER_TYPE,
  SDAO_LIQ_SDAO_USDC,
  TREASURY_QUEUE_LENGTH,
  USDC,
  USDC_LIQ_SDAO_USDC,
  ZERO_ADDR
} from "./constants";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  const usdc = await ethers.getContractAt("ERC20", USDC, deployer);

  console.log("[Deploying base contracts]");

  const SDAO = await ethers.getContractFactory("ScholarDAOToken");
  const sdao = await SDAO.deploy(PSDAO);

  await sdao.deployed();

  console.log("SDAO deployed to:", sdao.address);

  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(
      sdao.address,
      usdc.address,
      TREASURY_QUEUE_LENGTH
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

  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
      treasury.address,
      sdao.address,
      staking.address
  ) as Distributor;

  await distributor.deployed();

  console.log("Distributor deployed to:", distributor.address);

  await waitFor(treasury.queue(DEBTOR_TYPE, distributor.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(DEBTOR_TYPE, distributor.address, ZERO_ADDR));

  // TODO: See rate value below => APY
  // 10 000% of total sdao supply / 100 -> 0.01
  // last olympus v2: 2714
  const stakingDistributorRate = 2714;

  await waitFor(distributor.addRecipient(staking.address, stakingDistributorRate));

  // TODO: Initialize a first deposit (staking) to init data;

  await waitFor(treasury.queue(REWARD_MANAGER_TYPE, distributor.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(REWARD_MANAGER_TYPE, distributor.address, ZERO_ADDR));

  await waitFor(treasury.queue(LIQUIDITY_DEPOSITOR_TYPE, deployer.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(LIQUIDITY_DEPOSITOR_TYPE, deployer.address, ZERO_ADDR));

  await waitFor(treasury.queue(LIQUIDITY_DEPOSITOR_TYPE, DAO));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(LIQUIDITY_DEPOSITOR_TYPE, DAO, ZERO_ADDR));

  await waitFor(treasury.queue(RESERVE_DEPOSITOR_TYPE, deployer.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(RESERVE_DEPOSITOR_TYPE, deployer.address, ZERO_ADDR));

  await waitFor(treasury.queue(RESERVE_DEPOSITOR_TYPE, DAO));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(RESERVE_DEPOSITOR_TYPE, DAO, ZERO_ADDR));

  // TODO: See if below used for testing
  // const depositAmount = BigNumber.from("0xb68a0aa00");
  //
  // await waitFor(usdc.approve(treasury.address, depositAmount));

  // First USDC deposit (generates SDAO base liquidity -> added to lp)
  // TODO: See if needed below / manually done ?
  // const depositProfit = BigNumber.from("0x13d3b5419000")
  //
  // await waitFor(treasury.deposit(depositAmount, usdc.address, depositProfit));

  const dexFactory = await ethers.getContractAt("IUniswapV2Factory", DEX_FACTORY, deployer);

  await waitFor(dexFactory.createPair(sdao.address, usdc.address));

  const SDAO_USDC_PAIR = await dexFactory.getPair(sdao.address, usdc.address);
  
  console.log("SDAO-USDC pair address:", SDAO_USDC_PAIR);

  const dexRouter = await ethers.getContractAt("UniswapV2Router", DEX_ROUTER, deployer);
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 120;

  await waitFor(sdao.approve(dexRouter.address, SDAO_LIQ_SDAO_USDC));
  await waitFor(usdc.approve(dexRouter.address, USDC_LIQ_SDAO_USDC));

  await waitFor(dexRouter.addLiquidity(
      usdc.address,
      sdao.address,
      USDC_LIQ_SDAO_USDC,
      SDAO_LIQ_SDAO_USDC,
      USDC_LIQ_SDAO_USDC,
      SDAO_LIQ_SDAO_USDC,
      DAO,
      addLpDeadline
  ));

  const CirculatingSupply = await ethers.getContractFactory("ScholarDAOCirculatingSupply");
  const circulatingSupply = await CirculatingSupply.deploy(deployer.address) as ScholarDAOCirculatingSupply;

  await circulatingSupply.deployed();

  console.log("ScholarDAO circulating supply deployed to:", circulatingSupply.address);

  await waitFor(circulatingSupply.initialize(sdao.address));
  // TODO: See if need to add more below
  await waitFor(circulatingSupply.setNonCirculatingSDAOAddresses(
      [distributor.address, ZERO_ADDR]
  ));

  // Once everything set, delegating ownership to DAO multisig
  // TODO: From DAO wallet, pull all managements to take ownership
  // TODO: See flow for private sale / ownership in order to secure the whole process
  await waitFor(staking.pushManagement(DAO));
  await waitFor(ssdao.pushManagement(DAO));
  await waitFor(distributor.pushManagement(DAO));
  await waitFor(circulatingSupply.transferOwnership(DAO));

  // Then adjusting staking with distributor.addRecipient
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
