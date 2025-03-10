import { http, createConfig } from 'wagmi'
import { sepolia, zksyncSepoliaTestnet, holesky } from 'wagmi/chains'

export const config = createConfig({
  chains: [ sepolia, zksyncSepoliaTestnet, holesky],
  transports: {
    [holesky.id]: http(),
    [sepolia.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
  },
})