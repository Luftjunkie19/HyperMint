import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, zksyncSepoliaTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [ sepolia, zksyncSepoliaTestnet],
  transports: {
    [sepolia.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
  },
})