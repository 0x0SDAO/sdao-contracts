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

  const SDOGE_ADDRESS = "0x72876276814B8d356E59278a49DF5E1C5DCae884";
  const TREASURY_ADDRESS = "0xF3b6899d641c69526bd449EEeAbE5414f2D478CE";
  const BUSD_BOND_ADDRESS = "0x1Dbc1eE1983A206b12fDc18b1263f0fF113764dB";
  const SDOGE_BUSD_BOND_ADDRESS = "0xA5c86dBCDD72f58cBCf737f3cA6c9e16FeDA42b1";
  const WBNB_BOND_ADDRESS = "0x36Cc5f9E74F37B4BA1Edc717D6c8c076882c9cA3";

  const SSDOGE = await ethers.getContractFactory("StakedScholarDogeToken");
  const ssdoge = await SSDOGE.deploy();

  await ssdoge.deployed();

  console.log("Staked SDOGE deployed to:", ssdoge.address);

  // TODO: Check epoch values below
  const stakingEpochLength = 28800;
  const stakingFirstEpochNumber = 1;
  const stakingFirstEpochTime = (await ethers.provider.getBlock("latest")).timestamp;

  const Staking = await ethers.getContractFactory("Staking");
  const sdogeStaking = await Staking.deploy(
      SDOGE_ADDRESS,
      ssdoge.address,
      stakingEpochLength,
      stakingFirstEpochNumber,
      stakingFirstEpochTime
  );

  await sdogeStaking.deployed();

  console.log("SDOGE staking deployed to:", sdogeStaking.address);

  // See value to set here, block nb including tx was 12793518 (+14)
  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy(
      TREASURY_ADDRESS,
      SDOGE_ADDRESS,
      sdogeStaking.address
  );

  await distributor.deployed();

  console.log("Distributor deployed to:", distributor.address);

  await waitFor(ssdoge.initialize(sdogeStaking.address));

  await waitFor(sdogeStaking.setDistributor(distributor.address));

  // 10 000% of total sdoge supply / 100 -> 0.01
  const stakingDistributorRate = 100;

  await waitFor(distributor.addRecipient(sdogeStaking.address, stakingDistributorRate));

  const busdBond = await ethers.getContractAt("BondDepository", BUSD_BOND_ADDRESS, deployer);
  const sdogeBusdBond = await ethers.getContractAt("BondDepository", SDOGE_BUSD_BOND_ADDRESS, deployer);
  const wbnbBond = await ethers.getContractAt("BondDepositoryWBNB", WBNB_BOND_ADDRESS, deployer);

  const sdoge = await ethers.getContractAt("ScholarDogeToken", SDOGE_ADDRESS, deployer);

  await waitFor(busdBond.setStaking(sdogeStaking.address, true));

  await waitFor(sdogeBusdBond.setStaking(sdogeStaking.address, true));

  await waitFor(wbnbBond.setStaking(sdogeStaking.address, true));

  await waitFor(sdoge.approve(sdogeStaking.address, 100000000000));

  await waitFor(sdogeStaking.stake(deployer.address, 50000000000, true));

  await waitFor(sdogeStaking.stake(deployer.address, 50000000000, false));

  console.log(9);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
