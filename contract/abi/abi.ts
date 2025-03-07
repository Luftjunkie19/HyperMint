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
] as const