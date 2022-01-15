// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {BigNumber} from "ethers";
import {waitFor} from "./txHelper";
import {
  BondDepository, BondDepositoryWFTM,
  Distributor,
  ERC20,
  PresaleScholarDAOToken,
  PrivateSale, ScholarDAOCirculatingSupply, ScholarDAOToken,
  Staking,
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

  await waitFor(psdao.transfer(privateSale.address, await psdao.balanceOf(deployer.address)));

  await waitFor(privateSale.approveBuyer(deployer.address));
  await waitFor(psdao.addApprovedSeller(privateSale.address));

  await waitFor(usdc.approve(privateSale.address, MAX_APPROVE));

  // = 2000.000000 -> 6 decimals on USDC
  const amountToBuy = "0x77359400"

  console.log("Buy for 2000 USDC");

  await waitFor(privateSale.buyPSDAO(amountToBuy));

  console.log("Received:", await psdao.balanceOf(deployer.address), "PSDAO");

  console.log("Private sale init PSDAO:", await psdao.balanceOf(privateSale.address), "PSDAO");

  console.log("Burning remaining PSDAO")

  await waitFor(privateSale.burnRemainingPSDAOD());

  console.log("Private sale after burn PSDAO:", await psdao.balanceOf(privateSale.address), "PSDAO");

  console.log("Buyer USDC:", await usdc.balanceOf(deployer.address), "USDC");

  console.log("Private sale USDC:", await usdc.balanceOf(privateSale.address), "USDC");

  console.log("Withdraw USDC");

  await waitFor(privateSale.withdrawTokenIn());

  console.log("Buyer after withdraw USDC:", await usdc.balanceOf(deployer.address), "USDC");

  console.log("Private sale after withdraw USDC:", await usdc.balanceOf(privateSale.address), "USDC");

  const SDAO = await ethers.getContractFactory("ScholarDAOToken");
  const sdao = await SDAO.deploy(psdao.address) as ScholarDAOToken;

  await sdao.deployed();

  console.log("SDAO deployed to:", sdao.address);

  console.log("Buyer SDAO:", await sdao.balanceOf(deployer.address), "SDAO");
  console.log("Buyer PSDAO:", await psdao.balanceOf(deployer.address), "PSDAO");

  await waitFor(psdao.approve(sdao.address, await psdao.balanceOf(deployer.address)));
  await waitFor(sdao.claimWithPSDAO());

  console.log("Buyer after claim SDAO:", await sdao.balanceOf(deployer.address), "SDAO");
  console.log("Buyer after claim PSDAO:", await psdao.balanceOf(deployer.address), "PSDAO");
  console.log("PSDAO total supply:", await psdao.totalSupply(), "PSDAO");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
