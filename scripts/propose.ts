import { ethers } from "hardhat";

export async function propose() {
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");
    // working on it..
}