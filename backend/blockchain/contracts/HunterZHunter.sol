// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

contract HunterZHunter {

    struct Hunt {
        string huntId;
        string name;
        string description;
        uint prize;
        uint endTime;
        string imageReference;
        string target;
    }

    address payable public owner;
    address public verifier;
    mapping (string => Hunt) hunts;
    mapping (string => bool) huntsSaved;

    event HuntAdded(string huntId, string name, string description, uint prize, uint endTime, string imageReference, string target);
    event PrizeWon(string huntId, address winner, uint prize);

    constructor(address _verifier) {
        owner = payable(msg.sender);
        verifier = _verifier;
    }

    function addHunt(string memory huntId, string memory name, string memory description, uint endTime, string memory imageReference, string memory target) public payable {
        require(!huntsSaved[huntId], "hunt with provided id already exists");
        require(msg.value > 0, "prize cannot be zero");

        Hunt storage newHunt = hunts[huntId];
        newHunt.huntId = huntId;
        newHunt.name = name;
        newHunt.description = description;
        newHunt.prize = msg.value;
        newHunt.endTime = endTime;
        newHunt.imageReference = imageReference;
        newHunt.target = target;

        huntsSaved[huntId] = true;
        emit HuntAdded(huntId, name, description, msg.value, endTime, imageReference, target);
    }

    function verifyAndAwardPrize(string memory huntId, address winner, bytes memory proof) public {
        // call another contract to do the verification
        bool verified = verifyProof(winner, proof);
        require(verified, "Proof not verified");

        // transfer prize ETH to the winner
        uint prize = hunts[huntId].prize;
        hunts[huntId].prize = 0;
        payable(winner).transfer(prize);

        emit PrizeWon(huntId, winner, prize);
    }

    function verifyProof(address winner, bytes memory proof) private returns (bool) {
        // call another contract to do the verification
//        Verifier verifier = new Verifier(0x000000); // insert address of Verifier contract
//        verifier.verify(winner, proof);
//        // implementation omitted
//        return verifier ? true : false;
        return true;
    }
}
