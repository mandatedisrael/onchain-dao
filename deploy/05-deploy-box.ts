import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    //@ts-ignore
    const { deployments, getNamedAccounts } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying Box...");

    //box deployment is done here but no contract
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    });


    //getcontract and getcontractAt(if you have the address) are used to get the contract
    const timeLock = await ethers.getContract("TimeLock");
    //get box contract
    const boxContract = await ethers.getContractAt("Box", box.address);
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address); 
    await transferOwnerTx.wait(1);
    log("Box ownership transferred to TimeLock!");
};

export default deployBox;

