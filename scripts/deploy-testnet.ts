// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {BigNumber} from "ethers";
import {waitFor} from "./txHelper";

function delay(s: number) {
  return new Promise( resolve => setTimeout(resolve, s * 1000) );
}

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  // --- Prepare network (create fake tokens, pcs contracts) ---
  console.log("[Deploy test tokens]");

  const BUSD = await ethers.getContractFactory("BUSD");
  const busd = await BUSD.deploy();

  await busd.deployed();

  console.log("BUSD deployed to:", busd.address);

  // const BUSDT = await ethers.getContractFactory("BUSDT");
  // const busdt = await BUSDT.deploy();
  //
  // await busdt.deployed();
  //
  // console.log("BUSDT deployed to:", busdt.address);

  const WBNB = await ethers.getContractFactory("WBNB");
  const wbnb = await WBNB.deploy();

  await wbnb.deployed();

  console.log("WBNB deployed to:", wbnb.address);

  console.log("[Deploy initial test liquidity]");

  const PANCAKE_ROUTER = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
  const pancakeRouter = await ethers.getContractAt("PancakeRouter", PANCAKE_ROUTER, deployer);
  const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 120;
  const deadAddr = "0x000000000000000000000000000000000000dEaD";
  const zeroAddr = "0x0000000000000000000000000000000000000000";

  const BUSD_LIQ_BUSD_WBNB = BigNumber.from("0xc104ca41a930617fe5f39b");
  const WBNB_LIQ_BUSD_WBNB = BigNumber.from("0x6ab8340aba4d061a3dd1");

  await waitFor(busd.approve(pancakeRouter.address, MAX_APPROVE));
  await waitFor(wbnb.approve(pancakeRouter.address, MAX_APPROVE));

  console.log("[Adding BUSD-WBNB liquidity]");

  await waitFor(pancakeRouter.addLiquidity(
      busd.address,
      wbnb.address,
      BUSD_LIQ_BUSD_WBNB,
      WBNB_LIQ_BUSD_WBNB,
      BUSD_LIQ_BUSD_WBNB,
      WBNB_LIQ_BUSD_WBNB,
      deadAddr,
      addLpDeadline
  ));

  const SDOGE = await ethers.getContractFactory("ScholarDogeToken");
  const sdoge = await SDOGE.deploy();

  await sdoge.deployed();

  console.log("SDOGE deployed to:", sdoge.address);

  const treasuryQueueLength = 0;
  const Treasury = await ethers.getContractFactory("Treasury");
  // TODO: Add other treasury owners (multisig)
  const treasury = await Treasury.deploy(
      sdoge.address,
      busd.address,
      treasuryQueueLength
  );

  await treasury.deployed();

  console.log("Treasury deployed to:", treasury.address);

  const distributorEpochLength = 9600;
  // See value to set here, block nb including tx was 12793518 (+14)
  const distributorNextEpochBlock = await ethers.provider.getBlockNumber();
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
      treasury.address,
      sdoge.address,
      distributorEpochLength,
      distributorNextEpochBlock
  );

  await distributor.deployed();

  console.log("Distributor deployed to:", distributor.address);

  const SSDOGE = await ethers.getContractFactory("StakedScholarDogeToken");
  const ssdoge = await SSDOGE.deploy();

  await ssdoge.deployed();

  console.log("Staked SDOGE deployed to:", ssdoge.address);

  // TODO: Check epoch values below
  const stakingEpochLength = 9600;
  const stakingFirstEpochNumber = 1;
  const stakingFirstEpochBlock = await ethers.provider.getBlockNumber();

  const Staking = await ethers.getContractFactory("Staking");
  const sdogeStaking = await Staking.deploy(
      sdoge.address,
      ssdoge.address,
      stakingEpochLength,
      stakingFirstEpochNumber,
      stakingFirstEpochBlock
  );

  await sdogeStaking.deployed();

  console.log("SDOGE staking deployed to:", sdogeStaking.address);

  const StakingHelper = await ethers.getContractFactory("StakingHelper");
  const sdogeStakingHelper = await StakingHelper.deploy(
      sdogeStaking.address,
      sdoge.address
  );

  await sdogeStakingHelper.deployed();

  console.log("SDOGE staking helper deployed to:", sdogeStakingHelper.address);

  // TODO: Set real DAO here later
  const DAO = deployer.address;
  const busdBondCalculator = zeroAddr;
  const BondDepository = await ethers.getContractFactory("BondDepository");
  const busdBond = await BondDepository.deploy(
      sdoge.address,
      busd.address,
      treasury.address,
      DAO,
      busdBondCalculator
  );

  await busdBond.deployed();

  console.log("BUSD bond deployed to:", busdBond.address);

  const reserveDepositorType = 0;

  treasury.queue(reserveDepositorType, busdBond.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(reserveDepositorType, busdBond.address, busd.address));
  });

  const busdBondControlVariable = 0;
  const busdBondVestingTerm = 144000;
  const busdBondMinPrice = 300;
  const busdBondMaxPayout = 1000;
  const busdBondFee = 10000;
  const busdBondMaxDebt = 1000000000000000;
  const busdBondInitialDebt = 0;

  await waitFor(busdBond.initializeBondTerms(
      busdBondControlVariable,
      busdBondVestingTerm,
      busdBondMinPrice,
      busdBondMaxPayout,
      busdBondFee,
      busdBondMaxDebt,
      busdBondInitialDebt
  ));

  await waitFor(busdBond.setStaking(sdogeStaking.address, false));

  const StakingWarmup = await ethers.getContractFactory("StakingWarmup");
  const stakingWarmup = await StakingWarmup.deploy(
      sdogeStaking.address,
      sdoge.address
  );

  console.log("Staking warmup deployed to:", stakingWarmup.address);

  await waitFor(ssdoge.initialize(sdogeStaking.address));

  const ssdogeFirstIndex = 1000000000;

  await waitFor(ssdoge.setIndex(ssdogeFirstIndex));

  const distributorContractType = 0;

  await waitFor(sdogeStaking.setContract(distributorContractType, distributor.address));

  const warmupContractType = 1;

  await waitFor(sdogeStaking.setContract(warmupContractType, stakingWarmup.address));

  await waitFor(sdoge.setVault(treasury.address));

  const stakingDistributorRate = 3000;

  await waitFor(distributor.addRecipient(sdogeStaking.address, stakingDistributorRate));

  const rewardManagerType = 8;

  treasury.queue(rewardManagerType, distributor.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(rewardManagerType, distributor.address, zeroAddr));
  });

  const liquidityDepositorType = 4;

  // TODO: See why here adding deployer itself to liquidity depositor if testing, remove for mainnet.
  treasury.queue(liquidityDepositorType, deployer.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(liquidityDepositorType, deployer.address, zeroAddr));
  });

  // TODO: See why here adding deployer itself to reserve depositor if testing, remove for mainnet.
  treasury.queue(reserveDepositorType, deployer.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(reserveDepositorType, deployer.address, zeroAddr));
  });

  // TODO: See if below used for testing
  const depositAmount = BigNumber.from("0xa604b9a42df9ca00000");

  await waitFor(busd.approve(treasury.address, depositAmount));

  const depositProfit = BigNumber.from("0x13d3b5419000")
  await waitFor(treasury.deposit(depositAmount, busd.address, depositProfit));

  const PANCAKE_FACTORY = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";
  const pancakeFactory = await ethers.getContractAt("IPancakeFactory", PANCAKE_FACTORY, deployer);

  await waitFor(pancakeFactory.createPair(sdoge.address, busd.address));

  const SDOGE_BUSD_PAIR = await pancakeFactory.getPair(sdoge.address, busd.address);
  // TODO: Check values below for launch (LIQUIDITY)
  const SDOGE_LIQ_SDOGE_BUSD = BigNumber.from("0x18bcfe568000");
  const BUSD_LIQ_SDOGE_BUSD = BigNumber.from("0x1ccc9324511e45000000");

  await waitFor(sdoge.approve(pancakeRouter.address, SDOGE_LIQ_SDOGE_BUSD));
  await waitFor(busd.approve(pancakeRouter.address, BUSD_LIQ_SDOGE_BUSD));

  await waitFor(pancakeRouter.addLiquidity(
      busd.address,
      sdoge.address,
      BUSD_LIQ_SDOGE_BUSD,
      SDOGE_LIQ_SDOGE_BUSD,
      BUSD_LIQ_SDOGE_BUSD,
      SDOGE_LIQ_SDOGE_BUSD,
      deployer.address,
      addLpDeadline
  ));

  const BondingCalculator = await ethers.getContractFactory("BondingCalculator");
  const bondingCalculator = await BondingCalculator.deploy(sdoge.address);

  await bondingCalculator.deployed();

  console.log("Bonding calculator deployed to:", bondingCalculator.address);

  const sdogeBusdBond = await BondDepository.deploy(
      sdoge.address,
      SDOGE_BUSD_PAIR,
      treasury.address,
      DAO,
      bondingCalculator.address
  );

  await sdogeBusdBond.deployed();

  console.log("SDOGE-BUSD LP bond deployed to:", sdogeBusdBond.address);

  // TODO: See why here adding deployer itself to liquidity depositor if testing, remove for mainnet.
  treasury.queue(liquidityDepositorType, sdogeBusdBond.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(liquidityDepositorType, sdogeBusdBond.address, busd.address));
  });

  const liquidityTokenType = 5;

  treasury.queue(liquidityTokenType, SDOGE_BUSD_PAIR).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(liquidityTokenType, SDOGE_BUSD_PAIR, bondingCalculator.address));
  });

  const sdogeBusdBondControlVariable = 0;
  const sdogeBusdBondVestingTerm = 144000;
  const sdogeBusdBondMinPrice = 200;
  const sdogeBusdBondMaxPayout = 1000;
  const sdogeBusdBondFee = 10000;
  const sdogeBusdBondMaxDebt = 1000000000000000;
  const sdogeBusdBondInitialDebt = 0;

  await waitFor(sdogeBusdBond.initializeBondTerms(
      sdogeBusdBondControlVariable,
      sdogeBusdBondVestingTerm,
      sdogeBusdBondMinPrice,
      sdogeBusdBondMaxPayout,
      sdogeBusdBondFee,
      sdogeBusdBondMaxDebt,
      sdogeBusdBondInitialDebt
  ));

  await waitFor(sdogeBusdBond.setStaking(sdogeStaking.address, false));

  // Chainlink (mainnet: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE ; testnet: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526)
  const CHAINLINK_BNB_USD_PRICE_FEED = "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526";
  const chainLinkBNBBUSDPriceFeed = await ethers.getContractAt("ChainLinkBNBBUSDPriceFeed", CHAINLINK_BNB_USD_PRICE_FEED, deployer);

  const BondDepositoryWBNB = await ethers.getContractFactory("BondDepositoryWBNB");
  const wbnbBond = await BondDepositoryWBNB.deploy(
      sdoge.address,
      wbnb.address,
      treasury.address,
      DAO,
      chainLinkBNBBUSDPriceFeed.address
  );

  await wbnbBond.deployed();

  console.log("WBNB bond deployed to:", wbnbBond.address);

  const RedeemHelper = await ethers.getContractFactory("RedeemHelper");
  const redeemHelper = await RedeemHelper.deploy();

  await redeemHelper.deployed();

  console.log("Redeem helper deployed to:", redeemHelper.address);

  await waitFor(redeemHelper.addBond(busdBond));
  await waitFor(redeemHelper.addBond(sdogeBusdBond));
  await waitFor(redeemHelper.addBond(wbnbBond));

  const CirculatingSupply = await ethers.getContractFactory("ScholarDogeCirculatingSupply");
  const circulatingSupply = await CirculatingSupply.deploy(deployer.address);

  await circulatingSupply.deployed();

  console.log("ScholarDoge circulating supply deployed to:", circulatingSupply.address);

  await waitFor(circulatingSupply.initialize(sdoge.address));
  // TODO: See if need to add more below
  await waitFor(circulatingSupply.setNonCirculatingSDOGEAddresses(
      [distributor.address, deadAddr, zeroAddr]
  ));

  treasury.queue(rewardManagerType, wbnbBond.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(rewardManagerType, wbnbBond.address, zeroAddr));
  });

  const reserveTokenType = 2;

  treasury.queue(reserveTokenType, wbnb.address).then(async () => {
    // Need to wait x seconds
    await delay(treasuryQueueLength);
    await waitFor(treasury.toggle(reserveTokenType, wbnb.address, zeroAddr));
  });

  // TODO: See if below was needed
  const wbnbBondVestingValue = 100000;

  await waitFor(wbnbBond.setBondTerms(0, wbnbBondVestingValue));

  const wbnbBondControlVariable = 0;
  const wbnbBondVestingTerm = 144000;
  const wbnbBondMinPrice = 200;
  const wbnbBondMaxPayout = 1000;
  const wbnbBondMaxDebt = 1000000000000000;
  const wbnbBondInitialDebt = 0;

  await waitFor(wbnbBond.initializeBondTerms(
      wbnbBondControlVariable,
      wbnbBondVestingTerm,
      wbnbBondMinPrice,
      wbnbBondMaxPayout,
      wbnbBondMaxDebt,
      wbnbBondInitialDebt
  ));

  await waitFor(wbnbBond.setStaking(sdogeStaking.address, false));

  // TODO: See if below needed, if so see if way to refactor this.

  const bcvBondTerm = 4;
  const busdBondBcvBondTermValue = 498;

  await waitFor(busdBond.setBondTerms(bcvBondTerm, busdBondBcvBondTermValue));

  const sdogeBusdBondBcvBondTermValue = 201;

  await waitFor(sdogeBusdBond.setBondTerms(bcvBondTerm, sdogeBusdBondBcvBondTermValue));

  const firstAdjustmentIndex = 0;
  const firstAdjustmentAdd = true;
  const firstAdjustmentRate = 10000;
  const firstAdjustmentTarget = 5000;

  await waitFor(distributor.setAdjustment(
      firstAdjustmentIndex,
      firstAdjustmentAdd,
      firstAdjustmentRate,
      firstAdjustmentTarget
  ));

  // TODO: See if below needed or need to adjust according to DAO votes
  const thirdAdjustmentIndex = 2;
  const thirdAdjustmentAdd = false;
  const thirdAdjustmentRate = 33000;
  const thirdAdjustmentTarget = 6000;

  await waitFor(distributor.setAdjustment(
      thirdAdjustmentIndex,
      thirdAdjustmentAdd,
      thirdAdjustmentRate,
      thirdAdjustmentTarget
  ));

  // TODO: See if below needed or need to adjust according to DAO votes
  const fourthAdjustmentIndex = 12;
  const fourthAdjustmentAdd = false;
  const fourthAdjustmentRate = 64;
  const fourthAdjustmentTarget = 3900;

  await waitFor(distributor.setAdjustment(
      fourthAdjustmentIndex,
      fourthAdjustmentAdd,
      fourthAdjustmentRate,
      fourthAdjustmentTarget
  ));

  // TODO: See if below needed or need to adjust according to DAO votes
  const secondStakingDistributorRate = 2750;
  await waitFor(distributor.addRecipient(sdogeStaking.address, secondStakingDistributorRate));

  // Then adjusting Bonds with setBondTerms
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
