pragma solidity ^0.8.0;

contract DummyContract {

    address payable public owner;
    uint public counter;

    event DummyEvent(string someString);
    event CounterUpdatedEvent(uint counter);

    constructor() {
        owner = payable(msg.sender);
    }

    function doSomethingDummy(string memory someString) public returns (uint) {
        counter += 1;
        emit CounterUpdatedEvent(counter);
        emit DummyEvent(someString);
        return counter;
    }
}
