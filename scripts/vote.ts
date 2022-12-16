import { developmentChains, proposalFile, VOTING_PERIOD } from "../helper-hardhat-config";
import * as fs from "fs";   
// @ts-ignore
import { network, ethers } from "hardhat";
import { moveBlocks } from "../Utils/move-blocks";

const index = 0;

async function main (proposalIndex:number) {
    const proposals = JSON.parse(fs.readFileSync(proposalFile, "utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    // 0 = against, 1 = for, 2 = abstain
    const voteWay = 1;

    const governor =  await ethers.getContract("GovernorContract");
    const reason = "I am voting for this proposal because it will bring a massive change to the world";
    const voteTxResponse = await governor.castVoteWithReason(
        proposalId, 
        voteWay, 
        reason
        );
        await voteTxResponse.wait(1);
        if (developmentChains.includes(network.name)) {
            await moveBlocks(VOTING_PERIOD +1);
        }
}

main(index)
.then(()=> process.exit(0))
.catch((error)=> {
    console.error(error);
    process.exit(1);
});