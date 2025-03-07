import { abi } from '@/contract/abi/abi';
import Image from 'next/image';
import React from 'react'
import { useReadContract } from 'wagmi';

type Props = {
    index: bigint
}

function NFTMinted({index}: Props) {
      const {data:tokenURIData}= useReadContract({
        abi:abi,
        address: '0xa8B8373F690dcAe0aed18c5Fc38fe97D908eA6C0',
        functionName: 'tokenURI',
        args: [index],
      });

   
  return (
    <div>
        
<Image src={tokenURIData} width={200} height={200} alt="" className="w-64 h-48  rounded-lg"/>
    </div>
  )
}

export default NFTMinted