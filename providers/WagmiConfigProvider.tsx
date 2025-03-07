'use client';

import { config } from '@/lib/wagmiClient'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { WagmiProvider } from 'wagmi'

type Props = {children:React.ReactNode}


const queryClient=new QueryClient()
function WagmiConfigProvider({children}: Props) {
  return (
       <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
              {children}
</QueryClientProvider>
       </WagmiProvider>
  )
}

export default WagmiConfigProvider