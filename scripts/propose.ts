import {
    NEW_STORE_VALUE, 
    FUNC, 
    PROPOSAL_DESCRIPTION, 
    developmentChains, 
    VOTING_DELAY 
} from "../helper-hardhat-config";
// @ts-ignore
import { ethers, network } from "hardhat";
import { moveBlocks } from "../Utils/move-blocks";


export async function propose(args: any[], functionTocall: string, proposalDescription: string) {
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");
    //encode the function call and the arguments
    const encodedFunctionCall = box.interface.encodeFunctionData(
        functionTocall,
        args
    );
    //to see what the output of the encode function is, spin the localhost network and run this script
    //console.log("encodedFunctionCall: ", encodedFunctionCall);

    //propose the transaction (same as create function in COMPOUND governance)
    console.log(`Proposing ${functionTocall} on ${box.address} with ${args}`);
    console.log(`Proposal Description: \n ${proposalDescription}`);
    const proposeTx = await governor.propose(
        [box.address], //targets
        [0], //values
        [encodedFunctionCall], //calldatas
        proposalDescription
    );
    proposeTx.wait(1);

    //move blocks forward to trigger the voting period if in local network
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1);
    }
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
.then(()=> process.exit(0)) 
.catch((error)=> {
    console.error(error);
    process.exit(1);
});