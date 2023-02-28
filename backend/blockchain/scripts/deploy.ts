import { ethers } from "hardhat";

async function main() {
  const HzhContract = await ethers.getContractFactory("HunterZHunter");
  const contract = await HzhContract.deploy("0x0000000000000000000000000000000000000000");

  await contract.deployed();

  console.log("HunterZHunter Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
