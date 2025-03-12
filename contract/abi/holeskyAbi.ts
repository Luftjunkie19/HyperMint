
export const holeskyContractHash:`0x${string}`= "0x077B3c35b4A0d3BDdA60a08ca058f3e8081DeabF";

export const holeskyAbi = [
   { "type": "constructor", "inputs": [{ "name": "_name", "type": "string", "internalType": "string" }, { "name": "_symbol", "type": "string", "internalType": "string" }, { "name": "_owner", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "_operatorApprovals", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_ownerToTokenStruct", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "tokenName", "type": "string", "internalType": "string" }, { "name": "tokenURI", "type": "string", "internalType": "string" }, { "name": "tokenImageURI", "type": "string", "internalType": "string" }, { "name": "description", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_tokenApprovals", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_tokenAttributes", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "trait_type", "type": "string", "internalType": "string" }, { "name": "value", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_tokenDescriptions", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_tokenImageURIs", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_tokenOwners", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "_tokens", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "tokenName", "type": "string", "internalType": "string" }, { "name": "tokenURI", "type": "string", "internalType": "string" }, { "name": "tokenImageURI", "type": "string", "internalType": "string" }, { "name": "description", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "approve", "inputs": [{ "name": "to", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "balanceOf", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "burn", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "burnToken", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "getApproved", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, { "type": "function", "name": "getContractsOwner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "getOwnersTokensAll", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "tuple[]", "internalType": "struct DynamicNFT.Token[]", "components": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "tokenName", "type": "string", "internalType": "string" }, { "name": "tokenURI", "type": "string", "internalType": "string" }, { "name": "tokenImageURI", "type": "string", "internalType": "string" }, { "name": "description", "type": "string", "internalType": "string" }, { "name": "attributes", "type": "tuple[]", "internalType": "struct DynamicNFT.Attribute[]", "components": [{ "name": "trait_type", "type": "string", "internalType": "string" }, { "name": "value", "type": "string", "internalType": "string" }] }] }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "getTokenImageURI", "inputs": [{ "name": "addr", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "getTokenOwner", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "getUsersTokenInfo", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }, { "name": "", "type": "string", "internalType": "string" }, { "name": "", "type": "string", "internalType": "string" }, { "name": "", "type": "tuple[]", "internalType": "struct DynamicNFT.Attribute[]", "components": [{ "name": "trait_type", "type": "string", "internalType": "string" }, { "name": "value", "type": "string", "internalType": "string" }] }, { "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "getUsersTokens", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256[]", "internalType": "uint256[]" }], "stateMutability": "view" }, { "type": "function", "name": "isApprovedForAll", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }, { "name": "operator", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "mintNFT", "inputs": [{ "name": "_tokenURI", "type": "string", "internalType": "string" }, { "name": "_tokenImageURI", "type": "string", "internalType": "string" }, { "name": "tokenName", "type": "string", "internalType": "string" }, { "name": "description", "type": "string", "internalType": "string" }, { "name": "keys", "type": "string[5]", "internalType": "string[5]" }, { "name": "values", "type": "string[5]", "internalType": "string[5]" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "name", "inputs": [], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "ownerOf", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "ownerTokens", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "ownerTotokenImageURI", "inputs": [{ "name": "", "type": "address", "internalType": "address" }, { "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "safeTransferFrom", "inputs": [{ "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "safeTransferFrom", "inputs": [{ "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "data", "type": "bytes", "internalType": "bytes" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "setApprovalForAll", "inputs": [{ "name": "operator", "type": "address", "internalType": "address" }, { "name": "approved", "type": "bool", "internalType": "bool" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "supportsInterface", "inputs": [{ "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "symbol", "inputs": [], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "tokenURI", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "string", "internalType": "string" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "totalSupply", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, 
   
   { "type": "function", "name": "transferFrom", "inputs": [{ "name": "from", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "transferOwnership", "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable" }, 
   
   { "type": "function", "name": "updateTokenURI", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "updater", "type": "address", "internalType": "address" }, { "name": "newTokenURI", "type": "string", "internalType": "string" }], "outputs": [], "stateMutability": "nonpayable" },
   
   { "type": "event", "name": "Approval", "inputs": [{ "name": "owner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "approved", "type": "address", "indexed": true, "internalType": "address" }, { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false }, 
   
   { "type": "event", "name": "ApprovalForAll", "inputs": [{ "name": "owner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "operator", "type": "address", "indexed": true, "internalType": "address" }, { "name": "approved", "type": "bool", "indexed": false, "internalType": "bool" }], "anonymous": false }, { "type": "event", "name": "BatchMetadataUpdate", "inputs": [{ "name": "_fromTokenId", "type": "uint256", "indexed": false, "internalType": "uint256" }, { "name": "_toTokenId", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, 
   
   { "type": "event", "name": "MetadataUpdate", "inputs": [{ "name": "_tokenId", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false }, { "type": "event", "name": "NFTBurned", "inputs": [{ "name": "minter", "type": "address", "indexed": true, "internalType": "address" }, { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false }, 
   
   { "type": "event", "name": "NFTMinted", "inputs": [{ "name": "minter", "type": "address", "indexed": true, "internalType": "address" }, { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "tokenURI", "type": "string", "indexed": false, "internalType": "string" }], "anonymous": false }, 
   
   { "type": "event", "name": "NFTTransfer", "inputs": [{ "name": "from", "type": "address", "indexed": true, "internalType": "address" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }, { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false }, 
   
   { "type": "event", "name": "NFTUpdated", "inputs": [{ "name": "minter", "type": "address", "indexed": true, "internalType": "address" }, { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "tokenURI", "type": "string", "indexed": false, "internalType": "string" }], "anonymous": false }, 
   
   { "type": "event", "name": "OwnershipTransferred", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false }, 
   
   { "type": "event", "name": "Transfer", "inputs": [{ "name": "from", "type": "address", "indexed": true, "internalType": "address" }, { "name": "to", "type": "address", "indexed": true, "internalType": "address" }, { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false }, 
   
   { "type": "error", "name": "DynamicNFT_NotElligibleToMint", "inputs": [{ "name": "minter", "type": "address", "internalType": "address" }] }, { "type": "error", "name": "DynamicNFT_NotElligibleToUpdate", "inputs": [{ "name": "minter", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }] }, 
   
   { "type": "error", "name": "ERC721IncorrectOwner", "inputs": [{ "name": "sender", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }, { "name": "owner", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "ERC721InsufficientApproval", "inputs": [{ "name": "operator", "type": "address", "internalType": "address" }, { "name": "tokenId", "type": "uint256", "internalType": "uint256" }] }, 
   
   { "type": "error", "name": "ERC721InvalidApprover", "inputs": [{ "name": "approver", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "ERC721InvalidOperator", "inputs": [{ "name": "operator", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "ERC721InvalidOwner", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "ERC721InvalidReceiver", "inputs": [{ "name": "receiver", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "ERC721InvalidSender", "inputs": [{ "name": "sender", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "ERC721NonexistentToken", "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }] }, 
   
   { "type": "error", "name": "NotTokenOwner", "inputs": [{ "name": "tokenOwner", "type": "address", "internalType": "address" }] }, 
   
   { "type": "error", "name": "OwnableInvalidOwner", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }] },
   
   { "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [{ "name": "account", "type": "address", "internalType": "address" }] 
}
] as const