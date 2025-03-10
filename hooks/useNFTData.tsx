'use client';

import { abi } from '@/contract/abi/abi';
import { fetchImageURI } from '@/lib/actions';
import React, { useCallback, useEffect } from 'react'
import { useReadContract } from 'wagmi';

type Props = {index:bigint}

function useNFTData({ index}: Props) {
    
    const [tokenURIData, setTokenURIData] = React.useState<string | object | undefined>('');


      const {data:tokenURI}= useReadContract({
            abi:abi,
            address: '0xE3855DEa7e9E59E7861aD89fDdC2D8C594C2D836',
            functionName: 'tokenURI',
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