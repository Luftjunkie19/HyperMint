'use client';
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';

import {
    darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {


  holesky
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
type Props = {children:React.ReactNode}



function RainbowProvider({children }: Props) {

    const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: process.env.RAINBOW_KIT_PROJECT_ID as string,
  chains: [ holesky],
  ssr: true, // If your dApp uses server side rendering (SSR)
    });
    
    const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} >
{children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default RainbowProvider