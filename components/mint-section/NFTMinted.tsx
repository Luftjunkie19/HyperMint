'use client';
import React from 'react'
import NFTMintedCard from './NFTMintedCard';
import useNFTData from '@/hooks/useNFTData';


type Props = {
  index: bigint
}

//Recent Contract: 0xE3855DEa7e9E59E7861aD89fDdC2D8C594C2D836

function NFTMinted({ index }: Props) {

  
  const tokenURIProcessed= useNFTData({index});
 


   
  return (
    <NFTMintedCard index={index} tokenURI={tokenURIProcessed}/>
  
  )
}

export default NFTMinted