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

  const BUSDT = await ethers.getContractFactory("BUSDT");
  const busdt = await BUSDT.deploy();

  await busdt.deployed();

  console.log("BUSDT deployed to:", busdt.address);

  const WBNB = await ethers.getContractFactory("WBNB");
  const wbnb = await WBNB.deploy();

  await wbnb.deployed();

  console.log("WBNB deployed to:", wbnb.address);

  const CAKE = await ethers.getContractFactory("CAKE");
  const cake = await CAKE.deploy();

  await cake.deployed();

  console.log("CAKE deployed to:", cake.address);

  const ETH = await ethers.getContractFactory("ETH");
  const eth = await ETH.deploy();

  await eth.deployed();

  console.log("ETH deployed to:", eth.address);

  const BTC = await ethers.getContractFactory("BTCB");
  const btc = await BTC.deploy();

  await btc.deployed();

  console.log("BTCB deployed to:", btc.address);

  console.log("\n\n[Deploy test DEX]");

  const deadAddr = "0x000000000000000000000000000000000000dEaD";

  const pancakeFactoryFeeToSetter = deadAddr;
  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
  const pancakeFactory = await PancakeFactory.deploy(pancakeFactoryFeeToSetter);

  await pancakeFactory.deployed();

  console.log("Pancake factory deployed to:", pancakeFactory.address);

  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");
  const pancakeRouter = await PancakeRouter.deploy(
      pancakeFactory.address,
      wbnb.address
  );

  await pancakeRouter.deployed();

  console.log("Pancake router deployed to:", pancakeRouter.address);

  console.log("\n\n[Deploy initial test liquidity]");

  const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 120;
  const CAKE_LIQ_CAKE_WBNB = BigNumber.from("0xacd808cc2fd5f08964d4e");
  const WBNB_LIQ_CAKE_WBNB = BigNumber.from("0x405c9ca003edbf14531d");

  await waitFor(cake.approve(pancakeRouter.address, MAX_APPROVE));
  await waitFor(wbnb.approve(pancakeRouter.address, MAX_APPROVE));

  console.log("\n\n[Adding CAKE-WBNB liquidity]");

  await waitFor(pancakeRouter.addLiquidity(
      cake.address,
      wbnb.address,
      CAKE_LIQ_CAKE_WBNB,
      WBNB_LIQ_CAKE_WBNB,
      CAKE_LIQ_CAKE_WBNB,
      WBNB_LIQ_CAKE_WBNB,
      deadAddr,
      addLpDeadline
  ));

  const ETH_LIQ_ETH_WBNB = BigNumber.from("0x34c8060c34d7f01ed3a");
  const WBNB_LIQ_ETH_WBNB = BigNumber.from("0x17e947a86b58cb502bd4");

  await waitFor(eth.approve(pancakeRouter.address, MAX_APPROVE));

  console.log("\n\n[Adding ETH-WBNB liquidity]");

  await waitFor(pancakeRouter.addLiquidity(
      eth.address,
      wbnb.address,
      ETH_LIQ_ETH_WBNB,
      WBNB_LIQ_ETH_WBNB,
      ETH_LIQ_ETH_WBNB,
      WBNB_LIQ_ETH_WBNB,
      deadAddr,
      addLpDeadline
  ));

  const BTCB_LIQ_BTCB_WBNB = BigNumber.from("0x353402904b7266f82a");
  const WBNB_LIQ_BTCB_WBNB = BigNumber.from("0x12a21632dac949605a5b");

  await waitFor(btc.approve(pancakeRouter.address, MAX_APPROVE));

  console.log("\n\n[Adding BTC-WBNB liquidity]");

  await waitFor(pancakeRouter.addLiquidity(
      btc.address,
      wbnb.address,
      BTCB_LIQ_BTCB_WBNB,
      WBNB_LIQ_BTCB_WBNB,
      BTCB_LIQ_BTCB_WBNB,
      WBNB_LIQ_BTCB_WBNB,
      deadAddr,
      addLpDeadline
  ));

  console.log("\n\n[Deploying test contracts]");

  const Treasury = await ethers.getContractFactory("SDOGETreasury");
  // TODO: Add other treasury owners (multisig)
  const treasury = await Treasury.deploy([deployer.address]);

  await treasury.deployed();

  console.log("Treasury deployed to:", treasury.address);

  const SDOGE = await ethers.getContractFactory("SDOGE");
  const sdoge = await SDOGE.deploy();

  await sdoge.deployed();

  console.log("SDOGE deployed to:", sdoge.address);

  const SSDOGE = await ethers.getContractFactory("sSDOGE");
  const ssdoge = await SSDOGE.deploy();

  await ssdoge.deployed();

  console.log("Staked SDOGE deployed to:", ssdoge.address);

  // TODO: Check epoch values below
  const stakingEpochLength = 9600;
  const stakingFirstEpochNumber = 0;
  const stakingFirstEpochBlock = await ethers.provider.getBlockNumber();

  const SDOGEStaking = await ethers.getContractFactory("SDOGEStaking");
  const sdogeStaking = await SDOGEStaking.deploy(
      sdoge.address,
      ssdoge.address,
      stakingEpochLength,
      stakingFirstEpochNumber,
      stakingFirstEpochBlock
  );

  await sdogeStaking.deployed();

  console.log("SDOGE staking deployed to:", sdogeStaking.address);

  const ssdogeIndex = 4099305890;

  await waitFor(ssdoge.initialize(sdogeStaking.address));
  await waitFor(ssdoge.setIndex(ssdogeIndex));
  // TODO: See what addresses to add below
  await waitFor(sdoge.setNonCirculatingAddresses([
      "0x0000000000000000000000000000000000000000",
      "0x000000000000000000000000000000000000dEaD",
      sdogeStaking.address
  ]));

  const SDOGEStakingEscrow = await ethers.getContractFactory("SDOGEStakingEscrow");
  const sdogeStakingEscrow = await SDOGEStakingEscrow.deploy(
      sdogeStaking.address,
      ssdoge.address
  );

  await sdogeStakingEscrow.deployed();

  console.log("SDOGE staking escrow deployed to:", sdogeStakingEscrow.address);

  const escrowContractType = 1;

  await waitFor(sdogeStaking.setContract(escrowContractType, sdogeStakingEscrow.address));

  const reservoirQueueLength = 10;
  const Reservoir = await ethers.getContractFactory("Reservoir");
  const reservoir = await Reservoir.deploy(
      sdoge.address,
      busdt.address,
      reservoirQueueLength
  );

  await reservoir.deployed();

  console.log("Reservoir deployed to:", reservoir.address);

  await waitFor(sdoge.setMinter(reservoir.address));

  const depositorQueueType = 2;

  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(depositorQueueType, treasury.address).then(async ()=> {
    // Need to wait 600s
    await delay(reservoirQueueLength);

    const depositorToggleTarget = 2;

    await waitFor(reservoir.toggle(depositorToggleTarget, treasury.address));
  });

  const distributorEpochLength = 9600;
  const distributorNextEpochBlock = 0;
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
      reservoir.address,
      sdoge.address,
      distributorEpochLength,
      distributorNextEpochBlock
  );

  await distributor.deployed();

  console.log("Distributor deployed to:", distributor.address);

  // TODO: Last value below was 50, check if needs update.
  const distributorRate = 10;

  await waitFor(distributor.addRecipient(sdogeStaking.address, distributorRate));

  const rewardManagerQueueType = 7;

  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(rewardManagerQueueType, distributor.address).then(async () => {
    // Need to wait 600s
    await delay(reservoirQueueLength);

    const rewardManagerToggleTarget = 7;

    await waitFor(reservoir.toggle(rewardManagerToggleTarget, distributor.address));
  });

  const distributorContractType = 0;

  await waitFor(sdogeStaking.setContract(distributorContractType, distributor.address));

  // TODO: Check execTransaction: approve BUSDT (owner: treasury, spender: reservoir, value: 34000000000000000000000)

  const BUSDT_LIQ_SDOGE_BUSDT = BigNumber.from("0x11f8b93327bae7247df07");
  const SDOGE_LIQ_SDOGE_BUSDT = BigNumber.from("0xb70b7996f29");

  const BUSD_LIQ_SDOGE_BUSD = BigNumber.from("0x6723550addf91fa090f0");
  const SDOGE_LIQ_SDOGE_BUSD = BigNumber.from("0x419ee22c815");

  await waitFor(busdt.approve(pancakeRouter.address, MAX_APPROVE));
  await waitFor(sdoge.approve(pancakeRouter.address, MAX_APPROVE));
  await waitFor(busd.approve(pancakeRouter.address, MAX_APPROVE));

  const lpTo = deadAddr;

  console.log("\n\n[Adding SDOGE-BUSDT liquidity]");

  await waitFor(pancakeRouter.addLiquidity(
      sdoge.address,
      busdt.address,
      SDOGE_LIQ_SDOGE_BUSDT,
      BUSDT_LIQ_SDOGE_BUSDT,
      SDOGE_LIQ_SDOGE_BUSDT,
      BUSDT_LIQ_SDOGE_BUSDT,
      lpTo,
      addLpDeadline
  ));

  console.log("\n\n[Adding SDOGE-BUSD liquidity]");

  await waitFor(pancakeRouter.addLiquidity(
      sdoge.address,
      busd.address,
      SDOGE_LIQ_SDOGE_BUSD,
      BUSD_LIQ_SDOGE_BUSD,
      SDOGE_LIQ_SDOGE_BUSD,
      BUSD_LIQ_SDOGE_BUSD,
      lpTo,
      addLpDeadline
  ));

  const BondCalculator = await ethers.getContractFactory("BondCalculator");
  const bondCalculator = await BondCalculator.deploy();

  await bondCalculator.deployed();

  console.log("Bond calculator deployed to:", bondCalculator.address);

  const SDOGE_BUSDT_PAIR = await pancakeFactory.getPair(sdoge.address, busdt.address);

  const SDOGEBond = await ethers.getContractFactory("SDOGEBond");
  const sdogeBUSDTBond = await SDOGEBond.deploy(
      sdoge.address,
      SDOGE_BUSDT_PAIR,
      reservoir.address,
      treasury.address,
      bondCalculator.address
  );

  await sdogeBUSDTBond.deployed();

  console.log("SDOGE BUSDT bond deployed to:", sdogeBUSDTBond.address);

  await waitFor(sdogeBUSDTBond.setStaking(sdogeStaking.address));

  const bondQueueType = 1;

  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(bondQueueType, sdogeBUSDTBond.address).then(async () => {
    await delay(reservoirQueueLength);

    const bondToggleTarget = 1;

    await waitFor(reservoir.toggle(bondToggleTarget, sdogeBUSDTBond.address));
  });

  const SDOGE_BUSD_PAIR = await pancakeFactory.getPair(sdoge.address, busd.address);

  const sdogeBUSDBond = await SDOGEBond.deploy(
      sdoge.address,
      SDOGE_BUSD_PAIR,
      reservoir.address,
      treasury.address,
      bondCalculator.address
  );

  await sdogeBUSDBond.deployed();

  console.log("SDOGE BUSD bond deployed to:", sdogeBUSDBond.address);


  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(bondQueueType, sdogeBUSDBond.address).then(async () => {
    await delay(reservoirQueueLength);

    const bondToggleTarget = 1;

    await waitFor(reservoir.toggle(bondToggleTarget, sdogeBUSDBond.address));

    // TODO: See if working here / see if timeout needed for init
    reservoir.queue(bondQueueType, sdogeBUSDTBond.address).then(async () => {
      await delay(reservoirQueueLength);

      const bondToggleTarget = 1;

      await waitFor(reservoir.toggle(bondToggleTarget, sdogeBUSDTBond.address));
    });
  });

  // TODO: check unknown contract creation: 0x7B014ff65CC3C03aB00220A1100905BBEDb74271

  const referralFees = 1000000000;
  const referrerShare = 1000;
  const depositorShare = 1000;
  const Referral = await ethers.getContractFactory("Referral");
  const referral = await Referral.deploy(
      sdoge.address,
      treasury.address,
      referralFees,
      referrerShare,
      depositorShare
  );

  await referral.deployed();

  console.log("Referral deployed to:", referral.address);

  const BUSDTbondControlVariable = 130;
  const BUSDbondControlVariable = 140;
  const bondPeriod = 144000;
  const bondMinPrice = 0;
  const bondMaxPayout = 30;
  const bondFee = 10000;
  const BUSDTbondMaxDebt = 100000000000000;
  const BUSDbondMaxDebt = 400000000000000;
  const bondInitialDebt = 0;

  await waitFor(sdogeBUSDTBond.initializeBondTerms(
      BUSDTbondControlVariable,
      bondPeriod,
      bondMinPrice,
      bondMaxPayout,
      bondFee,
      BUSDTbondMaxDebt,
      bondInitialDebt
  ));
  await waitFor(sdogeBUSDTBond.setReferral(referral.address));

  await waitFor(sdogeBUSDBond.initializeBondTerms(
      BUSDbondControlVariable,
      bondPeriod,
      bondMinPrice,
      bondMaxPayout,
      bondFee,
      BUSDbondMaxDebt,
      bondInitialDebt
  ));
  await waitFor(sdogeBUSDBond.setReferral(referral.address));

  const SDOGEBondHelper = await ethers.getContractFactory("SDOGEBondHelper");
  const sdogeBUSDTBondHelper = await SDOGEBondHelper.deploy(
      sdogeBUSDTBond.address,
      pancakeRouter.address
  );

  await sdogeBUSDTBondHelper.deployed();

  console.log("SDOGE BUSDT bond helper deployed to:", sdogeBUSDTBondHelper.address);

  const sdogeBUSDBondHelper = await SDOGEBondHelper.deploy(
      sdogeBUSDBond.address,
      pancakeRouter.address
  );

  await sdogeBUSDBondHelper.deployed();

  console.log("SDOGE BUSD bond helper deployed to:", sdogeBUSDBondHelper.address);

  const SDOGEBondPCSHelper = await ethers.getContractFactory("SDOGEBondPCSHelper");
  const sdogeBondPCSHelper = await SDOGEBondPCSHelper.deploy(pancakeRouter.address);

  await sdogeBondPCSHelper.deployed();

  console.log("SDOGE bond PCS helper deployed to:", sdogeBondPCSHelper.address);

  // TODO: Check below, last values set for now.
  await waitFor(distributor.setAdjustment(
      0,
      false,
      0,
      1800
  ));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
