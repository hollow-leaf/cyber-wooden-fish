import { HardhatUserConfig } from "hardhat/config"
import { NetworkUserConfig } from "hardhat/types"
// hardhat plugin
import "@nomiclabs/hardhat-ethers"
import "@nomicfoundation/hardhat-toolbox"

import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
import { loadTasks } from "./scripts/helpers/hardhatConfigHelpers"

dotenvConfig({ path: resolve(__dirname, "./.env") })

const taskFolder = ["tasks"]
loadTasks(taskFolder)

const chainIds = {
  ganache: 1337,
  goerli: 5,
  sepolia: 11155111,
  hardhat: 31337,
  mainnet: 1,
  flowTestnet: 545,
  lineaSepolia: 59141,
  scrollSepolia: 534351,
  neroTestnet: 6660001,
  avaxFuji: 43113,
}

// Ensure that we have all the environment variables we need.
const pk: string | undefined = process.env.PRIVATE_KEY
if (!pk) {
  throw new Error("Please set your pk in a .env file")
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY
if (!infuraApiKey) {
  throw new Error("Please set your INFURA_API_KEY in a .env file")
}

function getChainConfig (chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string
  switch (chain) {
    case "sepolia":
      jsonRpcUrl = "https://rpc.sepolia.org"
      break
    case "lineaSepolia":
      jsonRpcUrl = "https://rpc.sepolia.linea.build"
      break
    case "scrollSepolia":
      jsonRpcUrl = "https://sepolia-rpc.scroll.io"
      break
    case "neroTestnet":
      jsonRpcUrl = "https://testnet.nerochain.io"
      break
    case 'flowTestnet':
      jsonRpcUrl = "https://testnet.evm.nodes.onflow.org"
      break
    case 'avaxFuji':
      jsonRpcUrl = "https://api.avax-test.network/ext/bc/C/rpc"
      break
    default:
      jsonRpcUrl = `https://${chain}.infura.io/v3/${infuraApiKey}`
  }
  return {
    accounts: [`0x${pk}`],
    chainId: chainIds[chain],
    url: jsonRpcUrl,
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
    local: {
      url: "http://127.0.0.1:8545",
    },
    goerli: getChainConfig("goerli"),
    sepolia: getChainConfig("sepolia"),
    mainnet: getChainConfig("mainnet"),
    lineaSepolia: getChainConfig("lineaSepolia"),
    scrollSepolia: getChainConfig("scrollSepolia"),
    flowTestnet: getChainConfig("flowTestnet"),
    neroTestnet: getChainConfig("neroTestnet"),
    avaxFuji: getChainConfig("avaxFuji"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
    ],
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yulDetails: false,
        },
      },
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      cardona: process.env.POLYGONSCAN_API_KEY || "",
      mantleSepolia: "NO_API_KEY",
      baseSepolia: process.env.BASESCAN_API_KEY || "",
      flowTestnet: "NO_API_KEY",
      opAvail: "NO_API_KEY",
      lineaSepolia: process.env.LINEASCAN_API_KEY || "",
      scrollSepolia: process.env.SCROLLSCAN_API_KEY || "",
      avaxFuji: "NO_API_KEY",
      neroTestnet: "NO_API_KEY",
    },
    customChains: [
      {
        network: "avaxFuji",
        chainId: 43113,
        urls: {
          apiURL: "https://api.avascan.info/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://avascan.info/"
        },
      },
      {
        network: "lineaSepolia",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/"
        }
      },
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/"
        }
      },
      {
        network: "neroTestnet",
        chainId: 6660001,
        urls: {
          apiURL: "https://testnetscan.nerochain.io/api",
          browserURL: "https://testnetscan.nerochain.io/"
        }
      },
      {
        network: "flowTestnet",
        chainId: 545,
        urls: {
          apiURL: "https://evm-testnet.flowscan.io/api",
          browserURL: "https://evm-testnet.flowscan.io/"
        }
      },
    ]
  },

  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS as string === "true",
    excludeContracts: [],
    src: "./contracts",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
}

export default config