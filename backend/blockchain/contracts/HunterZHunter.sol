// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

contract HunterZHunter {

    struct Hunt {
        string huntId;
        string name;
        uint prize;
        uint endTime;
        bytes32 target;
    }

    address payable public owner;
    mapping (string => Hunt) hunts;

    event HuntAdded(string huntId, string name, uint prize, uint endTime, bytes32 target);
    event PrizeWon(string huntId, address winner, uint prize);

    constructor() {
        owner = payable(msg.sender);
    }

    function addHunt(string memory huntId, string memory name, uint prize, uint endTime, bytes32 target) public {
        Hunt storage newHunt = hunts[huntId];
        newHunt.huntId = huntId;
        newHunt.name = name;
        newHunt.prize = prize;
        newHunt.endTime = endTime;
        newHunt.target = target;
        emit HuntAdded(huntId, name, prize, endTime, target);
    }

    function verifyAndAwardPrize(string memory huntId, address winner, bytes memory proof) public {
        // call another contract to do the verification
        bool verified = verifyProof(winner, proof);
        require(verified, "Proof not verified");

        // transfer prize ETH to the winner
        uint prize = hunts[huntId].prize;
        hunts[huntId].prize = 0;
        (bool success, ) = winner.call{value: prize}("");
        require(success, "Transfer failed");

        emit PrizeWon(huntId, winner, prize);
    }

    function verifyProof(address winner, bytes memory proof) private returns (bool) {
        // call another contract to do the verification
        Verifier verifier = new Verifier(0x000000); // insert address of Verifier contract
        verifier.verify(winner, proof);
        // implementation omitted
        return verifier ? true : false;
    }
}
