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
    <div>{data && (data as `0x${string}`[]).length > 0 && address && data.map((item, index)=>(<CustomCollection key={index} contractAddr={item} senderAddress={address} />))}</div>
  )
}

export default CreatedCollections