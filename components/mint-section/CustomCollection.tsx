import { holeskyAbi } from '@/contract/abi/holeskyAbi'
import React from 'react'
import { useReadContract, useReadContracts } from 'wagmi'
import NFTMintedCard from './NFTMintedCard'

type Props = {
    contractAddr:`0x${string}`,
    senderAddress:`0x${string}`
}

function CustomCollection({contractAddr, senderAddress}: Props) {

    const { data } = useReadContract({
        address: contractAddr,
        abi: holeskyAbi,
        functionName: 'getOwnersTokensAll',
        account:senderAddress,
        'args':[senderAddress]
    });

const results = useReadContracts({contracts:[

    {
        address: contractAddr,
        abi: holeskyAbi,
        functionName:'name',
        args:[],
    }
    {
        address: contractAddr,
        abi: holeskyAbi,
        functionName:'symbol',
        args:[],
    },
  
]})


  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4 flex-wrap">
      {
            results.data && results.data.map((item,index)=>(<p className={`${index === 0 ? "font-bold text-2xl" : "text-lg"}`} key={index}>
                {index === 0 ? 'Collection Name: ' : ""}
                {item.result}</p>))
        }
      </div>

{data && data.map((item,index)=>(<NFTMintedCard item={item} contractAddress={contractAddr} key={index}/>))}
    </div>
  )
}

export default CustomCollection