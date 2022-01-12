import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  hardhat: { id: 31337, rpc: "" },
  bsc_mainnet: { id: 56, rpc: "https://bsc-dataseed.binance.org/" },
  bsc_testnet: { id: 97, rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
  ftm_mainnet: { id: 250, rpc: "https://rpc.ftm.tools/" },
  ftm_testnet: { id: 4002, rpc: "https://rpc.testnet.fantom.network/" },
};

// Ensure that we have all the environment variables we need.
const privateKey: string | undefined = process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";


function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  return {
    accounts: [`${privateKey}`],
    chainId: chainIds[network].id,
    url: chainIds[network].rpc,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: !!process.env.REPORT_GAS,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
    },
    bsc_mainnet: getChainConfig("bsc_mainnet"),
    bsc_testnet: getChainConfig("bsc_testnet"),
    ftm_mainnet: getChainConfig("ftm_mainnet"),
    ftm_testnet: getChainConfig("ftm_testnet"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },
  solidity: {
    compilers: [
      {
        version: "0.7.5",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
      },
      {
        version: "0.5.0",
      }
    ],
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY,
  },
};

export default config;
