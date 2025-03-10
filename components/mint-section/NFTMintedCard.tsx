import React from 'react'

import { BackgroundGradient } from '../ui/background-gradient';
import { fetchImageURI } from '@/lib/actions';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
type Props = {index:bigint, tokenURI?:string | object }

 function NFTMintedCard({ tokenURI, index}: Props) {
    
     

     
     return (     
      
                 <CardContainer className='max-w-xs w-full'>
      <BackgroundGradient  className="w-full">
    <CardBody className="bg-[#161B22]/70 backdrop-blur-3xl relative group/card flex flex-col gap-3  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-none max-w-xs w-full  h-auto rounded-xl py-10 px-6 border  ">
      <CardItem  className="w-full mt-4">
        <Image
          src={typeof tokenURI === 'string'  ?  `${tokenURI}` : `${tokenURI.image}`}
          height="1000"
          width="1000"
          className="h-60 max-w-64 w-full object-cover rounded-lg group-hover/card:shadow-xl"
          alt="thumbnail"
            />
            <p className='opacity-0'>{typeof tokenURI === 'string'  ?  `${tokenURI}` : `${tokenURI.image}`}</p>
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
         {typeof tokenURI !== 'string'  ?  `${tokenURI.description}` : 'This NFT unfortunately has no description.'}
      </CardItem>
</div>


      <div className="flex justify-between items-center cursor-pointer mt-12">
    
     <button  className='className="px-6 w-full cursor-pointer py-2 rounded-md text-base bg-[#58A6FF] dark:bg-white dark:text-black text-white font-bold"'>
                Details
              </button>
      </div>
    </CardBody>
    </BackgroundGradient>
             </CardContainer>
             
    


        


  )
}

export default NFTMintedCard