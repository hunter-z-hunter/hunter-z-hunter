import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY;
const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY;
const GOERLY_SCAN_API_KEY = process.env.GOERLY_SCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  networks: {
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${TESTNET_PRIVATE_KEY}`],
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${TESTNET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: `${POLYGON_SCAN_API_KEY}`,
      goerli: `${GOERLY_SCAN_API_KEY}`,
    },
  },
};

export default config;
