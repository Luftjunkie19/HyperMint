import { holeskyAbi } from '@/contract/abi/holeskyAbi'
import React from 'react'
import { useAccount, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import Image from 'next/image'
import { HeartCrackIcon } from 'lucide-react'
import TokenActionsModal from "./TokenActionsModal"


type Props = {
    contractAddr:`0x${string}`,
    senderAddress:`0x${string}`
}

function CustomCollection({ contractAddr, senderAddress }: Props) {
    
    const { address } = useAccount();
    const { writeContract, data:writeData,
        isPending, error } = useWriteContract({});

  const { isLoading: isConfirming, isSuccess: isConfirmed, error:confirmError,
    errorUpdateCount, isLoadingError, isError:isConfirmError, data:confirmData, failureReason, failureCount
  } = useWaitForTransactionReceipt({
      hash:
      writeData
  });

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
    },
    {
        address: contractAddr,
        abi: holeskyAbi,
        functionName:'symbol',
        args:[],
    },
  
]
})
    
    const transferTokenToUser=(targetAddress:`0x${string}`)=>{
        writeContract({
          address: contractAddr, 
          abi:holeskyAbi,
          'account':address,
          functionName:"safeTransferFrom",
           args:[address as `0x${string}`,targetAddress, item.tokenId]
          });
      }
    
      const burnToken =  () => {
        writeContract({
          address: contractAddr, 
          abi:holeskyAbi,
          'account':address,
          functionName:"burnToken",
           args:[item.tokenId]
          });
      }


    return (
      
    <div className="flex flex-col justify-between gap-4 w-full max-w-72 overflow-hidden  h-96 bg-neutral-700 rounded-2xl">
            
            {data && data.length > 0 ?
                <div className="flex justify-center w-full items-center mt-4 mx-2">
                        <div className="grid grid-cols-4 gap-3">
                {data.map((item, index) => {
                    return ( 
              <TokenActionsModal transferTokenToUser={transferTokenToUser} burnToken={burnToken} tokenDescription={item.description} tokenName={item.tokenId.toString()} imgSrc={`https://ipfs.io/${item.tokenImageURI.replace('ipfs://', 'ipfs/')}`} tokenId={item.tokenId} tokenURI={item.tokenURI} contractAddress={contractAddress}>
                  <Image className='shadow-xl cursor-pointer w-16 h-16 object-cover border border-blue-500 rounded-lg' src={`https://ipfs.io/${item.tokenURI.replace('ipfs://', 'ipfs/')}`} alt={item.tokenName} width={100} height={100}/>
              </TokenActionsModal>
          )
                })}
                </div> 
                </div>
                : 
                <div className="w-full h-full flex items-center flex-col gap-2 justify-center">
                        <p className='text-xl font-semibold'>No NFTs found</p>
                    <HeartCrackIcon className='text-red-500' size={32} />
                    <p className='text-center'>You have not minted any NFTs, change it 😎</p>
                </div>
                }

            
            <div className="flex flex-col border-t-2 border-t-blue-500 bg-neutral-800  p-2 gap-2">
      {results.data && results.data.map((item, index) => {
          return (
              <div key={index}>
                  <p className={`text-white ${index === 0 ? 'text-xl font-semibold' : 'text-lg font-sans'}`}>{item.result}</p>
              </div>
          )
      })}    
            </div>
    </div>
  )
}

export default CustomCollection