// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol, uint initialMintValue) ERC20(name, symbol) {
        _mint(msg.sender, initialMintValue);
        owner = msg.sender;
    }

    function mint(uint mintQty, address receiver) external returns(uint){
        _mint(receiver, mintQty);
        return 1;
    }
}