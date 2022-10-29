import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore // this is a workaround for a bug in the typescript compiler
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
    ) {
        //@ts-ignore
        const {getNamedAccounts, deployments} = hre;
        const { deploy, log } = deployments;
        const { deployer } = await getNamedAccounts();
        log("Deploying Governance Token...");
        const governanceToken = await deploy("GovernanceToken", {
            from: deployer,
            args: [],
            log: true,
        }); 
        log(`GovernorToken deployed to ${governanceToken.address}`);
        await delegate(governanceToken.address, deployer);
        log(`Delegated ${deployer} to ${governanceToken.address}`);
         
    };

    //function to delegate governance token to a deployer so they have the ability to vote ~ Hey, take my vote, you can use my vote~
    const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
        // get a deployed instance of the governance token
        const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress); 
        const tx = await governanceToken.delegate(delegatedAccount);
        await tx.wait(1); //wait for transaction to be mined by 1 block
        console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`); // if this returns 0, that means the delegate function did not work and you havent delegated your vote
    }
    

    export default deployGovernanceToken;