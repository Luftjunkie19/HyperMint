export const abi = [

  {
    name: 'mintNFT',
    type: 'function',
    stateMutability: 'nonpayable',
        inputs: [
        { internalType: 'string', name: '_tokenURI', type: 'string' },
            { internalType: 'uint256', name: 'collectionId', type: 'uint256' },
            { internalType: 'memory string[5]', name: 'keys', type: 'string[5]' },
         { internalType: 'memory string[5]', name: 'values', type: 'string[5]' },
    ],
    outputs: [],
  },
  {"type":"function","name":"getUsersToken",
    "inputs":[{"name":"user","type":"address","internalType":"address"}],
    "outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],
  "stateMutability":"view"},
  {"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"}
] as const