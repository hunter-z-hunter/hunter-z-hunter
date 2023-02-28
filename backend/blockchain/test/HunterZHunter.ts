import {expect} from "chai";
import {ethers} from "hardhat";
import {HunterZHunter} from "../typechain-types";

describe("HunterZHunter", async () => {

    describe("Deployment", async () => {
        it("Should set the right constructor params", async function () {
            // given
            const [owner] = await ethers.getSigners();
            const verifier = ethers.Wallet.createRandom().address;
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy(verifier);

            // then
            expect(await hunterZHunterContract.owner()).to.equal(owner.address);
            expect(await hunterZHunterContract.verifier()).to.equal(verifier);
        });
    });
    describe("Hunt creation", async () => {
        it("Should add a new hunt", async () => {
            // given
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy(ethers.Wallet.createRandom().address) as HunterZHunter;

            const huntId = "game id";
            const name = "game name";
            const prize = ethers.utils.parseEther("2.5");
            const endTime = 123456;
            const target = ethers.utils.formatBytes32String("some target");

            // when
            const transaction = await hunterZHunterContract.addHunt(huntId, name, prize, endTime, target);

            // then
            const receipt = await transaction.wait();
            const emittedHuntAddedParams = receipt.events?.filter((x) => {
                 return x.event == "HuntAdded"
             })[0].args;
            expect(emittedHuntAddedParams?.[0]).to.be.equal(huntId);
            expect(emittedHuntAddedParams?.[1]).to.be.equal(name);
            expect(emittedHuntAddedParams?.[2]).to.be.equal(prize);
            expect(emittedHuntAddedParams?.[3]).to.be.equal(endTime);
            expect(emittedHuntAddedParams?.[4]).to.be.equal(target);
        })
    })
});
