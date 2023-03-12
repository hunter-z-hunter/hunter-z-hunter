import { ethers } from "hardhat";

async function main() {
  const HzhContract = await ethers.getContractFactory("HunterZHunter");
  const contract = await HzhContract.deploy("0x3092452ca62368679459c241a3efa1d2cee0d543");

  await contract.deployed();

  console.log("HunterZHunter Contract deployed to:", contract.address);

  // const TestBundlerContract = await ethers.getContractFactory("TestBundler");
  // const contract = await TestBundlerContract.deploy("0x3092452ca62368679459c241a3efa1d2cee0d543");

  // await contract.deployed();

  // console.log("TestBundler Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
