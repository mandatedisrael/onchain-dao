import { network } from "hardhat";

//function to move blocks forward in local network
export async function moveBlocks(amount: number){
    console.log("Moving Blocks")
    for(let i = 0; i < amount; i++){
        await network.provider.request(
            {
                method: "evm_mine",
                params: [],
            }
        )
    }
}