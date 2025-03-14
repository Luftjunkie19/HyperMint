export const factoryContractAddr: `0x${string}` = "0xC34bBC7637c0D44280859b82dd9a7664382c83d2";  

export const factoryAbi = [
    {"type":"function","name":"createCollection","inputs":[{"name":"name","type":"string","internalType":"string"},
        { "name": "symbol", "type": "string", "internalType": "string" },
        {
            "name": "token", "type": "tuple", "internalType": "struct NFTFactory.Token", "components": [
            { "name": "tokenName", "type": "string", "internalType": "string" },
            {"name":"tokenURI","type":"string","internalType":"string"},
            {"name":"tokenImageURI","type":"string","internalType":"string"},
            {"name":"description","type":"string","internalType":"string"}]},
            {"name":"traitsTypes","type":"string[5]","internalType":"string[5]"},
            {"name":"values","type":"string[5]","internalType":"string[5]"}],"outputs":[],"stateMutability":"nonpayable"},
            {"type":"function","name":"getUsersCollections","inputs":[],
                "outputs":[{"name":"","type":"address[]","internalType":"address[]"}],
                "stateMutability":"view"},{"type":"event","name":"CollectionCreated",
                "inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},
                    {"name":"name","type":"string","indexed":false,"internalType":"string"},
                    {"name":"symbol","type":"string","indexed":false,"internalType":"string"},
                    {"name":"collectionAddress","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},

{"type":"error","name":"NFTFactory_EmptyNameOrSymbol","inputs":[]}]