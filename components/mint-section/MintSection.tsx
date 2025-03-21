'use client';

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Jaba from "../../public/gifs/jaba.gif";
import { useWriteContract, type BaseError, useWaitForTransactionReceipt, useAccount, useReadContract} from 'wagmi';
import { holeskyAbi, holeskyContractHash } from '@/contract/abi/holeskyAbi';
import NFTMintedCard from './NFTMintedCard';
import CollectionMinter from './forms/CollectionMinter';
import TokenMinter from './forms/TokenMinter';
import CreatedCollections from './CreatedCollections';
import { FaSadCry } from 'react-icons/fa';
type Props = {

}

function MintSection({}: Props) {
  
  const { isConnected, address } = useAccount();

  const { data } = useReadContract({
 abi:holeskyAbi,
    address: holeskyContractHash as `0x${string}`,
    functionName: 'getOwnersTokensAll',
    args: [address as `0x${string}`]
  });


  
  const [formMintOption, setFormMintOption] = useState<"Asset" | "Collection">("Asset");


 
  return (
    <div id='mint' className='w-full max-w-[95rem] mx-auto flex flex-col p-3 gap-4'>
      <div className="flex flex-col gap-3">
        <p className='text-white text-2xl font-semibold'>Minting Options</p>
          <div className="flex items-center gap-4 overflow-x-auto">
              <Button onClick={()=>setFormMintOption("Asset")} variant={formMintOption === "Asset" ? "default" : "secondary"}  className='text-base py-4'>Single Asset</Button>
              <Button onClick={()=>setFormMintOption("Collection")} variant={formMintOption === "Collection" ? "default" : "secondary"}  className='text-base py-4'>Collection</Button>
          </div>
      </div>

          <div className="flex items-center justify-between flex-col md:flex-row  gap-4 w-full">
              <Image src={Jaba} alt='' width={100} height={100} className='w-80 h-56 lg:w-[32rem] lg:h-80' />
              <div className="flex flex-col gap-6 max-w-3xl w-full text-white">
                  <h2 className="text-4xl font-bold">Mint Your NFT Now !</h2>
                  <p className="">Mint your own unique NFT, you must! Like Jaba, happy with his new token on his phone, so shall you be. Choose your collection or a single asset, the power is yours. Click the button, fill in the details, and finalize your creation. A journey of ownership, it begins now. Your NFT, your story. Take control, for greatness awaits. Unleash your creativity and make it yours!</p>
                 
          <div className="max-w-xl w-full">
            
                
                </div>           
              {formMintOption === 'Asset' ? <TokenMinter/>  : <CollectionMinter/>}
              </div>
          </div>

      {address && <>
         <div className="flex flex-col gap-3 text-white max-w-[90rem] mx-auto w-full">
      <p className='text-3xl font-bold'>Your NFTs minted here</p>
      <p className='max-w-3xl font-light text-sm w-full'>Here are the NFTs you have minted so far. You can now see them on your wallet and here as well. I'm sure it's first the beginning of your amazing journey with NFTs.</p>

     

{address && data && data.length > 0 ?  <div className="grid  grid-flow-col items-center gap-10 overflow-x-auto max-w-7xl p-4 w-full">
  {data.map((item, index) => <NFTMintedCard contractAddress={holeskyContractHash} key={index}  item={item} />)}
        </div> : <div className="flex flex-col items-center gap-12 justify-center max-w-3xl p-4 w-full mx-auto">
            <p className='text-white text-3xl font-semibold'>No NFTs minted yet</p>

            <FaSadCry className="text-8xl text-blue-400"/>

            <p className='text-white text-center text-lg font-semibold'>You can mint your first NFT now, by clicking the button above select the asset, click button, fill form, confirm, wait for the transfer and enjoy your NFT ! </p>
        </div>}


<CreatedCollections/>
    </div>
      </>}
 

    </div>
  )
}

export default MintSection