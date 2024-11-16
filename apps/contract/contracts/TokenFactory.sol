// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";

contract TokenFactory {
    struct memeToken {
        string name;
        string symbol;
        string description;
        string tokenImageUrl;
        uint fundingRaised;
        address tokenAddress;
        address creatorAddress;
    }

    address[] public memeTokenAddresses;
    mapping(address => memeToken) public addressToMemeTokenMapping;

    function createMemeToken(string memory name, string memory symbol, string memory imageUrl, string memory description) public payable returns(address) {
        //should deploy the meme token, mint the initial supply to the token factory contract
        Token ct = new Token(name, symbol, 1000000);
        address memeTokenAddress = address(ct);
        memeToken memory newlyCreatedToken = memeToken(name, symbol, description, imageUrl, 0, memeTokenAddress, msg.sender);
        memeTokenAddresses.push(memeTokenAddress);
        addressToMemeTokenMapping[memeTokenAddress] = newlyCreatedToken;
        return memeTokenAddress;
    }
}