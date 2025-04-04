import React from 'react'

import { BackgroundGradient } from '../ui/background-gradient';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import TokenActionsModal from './TokenActionsModal';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { holeskyAbi } from '@/contract/abi/holeskyAbi';
import { TransactionStatusSection } from './forms/sections/collection-form/TransactionStatusSection';
type Props = {item: {
    tokenId: bigint;
  tokenURI: string;
  tokenName: string;
    tokenImageURI: string;
    description: string;
    attributes: readonly {
        trait_type: string;
        value: string;
    }[];
},
contractAddress:`0x${string}`,



}

function NFTMintedCard({ item, contractAddress}: Props) {
  const {address}=useAccount();

  const {writeContract, data, isPending, error}=useWriteContract({});

  const { isLoading: isConfirming, isSuccess: isConfirmed, error:confirmError,
    errorUpdateCount, isLoadingError, isError:isConfirmError, data:confirmData, failureReason, failureCount
  } = useWaitForTransactionReceipt({hash:data});


  const transferTokenToUser=(targetAddress:`0x${string}`)=>{
    writeContract({
      address: contractAddress, 
      abi:holeskyAbi,
      'account':address,
      functionName:"safeTransferFrom",
       args:[address as `0x${string}`,targetAddress, item.tokenId]
      });
  }

  const burnToken =  () => {
    writeContract({
      address: contractAddress, 
      abi:holeskyAbi,
      'account':address,
      functionName:"burnToken",
       args:[item.tokenId]
      });
  }

     return (     
       <div className='flex flex-col gap-2 max-xs items-center w-full'>

    
       {item &&

           <CardContainer key={BigInt(item.tokenId)}  className='max-w-xs w-full'>
<BackgroundGradient  className="w-full max-w-xs">
<CardBody className="bg-[#161B22]/70 backdrop-blur-3xl relative group/card flex flex-col gap-3  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-none max-w-xs w-full  h-auto rounded-xl py-10 px-6 border  ">
<CardItem  className="w-full mt-4">
  <Image
    src={`https://ipfs.io/${item.tokenImageURI.replace('ipfs://', 'ipfs/')}`}
    height="500"
    width="500"
    className="h-60 max-w-64 w-full object-cover rounded-lg group-hover/card:shadow-xl"
    alt={`${BigInt(item.tokenId)} NFT`}
      />
      <p  className='opacity-0'>
      {item.tokenImageURI}
      </p>
</CardItem>

<div className="flex flex-col">
<CardItem
  className="text-xl font-bold text-white"
>
  NFT #{item.tokenId}
</CardItem>
<CardItem
  as="p"
  className="text-sm line-clamp-2 max-w-xs mt-2 textpwhite"
>
   { `${item.description}`}
</CardItem>


</div>

                 
                 <div className="grid grid-cols-2 gap-4 max-w-full w-full">
                   {item.attributes.map((attr, idx) => (
                   <div key={idx} className="bg-gray-800 p-2 flex items-center gap-2 rounded-md">
                        <span className="text-blue-400 text-sm">{attr.trait_type}:</span>
                        <span className="text-white font-semibold">{attr.value}</span>
                      </div>
                   ))}
</div>


<div className="flex justify-between items-center cursor-pointer mt-12">

</div>
</CardBody>
</BackgroundGradient>
       </CardContainer>

}
<TokenActionsModal tokenImageURI={item.tokenImageURI} attributes={item.attributes} transferTokenToUser={transferTokenToUser} burnToken={burnToken} tokenDescription={item.description} tokenName={item.tokenName} imgSrc={`https://ipfs.io/${item.tokenImageURI.replace('ipfs://', 'ipfs/')}`} tokenId={item.tokenId} tokenURI={item.tokenURI} contractAddress={contractAddress}>
<button  className='className="px-6 w-full max-w-xs cursor-pointer py-2 rounded-md text-base bg-[#58A6FF] dark:bg-white dark:text-black text-white font-bold"'>
          Details
        </button>
</TokenActionsModal>
       
</div>
  )
}
export default NFTMintedCard