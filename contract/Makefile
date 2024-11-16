# Makefile for deploying and verifying Solidity contracts

# Variables
FORGE_CMD = forge
CONTRACT_PATH = ./contracts/MyContract.sol
ETH_NETWORK = mainnet
LINEA_NETWORK = linea

# Default target
.PHONY: all
all: base eth linea

# Base deployment
.PHONY: base
base:
    @echo "Deploying base contract..."
    $(FORGE_CMD) create $(CONTRACT_PATH)

# Deploy to Ethereum mainnet
.PHONY: eth
eth:
    @echo "Deploying to Ethereum mainnet..."
    $(FORGE_CMD) create $(CONTRACT_PATH) --rpc-url https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID

# Deploy to Linea network
.PHONY: linea
linea:
    @echo "Deploying to Linea network..."
    $(FORGE_CMD) create $(CONTRACT_PATH) --rpc-url https://linea.network/rpc

# Verify contract on Etherscan
.PHONY: verify
verify:
    @echo "Verifying contract on Etherscan..."
    $(FORGE_CMD) verify-contract $(CONTRACT_PATH) --network $(ETH_NETWORK)

# Clean up
.PHONY: clean
clean:
    @echo "Cleaning up..."
    rm -rf out