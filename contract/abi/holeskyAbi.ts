
export const holeskyContractHash:string= "0x4555012BbD09933BE0Db4827f6a3c1F2eEcC09F0";

export const holeskyAbi = [
    {
        "type": "function", "name": "mintNFT", 
        "inputs": [{ "name": "_tokenURI", "type": "string", "internalType": "string" }, 
            { "name": "_tokenImageURI", "type": "string", "internalType": "string" }, 
            { "name": "description", "type": "string", "internalType": "string" },
            { "name": "keys", "type": "string[5]", "internalType": "string[5]" }, 
            { "name": "values", "type": "string[5]", "internalType": "string[5]" }],
        "outputs": [], "stateMutability": "nonpayable"
    },

    {
        "type": "function", "name": "getOwnersTokensAll",
        "inputs":[{"name":"user","type":"address","internalType":"address"}],
        "outputs":[{"name":"","type":"tuple[]","internalType":"struct DynamicNFT.Token[]",
            "components":[{"name":"tokenId","type":"uint256","internalType":"uint256"},
                {"name":"tokenURI","type":"string","internalType":"string"},
                {"name":"tokenImageURI","type":"string","internalType":"string"},
                {"name":"description","type":"string","internalType":"string"},{
                "name":"attributes","type":"tuple[]","internalType":"struct DynamicNFT.Attribute[]",
                "components":[
                        {"name":"trait_type","type":"string","internalType":"string"},
                        {"name":"value","type":"string","internalType":"string"}]}]}],
        "stateMutability": "view"
    },
                       
    {
        "type": "function", "name": "tokenURI",
        "inputs": [{ "name": "tokenId", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    }
] as const