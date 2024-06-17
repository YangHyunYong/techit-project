// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintNft is ERC721Enumerable, Ownable {
    uint lastMintTime;
    uint mintTimeInterval = 300;

    mapping(uint => string) metadataUri;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function mintNft() public {
        //발행 후 5분 후에 가능하도록
        require(
            block.timestamp >= lastMintTime + mintTimeInterval,
            "Minting not allowed yet. Please wait for 5 minutes."
        );

        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        lastMintTime = block.timestamp;

        metadataUri[tokenId] = _metadataUri;
    }

    function tokenURI(
        uint _tokenId
    ) public view override returns (string memory) {
        return metadataUri[_tokenId];
    }
}
