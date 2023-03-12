// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

contract TestBundler {

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
        // require(!huntsSaved[huntId], "hunt with provided id already exists");
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

    // Test 1
    event TestBundler1Event(string testParam);
    function testBundler1(string memory testParam) public {
        emit TestBundler1Event(testParam);
    }    

    // Test 2
    event TestVerifyAndAwardPrizeEvent(string testParam);
    function verifyAndAwardPrize(string memory testParam) public {

        emit TestVerifyAndAwardPrizeEvent(testParam);
    }

    // Test 3
    event TestVerifyAndAwardPrizeEvent1(string testParam, address winner);
    function verifyAndAwardPrize1(string memory huntId, address winner) public {
        
        emit TestVerifyAndAwardPrizeEvent1(huntId, winner);
    }

    // Test 4
    event TestVerifyAndAwardPrizeEvent2(string testParam, address winner, bytes proof);
    function verifyAndAwardPrize2(string memory huntId, address winner, bytes memory proof) public {
        
        emit TestVerifyAndAwardPrizeEvent2(huntId, winner, proof);
    }

    // Test 5
    event TestVerifyAndAwardPrizeEvent3(string testParam, address winner, bytes proof);
    function verifyAndAwardPrize3(string memory huntId, address winner, bytes memory proof) public {
        
        // transfer prize ETH to the winner
        uint prize = hunts[huntId].prize;
        hunts[huntId].prize = 0;
        payable(winner).transfer(prize);
        
        emit TestVerifyAndAwardPrizeEvent3(huntId, winner, proof);
    }

    function verifyProof(address winner, bytes memory callData) private returns (bool success, bytes memory result) {
        
        // Call the other contract with the provided address and data
        (bool success, bytes memory returnData) = verifier.staticcall(callData); // abi.decode(callData)

        // Return the result
        return (success, result);
    }

    

}
