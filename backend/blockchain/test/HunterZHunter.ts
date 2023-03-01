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
        it("Should fail adding a new hunt if a hunt with provided id already added", async () => {
            // given
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy(ethers.Wallet.createRandom().address) as HunterZHunter;

            const huntId = "game id";
            const name1 = "game name";
            const name2 = "another game name";
            const description1 = "game description";
            const description2 = "another game description";
            const prize = ethers.utils.parseEther("2.5");
            const endTime1 = 123456;
            const endTime2 = 543211;
            const imageReference1 = "some imageReference";
            const imageReference2 = "another imageReference";
            const target1 = "some target";
            const target2 = "another target";
            await hunterZHunterContract.addHunt(huntId, name1, description1, endTime1, imageReference1, target1, {value: prize});

            // then
            await expect(hunterZHunterContract.addHunt(huntId, name2, description2, endTime2, imageReference2, target2, {value: prize}))
                 .revertedWith("hunt with provided id already exists");
        })
        it("Should fail adding a new hunt if prize is 0", async () => {
            // given
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy(ethers.Wallet.createRandom().address) as HunterZHunter;

            const huntId = "game id";
            const name = "game name";
            const description = "game description";
            const endTime = 123456;
            const imageReference = "some imageReference";
            const target = "some target";

            // then
            await expect(hunterZHunterContract.addHunt(huntId, name, description, endTime, imageReference, target))
                .revertedWith("prize cannot be zero");
        })
        it("Should add a new hunt", async () => {
            // given
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy(ethers.Wallet.createRandom().address) as HunterZHunter;

            const huntId = "game id";
            const name = "game name";
            const description = "game description";
            const prize = ethers.utils.parseEther("2.5");
            const endTime = 123456;
            const imageReference = "some imageReference";
            const target = "some target";

            // when
            const transaction = await hunterZHunterContract.addHunt(huntId, name, description, endTime, imageReference, target, {value: prize});

            // then
            const receipt = await transaction.wait();
            const emittedHuntAddedParams = receipt.events?.filter((x) => {
                 return x.event == "HuntAdded"
             })[0].args;
            expect(emittedHuntAddedParams?.[0]).to.be.equal(huntId);
            expect(emittedHuntAddedParams?.[1]).to.be.equal(name);
            expect(emittedHuntAddedParams?.[2]).to.be.equal(description);
            expect(emittedHuntAddedParams?.[3]).to.be.equal(prize);
            expect(emittedHuntAddedParams?.[4]).to.be.equal(endTime);
            expect(emittedHuntAddedParams?.[5]).to.be.equal(imageReference);
            expect(emittedHuntAddedParams?.[6]).to.be.equal(target);
        })
    })
    describe("Verification of the guess", async () => {
        it("Should successfully verify and award the prize", async () => {
            // given
            const contract = await ethers.getContractFactory("HunterZHunter");
            const hunterZHunterContract = await contract.deploy(ethers.Wallet.createRandom().address) as HunterZHunter;

            const account = (await ethers.getSigners())[0];
            const huntId = "game id";
            const prize = ethers.utils.parseEther("2.5");
            hunterZHunterContract.addHunt(huntId, "game name", "game description", 123456, "some imageReference", "some target",{value: prize})

            // when
            const transaction = await hunterZHunterContract.verifyAndAwardPrize(huntId, account.address, ethers.utils.formatBytes32String("some proof"));

            // then
            const receipt = await transaction.wait();
            const emittedPrizeWonParams = receipt.events?.filter((x) => {
                return x.event == "PrizeWon"
            })[0].args;
            expect(emittedPrizeWonParams?.[0]).to.be.equal(huntId);
            expect(emittedPrizeWonParams?.[1]).to.be.equal(account.address);
            expect(emittedPrizeWonParams?.[2]).to.be.equal(prize);

            await expect(transaction).to.changeEtherBalance(account.address, ethers.utils.parseEther("2.5"));
        })
        // TODO write a test once verifier is ready
        /* it("Should fail if proof not verified", async () => {

        }) */
    })
});
