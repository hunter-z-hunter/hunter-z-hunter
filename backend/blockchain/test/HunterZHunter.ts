import {expect} from "chai";
import {ethers} from "hardhat";
import {HunterZHunter} from "../typechain-types";

describe("HunterZHunter", async () => {

    describe("Deployment", async () => {
        it("Should set the right owner", async function () {
            // given
            const [owner] = await ethers.getSigners();
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy();

            // then
            expect(await hunterZHunterContract.owner()).to.equal(owner.address);
        });
    });
    describe("Hunt creation", async () => {
        it("Should add a new hunt", async () => {
            // given
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy() as HunterZHunter;

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
