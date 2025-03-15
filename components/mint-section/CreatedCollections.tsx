import { holeskyAbi, holeskyContractHash } from '@/contract/abi/holeskyAbi'
import { factoryAbi, factoryContractAddr } from '@/contract/abi/nftFactoryAbi'
import React from 'react'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import CustomCollection from './CustomCollection'

type Props = {}

function CreatedCollections({}: Props) {
    const {address}=useAccount()
    
    const {data, error, isLoading, isPending, refetch, isError, isSuccess, status, isFetching}=useReadContract({            
                abi:factoryAbi,
                address: factoryContractAddr,
                functionName:'getUsersCollections',
                account:address,
                args:[],
    });


  return (
    <div className='flex flex-col gap-4'>
      <div className="flex flex-col gap-1">
        <p className='text-white text-3xl font-semibold'>Created Collections</p>
      <p className='max-w-3xl font-light text-sm w-full'>In total {data as `0x${string}`[] && (data as `0x${string}`[]).length > 0 && address && (data as `0x${string}`[]).length} collections created</p>
      </div>
<div className="flex items-center overflow-x-auto gap-6">

      {data as `0x${string}`[] && (data as `0x${string}`[]).length > 0 && address && (data as `0x${string}`[]).map((item, index) => (<CustomCollection key={index} contractAddr={item} senderAddress={address} />))}</div>
</div>
  )
}

export default CreatedCollections