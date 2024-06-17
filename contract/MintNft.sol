// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintNft is ERC721Enumerable, Ownable{
    uint lastMintTime;
    uint mintTimeInterval=300;
    string metaDataUri;

    constructor(string memory _name, string memory _symbol, string memory _metaDataUri) ERC721(_name,_symbol) Ownable(msg.sender) {
        metaDataUri = _metaDataUri;
    }

    function mintNft() public {
        //발행 후 5분 후에 가능하도록
        require(block.timestamp >= lastMintTime + mintTimeInterval, "Minting not allowed yet. Please wait for 5 minutes.");

        uint tokenId = totalSupply()+1;

        _mint(msg.sender, tokenId);
        lastMintTime=block.timestamp;
    }

    // function tokenURI(string memory _tokenId) public override returns (string memory) {
    //     return abi.encodePacked(arg);
    // }
}