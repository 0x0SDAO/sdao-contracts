// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {waitFor} from "../txHelper";
import {
  PresaleScholarDAOToken,
  PrivateSale
} from "../../types";
import {DAI, DAO} from "./constants";

async function main() {
  // TODO: At the end, check all addresses and only deploy last ones / newest. then remove unused.
  const [deployer] = await ethers.getSigners();

  const dai = await ethers.getContractAt("ERC20", DAI, deployer);

  console.log("[Deploying presale]");

  // TODO Create presale deployment
  const PSDAO = await ethers.getContractFactory("PresaleScholarDAOToken");
  const psdao = await PSDAO.deploy() as PresaleScholarDAOToken;

  await psdao.deployed();

  console.log("PSDAO deployed to:", psdao.address);

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

  const amountForPresale = await psdao.balanceOf(deployer.address);
  await waitFor(psdao.transfer(privateSale.address, amountForPresale));

  await waitFor(psdao.addApprovedSeller(privateSale.address));

  // TODO: Whitelist buyers / purchase / process private sale

  await waitFor(privateSale.pushManagement(DAO));
  // TODO: Pull management from DAO wallet

  // TODO: Approve and burn unsold psdao
  // await waitFor(psdao.approve(privateSale.address, MAX_APPROVE));
  // await waitFor(privateSale.burnRemainingPSDAOD());
  // await waitFor(privateSale.withdrawTokenIn());
  // TODO:  add to liquidity / keep some in treasury ?
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
