import {
    NEW_STORE_VALUE, 
    FUNC, 
    PROPOSAL_DESCRIPTION, 
    developmentChains, 
    VOTING_DELAY ,
    proposalFile
} from "../helper-hardhat-config";
// @ts-ignore
import { ethers, network } from "hardhat";
import { moveBlocks } from "../Utils/move-blocks";
import * as fs from "fs";


export async function propose(args: any[], functionTocall: string, proposalDescription: string) {
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");
    //encode the function call and the arg uments
    const encodedFunctionCall = box.interface.encodeFunctionData(
        functionTocall,
        args
    );
    //to see what the output of the encode function is, spin the localhost network and run this script
    //console.log("encodedFunctionCall: ", encodedFunctionCall);

    //propose the transaction (same as create function in COMPOUND governance)
    console.log(`Proposing ${functionTocall} on ${box.address} with ${args}, a new feature`);
    console.log(`Proposal Description: \n ${proposalDescription}`);
    const proposeTx = await governor.propose(
        [box.address], //targets
        [0], //values
        [encodedFunctionCall], //calldatas
        proposalDescription
    );
    const proposeReceipt = await proposeTx.wait(1);

    //move blocks forward to trigger the voting period if in local network
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1);
    }
    const proposalId = proposeReceipt.events[0].args.proposalId;
    let proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"));
    proposals[network.config.chainId!.toString()].push(proposalId.toString());
    fs.writeFileSync(proposalFile, JSON.stringify(proposals));
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
.then(()=> process.exit(0)) 
.catch((error)=> {
    console.error(error);
    process.exit(1);
});