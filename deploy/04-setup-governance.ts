import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from "../helper-hardhat-config";



    const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
        // @ts-ignore
        const { deployments, getNamedAccounts } = hre;
        const { deploy, log, get } = deployments;
        const { deployer } =  await getNamedAccounts();
        const timeLock = await ethers.getContract("TimeLock", deployer);
        const governorContract = await ethers.getContract("GovernorContract", deployer);

        log("Setting up roles....")

        //abyte32 hashes is use to identify each users and their roles
        const propooserRole = await timeLock.PROPOSER_ROLE();
        const executorRole = await timeLock.EXECUTOR_ROLE();
        const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

        // Grant roles to governor contract and only governor contract can propose
        const propooserTx = await timeLock.grantRole(propooserRole, governorContract.address);
        await propooserTx.wait(1);

        //nobody should be able to execute
        const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
        await executorTx.wait(1);

        //revoke admin role from deployer
        const revokeTx = await timeLock.revokeRole(adminRole, deployer);
        await revokeTx.wait(1);

    };

    export default setupContracts;