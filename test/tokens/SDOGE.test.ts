import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { ethers } from "hardhat";
import {SDOGE, SDOGE__factory} from "../../types";

describe("SDOGETest", () => {
  let deployer: SignerWithAddress;
  let reservoir: SignerWithAddress;
  let bob: SignerWithAddress;
  let alice: SignerWithAddress;
  let sdoge: SDOGE;

  beforeEach(async () => {
    [deployer, reservoir, bob, alice] = await ethers.getSigners();

    sdoge = await (new SDOGE__factory(deployer)).deploy();

    await sdoge.deployed();

    await sdoge.setMinter(reservoir.address);
  });

  it("correctly constructs an ERC20", async () => {
    expect(await sdoge.name()).to.equal("ScholarDoge");
    expect(await sdoge.symbol()).to.equal("SDOGE");
    expect(await sdoge.decimals()).to.equal(9);
  });

  describe("mint", () => {
    it("fails if done by anon", async () => {
      await expect(sdoge.connect(deployer).mint(bob.address, 100)).
        to.be.revertedWith("UNAUTHORIZED");
    });

    it("increase supply if done by reservoir", async () => {
      const supplyBefore = await sdoge.totalSupply();

      await sdoge.connect(reservoir).mint(bob.address, 100);

      expect(supplyBefore.add(100)).to.equal(await sdoge.totalSupply());
    });
  });

  describe("burn", () => {
    beforeEach(async () => {
      await sdoge.connect(reservoir).mint(bob.address, 100);
    });

    it("reduces the total supply", async () => {
      const supplyBefore = await sdoge.totalSupply();

      await sdoge.connect(bob).burn(10);

      expect(supplyBefore.sub(10)).to.equal(await sdoge.totalSupply());
    });

    it("cannot exceed bob's balance", async () => {
      await sdoge.connect(reservoir).mint(alice.address, 15);

      await expect(sdoge.connect(alice).burn(16)).
        to.be.revertedWith("ERC20: burn amount exceeds balance");
    });
  });
});
