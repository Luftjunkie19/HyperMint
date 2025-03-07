import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, zksyncSepoliaTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, zksyncSepoliaTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
  },
})