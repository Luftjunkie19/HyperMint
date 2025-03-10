import React from 'react'

import { BackgroundGradient } from '../ui/background-gradient';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { useReadContract } from 'wagmi';
import { holeskyContractHash, holeskyAbi} from '@/contract/abi/holeskyAbi';
type Props = {item: {
    tokenId: bigint;
    tokenURI: string;
    tokenImageURI: string;
    description: string;
    attributes: readonly {
        trait_type: string;
        value: string;
    }[];
} }

function NFTMintedCard({ item }: Props) {
  
  const {data}=useReadContract({
     abi:holeskyAbi,
        address: holeskyContractHash as `0x${string}`,
        functionName: 'tokenURI',
        args: [item.tokenId]
  })
                    
        

     return (     
       <>
    
       {item &&

           <CardContainer key={BigInt(item.tokenId)}  className='max-w-xs w-full'>
<BackgroundGradient  className="w-full">
<CardBody className="bg-[#161B22]/70 backdrop-blur-3xl relative group/card flex flex-col gap-3  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-none max-w-xs w-full  h-auto rounded-xl py-10 px-6 border  ">
<CardItem  className="w-full mt-4">
  <Image
    src={`https://ipfs.io/${item.tokenImageURI}`}
    height="500"
    width="500"
    className="h-60 max-w-64 w-full object-cover rounded-lg group-hover/card:shadow-xl"
    alt={`${BigInt(item.tokenId)} NFT`}
      />
      <p className='opacity-0'>{item.tokenImageURI}</p>
</CardItem>

<div className="flex flex-col">
<CardItem
  className="text-xl font-bold text-white"
>
  NFT #{item.tokenId}
</CardItem>
<CardItem
  as="p"
  className="text-sm max-w-xs mt-2 textpwhite"
>
   { `${item.description}`}
</CardItem>


</div>

                 <div className="flex flex-wrap gap-2">
                   {item.attributes.map((attribute) => (
                     <div className="flex items-center gap-1">
                       <p className=" capitalize">{attribute.trait_type}: </p>
                       <p className="font-bold textblue-400 text-white">{attribute.value}</p>
                     </div>
                   ))}
</div>


<div className="flex justify-between items-center cursor-pointer mt-12">

<button  className='className="px-6 w-full cursor-pointer py-2 rounded-md text-base bg-[#58A6FF] dark:bg-white dark:text-black text-white font-bold"'>
          Details
        </button>
</div>
</CardBody>
</BackgroundGradient>
       </CardContainer>
}
       
</>
  )
}

export default NFTMintedCard