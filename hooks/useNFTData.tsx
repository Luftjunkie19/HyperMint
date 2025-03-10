'use client';

import { abi } from '@/contract/abi/abi';
import { holeskyContractHash, holeskyAbi } from '@/contract/abi/holeskyAbi';
import { fetchImageURI } from '@/lib/actions';
import React, { useCallback, useEffect } from 'react'
import { useReadContract } from 'wagmi';

type Props = {index:bigint}

function useNFTData({ index}: Props) {
    
    const [tokenURIData, setTokenURIData] = React.useState<string | object | undefined>('');


      const {data:tokenURI}= useReadContract({
            abi:holeskyAbi,
            address: holeskyContractHash as `0x${string}`,
            functionName: 'getUsersTokenInfo',
            args: [index],
      });

    
    const fetchImageURIData = useCallback(async () => {
            
        if (tokenURI) {
    
            const response = await fetchImageURI(tokenURI);
    
            if (!response) {
                setTokenURIData(tokenURI);
            }
            else {
                setTokenURIData(response);
            }
            
        }
    }, [tokenURI])
       
    useEffect(() => {
        fetchImageURIData();
    }, [fetchImageURIData]);
        
    return (
      tokenURIData
  )
        }
    


export default useNFTData