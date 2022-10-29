import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import { HardhatUserConfig } from "hardhat/config"
/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId:31337,
      allowUnlimitedContractSize: true
    },
    localhost: {
      chainId:31337,
      allowUnlimitedContractSize: true
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
}

export default config;