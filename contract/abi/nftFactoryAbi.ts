export const factoryContractAddr: `0x${string}` = "0xaDdca54C2465D55a835b9963c9d18D0A42d7f1D9";  

export const factoryAbi = [{
    "type": "function", "name": "createCollection", "inputs": [{ "name": "name", "type": "string", "internalType": "string" },
    
        { "name": "symbol", "type": "string", "internalType": "string" }], "outputs": [], "stateMutability": "nonpayable"
}, {
    "type": "event", "name": "CollectionCreated", "inputs": [{ "name": "owner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "name", "type": "string", "indexed": false, "internalType": "string" }, { "name": "symbol", "type": "string", "indexed": false, "internalType": "string" }, { "name": "collectionAddress", "type": "address", "indexed": true, "internalType": "address" }],
    "anonymous": false
}]