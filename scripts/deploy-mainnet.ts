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
  const Treasury = await ethers.getContractFactory("SDOGETreasury");
  // TODO: Add other treasury owners (multisig)
  const treasury = await Treasury.deploy([deployer.address]);

  await treasury.deployed();

  console.log("Treasury deployed to:", treasury.address);

  // TODO: Remove below (contracts as well if no presales)
  // TODO: Remove as well all references to pre, check for voucher
  const PreSDOGE = await ethers.getContractFactory("pSDOGE");
  const preSDOGE = await PreSDOGE.deploy(treasury.address);

  await preSDOGE.deployed();

  console.log("Presale SDOGE deployed to:", preSDOGE.address);

  const BUSDT = "0x55d398326f99059fF775485246999027B3197955";
  const privateSaleRate = 20;
  const PrivateSale = await ethers.getContractFactory("PrivateSale");
  const privateSale = await PrivateSale.deploy(
      preSDOGE.address,
      BUSDT,
      privateSaleRate,
      treasury.address
  );

  await privateSale.deployed();

  console.log("Private sale deployed to:", privateSale.address);

  await waitFor(preSDOGE.addApprovedSeller(privateSale.address));

  // TODO: Check execTransaction: pSDOGE transfer(privateSale, 10000000000000000000000000)

  // TODO: Approve buyers below (privateSale.approveBuyer() / privateSale.approveBuyers()).

  const VoucherSDOGE = await ethers.getContractFactory("vSDOGE");
  const voucherSDOGE = await VoucherSDOGE.deploy(treasury.address);

  await voucherSDOGE.deployed();

  console.log("Voucher SDOGE deployed to:", voucherSDOGE.address);

  const VoucherSDOGEOffering = await ethers.getContractFactory("vSDOGEOffering");
  const voucherSDOGEOffering = await VoucherSDOGEOffering.deploy(
      voucherSDOGE.address,
      BUSDT,
      treasury.address
  )

  await voucherSDOGEOffering.deployed();

  console.log("Voucher SDOGE offering deployed to:", voucherSDOGEOffering.address);

  // TODO: Whitelist buyers here (voucherSDOGEOffering.whitelistBuyers()).

  // TODO: Check execTransaction: vSDOGE transfer(voucherSDOGEOffering, 50000000000000)

  const voucherSDOGEOfferingStart = BigNumber.from("0x3782dace9d900000");

  await waitFor(voucherSDOGEOffering.start(voucherSDOGEOfferingStart, 43200));

  // TODO: Buy tokens ???

  const SDOGE = await ethers.getContractFactory("SDOGE");
  const sdoge = await SDOGE.deploy();

  await sdoge.deployed();

  console.log("SDOGE deployed to:", sdoge.address);

  const SSDOGE = await ethers.getContractFactory("sSDOGE");
  const ssdoge = await SSDOGE.deploy();

  await ssdoge.deployed();

  console.log("Staked SDOGE deployed to:", ssdoge.address);

  // TODO: Check epoch values below
  const vaultEpochLength = 9600;
  const vaultFirstEpochNumber = 0;
  const vaultFirstEpochBlock = await ethers.provider.getBlockNumber();

  const SDOGEVault = await ethers.getContractFactory("SDOGEVault");
  const sdogeVault = await SDOGEVault.deploy(
      sdoge.address,
      ssdoge.address,
      vaultEpochLength,
      vaultFirstEpochNumber,
      vaultFirstEpochBlock
  );

  await sdogeVault.deployed();

  console.log("SDOGE vault deployed to:", sdogeVault.address);

  const ssdogeIndex = 4099305890;

  await waitFor(ssdoge.initialize(sdogeVault.address));
  await waitFor(ssdoge.setIndex(ssdogeIndex));
  // TODO: See what addresses to add below
  await waitFor(sdoge.setNonCirculatingAddresses([
      "0x0000000000000000000000000000000000000000",
      "0x000000000000000000000000000000000000dEaD",
      sdogeVault.address
  ]));

  const SDOGEVaultEscrow = await ethers.getContractFactory("SDOGEVaultEscrow");
  const sdogeVaultEscrow = await SDOGEVaultEscrow.deploy(
      sdogeVault.address,
      ssdoge.address
  );

  await sdogeVaultEscrow.deployed();

  console.log("SDOGE vault escrow deployed to:", sdogeVaultEscrow.address);

  const escrowContractType = 1;

  await waitFor(sdogeVault.setContract(escrowContractType, sdogeVaultEscrow.address));

  const reservoirQueueLength = 600;
  const Reservoir = await ethers.getContractFactory("Reservoir");
  const reservoir = await Reservoir.deploy(
      sdoge.address,
      BUSDT,
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
  const distributorNextEpochBlock = await ethers.provider.getBlockNumber(); // 0 ???
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

  await waitFor(distributor.addRecipient(sdogeVault.address, distributorRate));

  const rewardManagerQueueType = 7;

  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(rewardManagerQueueType, distributor.address).then(async () => {
    // Need to wait 600s
    await delay(reservoirQueueLength);

    const rewardManagerToggleTarget = 7;

    await waitFor(reservoir.toggle(rewardManagerToggleTarget, distributor.address));
  });

  const distributorContractType = 0;

  await waitFor(sdogeVault.setContract(distributorContractType, distributor.address));

  // TODO: Check execTransaction: approve BUSDT (owner: treasury, spender: reservoir, value: 34000000000000000000000)
  // TODO: Check execTransaction: reservoir.deposit(busd.address, 10200000000000000000000)

  // TODO: See if presale, else remove below
  const preVaultTokenIn = BUSDT;
  const PreSDOGEVault = await ethers.getContractFactory("pSDOGEVault");
  const preSDOGEVault = await PreSDOGEVault.deploy(
      sdoge.address,
      preSDOGE.address,
      preVaultTokenIn,
      reservoir.address
  );

  await preSDOGEVault.deployed();

  console.log("Pre SDOGE vault deployed to:", preSDOGEVault.address);

  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(depositorQueueType, preSDOGEVault.address).then(async ()=> {
    // Need to wait 600s
    await delay(reservoirQueueLength);

    const depositorToggleTarget = 2;

    await waitFor(reservoir.toggle(depositorToggleTarget, preSDOGEVault.address));
  });

  const voucherSDOGEVaultRedeemPeriod = 403200;
  const VoucherSDOGEVault = await ethers.getContractFactory("vSDOGEVault");
  const voucherSDOGEVault = await VoucherSDOGEVault.deploy(
      sdoge.address,
      voucherSDOGE.address,
      voucherSDOGEVaultRedeemPeriod
  );

  await voucherSDOGEVault.deployed();

  console.log("Voucher SDOGE vault deployed to:", voucherSDOGEVault.address);

  // TODO: Set base liquidity here / see if setting it later.
  const baseLiquidityBUSDT = BigNumber.from("0x11f8b93327bae7247df07");
  const baseLiquiditySDOGE = BigNumber.from("0xb70b7996f29");

  // TODO: Check execTransaction: BUSDT transfer(treasury.address, deployer.address, baseLiquidityBUSDT)
  // TODO: Check execTransaction: SDOGE transfer(treasury.address, deployer.address, baseLiquiditySDOGE)
  const busdt = await ethers.getContractAt("ERC20", BUSDT, deployer);

  const PANCAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  const MAX_APPROVE = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  await waitFor(busdt.approve(PANCAKE_ROUTER, MAX_APPROVE));
  await waitFor(sdoge.approve(PANCAKE_ROUTER, MAX_APPROVE));

  const pancakeRouter = await ethers.getContractAt("IPancakeRouter02", PANCAKE_ROUTER, deployer);
  const lpTo = deployer.address;
  const addLpDeadline = (await ethers.provider.getBlock("latest")).timestamp + 120;
  await waitFor(pancakeRouter.addLiquidity(
      sdoge.address,
      BUSDT,
      baseLiquiditySDOGE,
      baseLiquidityBUSDT,
      baseLiquiditySDOGE,
      baseLiquidityBUSDT,
      lpTo,
      addLpDeadline
  ));

  const BondCalculator = await ethers.getContractFactory("BondCalculator");
  const bondCalculator = await BondCalculator.deploy();

  await bondCalculator.deployed();

  console.log("Bond calculator deployed to:", bondCalculator.address);

  const PANCAKE_FACTORY = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
  const pancakeFactory = await ethers.getContractAt("IPancakeFactory", PANCAKE_FACTORY, deployer);
  const SDOGE_BUSDT_PAIR = await pancakeFactory.getPair(sdoge.address, BUSDT);
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

  await waitFor(sdogeBUSDTBond.setVault(sdogeVault.address));

  const bondQueueType = 1;

  // TODO: See if working here / see if timeout needed for init
  reservoir.queue(bondQueueType, sdogeBUSDTBond.address).then(async () => {
    await delay(reservoirQueueLength);

    const bondToggleTarget = 1;

    await waitFor(reservoir.toggle(bondToggleTarget, sdogeBUSDTBond.address));
  });

  /*const SDOGE_BUSD_PAIR = await pancakeFactory.getPair(sdoge.address, BU);

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
    delay(reservoirQueueLength * 10);

    const bondToggleTarget = 1;

    await waitFor(reservoir.toggle(bondToggleTarget, sdogeBUSDBond.address));
  });*/

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

  await waitFor(voucherSDOGE.approve(voucherSDOGEVault.address, MAX_APPROVE));

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

  /*await waitFor(sdogeBUSDBond.initializeBondTerms(
      BUSDbondControlVariable,
      bondPeriod,
      bondMinPrice,
      bondMaxPayout,
      bondFee,
      BUSDbondMaxDebt,
      bondInitialDebt
  ));
  await waitFor(sdogeBond.setReferral(referral.address));

  const SDOGEBondHelper = await ethers.getContractFactory("SDOGEBondHelper");
  const sdogeBondHelper = await SDOGEBondHelper.deploy(
      sdogeBond.address,
      PANCAKE_ROUTER
  );

  await sdogeBondHelper.deployed();

  console.log("SDOGE bond helper deployed to:", sdogeBondHelper.address);*/

  // TODO: Check data / signature below.
  /*const createOwnerReferralCode = "516b516166730000000000000000000000000000000000000000000000000000";
  const createOwnerReferralExpiry = 1630308753;
  const createOwnerReferralV = 28;
  const createOwnerReferralR = "c4841460178ef40ce399617b15322103428231daebdee8952bcc4ce00efd7188";
  const createOwnerReferralS = "70477f25f17e557303d7e84975523b07e5b744f50a08749c742c1068b96a50c6";
  // TODO: Sign transaction here to get v, r, s parameters
  await referral.createReferralWithPermit(
      deployer.address,
      createOwnerReferralCode,
      createOwnerReferralExpiry,
      createOwnerReferralV,
      createOwnerReferralR,
      createOwnerReferralS
  );*/

  // TODO: Checking if below = testing purposes
  // TODO: Check execTransaction: SDOGE transfer(treasury.address, voucherSDOGEVault.address, 8499000000000)
  // TODO: Check execTransaction: BUSDT transfer(treasury.address, deployer.address, 1000000000000000000000)

  const SDOGEBondPCSHelper = await ethers.getContractFactory("SDOGEBondPCSHelper");
  const sdogeBondPCSHelper = await SDOGEBondPCSHelper.deploy(PANCAKE_ROUTER);

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
