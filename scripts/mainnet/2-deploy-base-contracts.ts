// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {waitFor} from "../txHelper";
import {
  Distributor, PresaleScholarDAOToken,
  ScholarDAOCirculatingSupply, ScholarDAOToken,
  StakedScholarDAOToken,
  Staking,
  Treasury
} from "../../types";
import {
  DAO_WALLET,
  DEBTOR_TYPE,
  DEX_FACTORY,
  DEX_ROUTER,
  LIQUIDITY_DEPOSITOR_TYPE,
  PSDAO,
  RESERVE_DEPOSITOR_TYPE,
  REWARD_MANAGER_TYPE,
  SDAO_LIQ_SDAO_DAI,
  TREASURY_QUEUE_LENGTH,
  DAI,
  DAI_LIQ_SDAO_DAI,
  ZERO_ADDR,
  SDAO_TEAM_ALLOC,
  SDAO_DEVELOPMENT_PARTNERSHIP_ALLOC,
  SDAO_MARKETING_ALLOC,
  SDAO_DONATIONS_ALLOC,
  MAX_APPROVE, DEVELOPMENT_PARTNERSHIP_WALLET, MARKETING_WALLET, DONATIONS_WALLET
} from "./constants";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  const dai = await ethers.getContractAt("ERC20", DAI, deployer);

  console.log("[Deploying base contracts]");

  const SDAO = await ethers.getContractFactory("ScholarDAOToken");
  const sdao = await SDAO.deploy(PSDAO) as ScholarDAOToken;

  await sdao.deployed();

  console.log("SDAO deployed to:", sdao.address);

  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy(
      sdao.address,
      dai.address,
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
  const stakingDistributorRate = 600;

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

  await waitFor(treasury.queue(LIQUIDITY_DEPOSITOR_TYPE, DAO_WALLET));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(LIQUIDITY_DEPOSITOR_TYPE, DAO_WALLET, ZERO_ADDR));

  await waitFor(treasury.queue(RESERVE_DEPOSITOR_TYPE, deployer.address));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(RESERVE_DEPOSITOR_TYPE, deployer.address, ZERO_ADDR));

  await waitFor(treasury.queue(RESERVE_DEPOSITOR_TYPE, DAO_WALLET));
  // Need to wait x seconds
  await delay(TREASURY_QUEUE_LENGTH);
  await waitFor(treasury.toggle(RESERVE_DEPOSITOR_TYPE, DAO_WALLET, ZERO_ADDR));

  // TODO: See if below used for testing
  // const depositAmount = BigNumber.from("0xa604b9a42df9ca00000");
  //
  // await waitFor(dai.approve(treasury.address, depositAmount));

  // First DAI deposit (generates SDAO base liquidity -> added to lp)
  // TODO: See if needed below / manually done ?
  // const depositProfit = BigNumber.from("0x13d3b5419000")
  //
  // await waitFor(treasury.deposit(depositAmount, dai.address, depositProfit));

  const dexFactory = await ethers.getContractAt("IUniswapV2Factory", DEX_FACTORY, deployer);

  await waitFor(dexFactory.createPair(sdao.address, dai.address));

  const SDAO_DAI_PAIR = await dexFactory.getPair(sdao.address, dai.address);
  
  console.log("SDAO-DAI pair address:", SDAO_DAI_PAIR);

  await waitFor(sdao.setPair(SDAO_DAI_PAIR));

  const dexRouter = await ethers.getContractAt("UniswapV2Router", DEX_ROUTER, deployer);
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 120;

  await waitFor(sdao.approve(dexRouter.address, SDAO_LIQ_SDAO_DAI));
  await waitFor(dai.approve(dexRouter.address, DAI_LIQ_SDAO_DAI));

  await waitFor(dexRouter.addLiquidity(
      dai.address,
      sdao.address,
      DAI_LIQ_SDAO_DAI,
      SDAO_LIQ_SDAO_DAI,
      DAI_LIQ_SDAO_DAI,
      SDAO_LIQ_SDAO_DAI,
      DAO_WALLET,
      addLpDeadline
  ));

  // Finishing other allocations / team timelock
  const psdao = await ethers.getContractAt("PresaleScholarDAOToken", PSDAO) as PresaleScholarDAOToken;

  await waitFor(psdao.approve(sdao.address, MAX_APPROVE));
  await waitFor(sdao.enableClaim());
  await waitFor(sdao.claimFromPresale());

  const TeamTimelock = await ethers.getContractFactory("ScholarDAOTeamTimelock");
  const teamTimelock = await TeamTimelock.deploy(sdao.address, DAO_WALLET);

  console.log("Team timelock deployed to:", teamTimelock.address);

  await waitFor(sdao.transfer(teamTimelock.address, SDAO_TEAM_ALLOC));
  await waitFor(sdao.transfer(DEVELOPMENT_PARTNERSHIP_WALLET, SDAO_DEVELOPMENT_PARTNERSHIP_ALLOC));
  await waitFor(sdao.transfer(MARKETING_WALLET, SDAO_MARKETING_ALLOC));
  await waitFor(sdao.transfer(DONATIONS_WALLET, SDAO_DONATIONS_ALLOC));
  // TODO: Transfer all tokens to associated wallets from DAO multisig (multisig for each ? which ?)

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
  await waitFor(staking.pushManagement(DAO_WALLET));
  await waitFor(ssdao.pushManagement(DAO_WALLET));
  await waitFor(distributor.pushManagement(DAO_WALLET));
  await waitFor(circulatingSupply.transferOwnership(DAO_WALLET));

  // Then adjusting staking with distributor.addRecipient
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
