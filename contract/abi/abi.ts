// export const abi = [

//   {
//     "type": "function",
//     "name": "mintNFT",
//   "inputs":[

//   {"name":"_tokenURI","type":"string","internalType":"string"},
  
//   {"name":"_tokenImageURI","type":"string","internalType":"string"},
  
//   {"name":"description","type":"string","internalType":"string"},
  
//   {"name":"collectionId","type":"uint256","internalType":"uint256"},
  
//   {"name":"keys","type":"string[5]","internalType":"string[5]"},
  
//   {"name":"values","type":"string[5]","internalType":"string[5]"}
// ],
//  "outputs":[],"stateMutability":"nonpayable"
// },

// {"type":"function","name":"getUsersTokensStructs","inputs":[{"name":"_user","type":"address","internalType":"address"}],
// "outputs":[{"name":"","type":"tuple[]","internalType":"struct DynamicNFT.DynamicToken[]",
//   "components":[{"name":"owner","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},
//     {"name":"tokenURI","type":"string","internalType":"string"},{"name":"imageURI","type":"string","internalType":"string"},
//     {"name":"description","type":"string","internalType":"string"},
//     {"name":"attributes","type":"tuple[]","internalType":"struct DynamicNFT.Attribute[]",
//         "components": [{ "name": "trait_type", "type": "string", "internalType": "string" },
//         { "name": "value", "type": "string", "internalType": "string" }]
//       }]
//   }],
// "stateMutability":"view"},

// ] as const


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