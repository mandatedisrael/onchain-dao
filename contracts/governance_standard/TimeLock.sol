// SPDX-License-Identifier: MIT
// This contract is goin to be the owner of the box contract
// we want a time delay for a new vote to be executed and give the owner of the box contract the ability to cancel the vote

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController{
    //minDelay: How long to wait before executing
    //proposers: list of addreses that can propose
    //executors: who can execute when a proposal passes
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(minDelay, proposers, executors){}
}