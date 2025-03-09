import { abi } from '@/contract/abi/abi';
import Image from 'next/image';
import React from 'react'
import { useReadContract } from 'wagmi';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { BackgroundGradient } from '../ui/background-gradient';

type Props = {
    index: bigint
}

//Recent Contract: 0xE3855DEa7e9E59E7861aD89fDdC2D8C594C2D836

function NFTMinted({ index }: Props) {

  const {data:tokenURIData}= useReadContract({
        abi:abi,
        address: '0xE3855DEa7e9E59E7861aD89fDdC2D8C594C2D836',
        functionName: 'tokenURI',
        args: [index],
      });
 
    

   
  return (
    <CardContainer className='max-w-xs w-full'>
      <BackgroundGradient  className="w-full">
    <CardBody className="bg-[#161B22]/70 backdrop-blur-3xl relative group/card flex flex-col gap-3  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-none max-w-xs w-full  h-auto rounded-xl py-10 px-6 border  ">
      <CardItem  className="w-full mt-4">
        <Image
          src={index !== BigInt(15) ? tokenURIData as string : `https://tomato-hilarious-porcupine-371.mypinata.cloud/ipfs/bafkreigxwyiile67ghpkvsnfhphv4rduueomatf74jlg7duol755fwbre4`}
          height="1000"
          width="1000"
          className="h-60 max-w-64 w-full object-cover rounded-lg group-hover/card:shadow-xl"
          alt="thumbnail"
            />
            <p className='opacity-0'>{tokenURIData}</p>
      </CardItem>

<div className="flex flex-col">
      <CardItem
        className="text-xl font-bold text-white"
      >
        NFT #{index}
      </CardItem>
      <CardItem
        as="p"
        className="text-sm max-w-xs mt-2 textpwhite"
      >
        Hover over this card to unleash the power of CSS perspective
      </CardItem>
</div>


      <div className="flex justify-between items-center cursor-pointer mt-12">
    
     <button onClick={()=>{window.open(`https://opensea.io/assets/ethereum/0xe3855dea7e9e59e7861ad89fddc2d8c594c2d836/${index}`)}} className='className="px-6 w-full cursor-pointer py-2 rounded-md text-base bg-[#58A6FF] dark:bg-white dark:text-black text-white font-bold"'>
                Details
              </button>
      </div>
    </CardBody>
    </BackgroundGradient>
  </CardContainer>
  

  
  )
}

export default NFTMinted