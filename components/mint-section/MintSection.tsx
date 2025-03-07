'use client';

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
  import { create } from 'ipfs-http-client';
import Jaba from "../../public/gifs/jaba.gif";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Inbox } from 'lucide-react';
import { toast } from "sonner"
import { useWriteContract, type BaseError, useWaitForTransactionReceipt, useAccount, useReadContract} from 'wagmi';
import { abi } from '@/contract/abi/abi';
import ethers from "ethers";
import NFTMinted from './NFTMinted';
type Props = {}

function MintSection({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const { isConnected, address } = useAccount();
  const { data: hash, isPending, writeContract, error} = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

    const [name, setName] = useState<string>("");

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) toast.error("No files selected");
    const file = e.target!.files[0];

    console.log(file);


    if (!file.type.includes("image")) {
      toast.error("Only images and videos are allowed");
      return;
    }
 
    if (file.size > 10000000) { 
      toast.error("File size is too large");
      return;
    }

    setFileData(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };




  }




  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!isConnected){
      toast.error('You have to connect you wallet first');
      return;
    }

    const formData = new FormData();
    formData.append("file", fileData!); 
    formData.append("name", name);
    formData.append("keyValues", JSON.stringify({ 
      "strength": "100",
      "social": "52",
      "health": "78",
      "skills": "74",
      "luck": "85"
    }));
         const uploadRequest = await fetch("/api/pinata/post", {
        method: "POST",
           body: formData,
         });
    
    const uploadResponse = await uploadRequest.json();

    console.log(uploadResponse);

    if (uploadResponse.error) {
          toast.error('Error uploading image');
      return;
    }

  
      writeContract({
        address: '0xE3855DEa7e9E59E7861aD89fDdC2D8C594C2D836',
        abi,
        functionName: 'mintNFT',
        account: address,
        args: [(`${uploadResponse}` as string), BigInt(1), ["strength", "social", "health", "skills", "luck"], ["100", "52", "78", "74", "85"]],
      });

      
    
  }
 

  const { data } = useReadContract({
abi:abi,
address: '0xE3855DEa7e9E59E7861aD89fDdC2D8C594C2D836',
    functionName: 'getUsersToken',
    args: [address],
  });


 
  return (
    <div id='mint' className='w-full max-w-[95rem] mx-auto flex flex-col p-2 gap-4'>
      <div className="flex flex-col gap-3">
        <p className='text-white text-2xl font-semibold'>Minting Options</p>
          <div className="flex items-center gap-4 overflow-x-auto">
              <Button className='text-base py-4'>Single Asset</Button>
              <Button className='text-base py-4'>Collection</Button>
          </div>
      </div>

          <div className="flex items-center justify-between flex-col md:flex-row  gap-4 w-full">
              <Image src={Jaba} alt='' width={100} height={100} className='w-80 h-64 lg:w-[32rem] lg:h-80' />
              <div className="flex flex-col gap-6 max-w-3xl w-full text-white">
                  <h2 className="text-4xl font-bold">Mint Your NFT Now !</h2>
                  <p className="">Mint your own unique NFT, you must! Like Jaba, happy with his new token on his phone, so shall you be. Choose your collection or a single asset, the power is yours. Click the button, fill in the details, and finalize your creation. A journey of ownership, it begins now. Your NFT, your story. Take control, for greatness awaits. Unleash your creativity and make it yours!</p>
                 
          <div className="max-w-xl w-full">
            
                  <Dialog>
                      <DialogTrigger className='self-start text-base bg-green-500 py-2 rounded-md transition-all max-w-32 w-full hover:bg-green-700 text-gray-900 hover:text-white'>
              Mint Now
                      </DialogTrigger>
                      
  <DialogContent className='w-full max-w-xl bg-gray-700 z-[999999999]'>
    <DialogHeader>
      <DialogTitle className='text-white text-xl'>Mint Your NFT</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
                              </DialogDescription>           
              </DialogHeader>
                
                       
  <div onClick={()=>inputRef.current?.click()} className="flex gap-1 flex-col">
                <p className='text-white font-semibold text-lg'>Source File</p>
                <div className="max-w-96 cursor-pointer rounded-lg self-center w-full h-60 bg-gray-900 flex flex-col gap-2 items-center justify-evenly">
                {imagePreview ? (
                    <Image src={imagePreview} alt='' width={100} height={100} className='w-full h-full  rounded-lg' />
                  ) : (
              <>
                    <p className='text-white text-2xl font-semibold'>Drag and Drop</p>
                  <Inbox size={48} color='white' />
                          <p className='text-xs text-blue-400'>*Upload any image, mp3 or mp4 up to 10 MB</p>
                        </>      
                  )}
                  <input onChange={onImageSelect} ref={inputRef} type="file" name="" className='hidden' id="" />
              

                              </div>
                </div>
                {imagePreview && <p className='text-xs line-clamp-1   text-blue-400'>{imagePreview}</p>}


                <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Name</p>
                <Input onChange={(e) => setName(e.target.value)} name="NFT-name" type='text' placeholder="Enter NFT Name" aria-label='NFT Name' />
              </div>

                 <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Symbol</p>
                <Input name="NFT-symbol"  type='text' placeholder="Enter NFT Symbol" aria-label='NFT Symbol' />
              </div>
              <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Description</p>
                <Textarea className='resize-none h-20' placeholder="Enter NFT Description" aria-label='NFT Description' />
              </div>
                          
                <Button className="py-3" onClick={submitForm}>
                  {isPending ? "Minting...." : 'Confirm'}
                </Button>

                 {hash && <div>Transaction Hash: {hash}</div>}

               <p>{JSON.stringify(error)}</p>
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
                          </DialogContent>
         
</Dialog>
                </div>

             
                    
        
        
            
              </div>
              
          </div>

     
    <div className="flex flex-col gap-3 text-white max-w-[90rem] mx-auto w-full">
      <p className='text-3xl font-bold'>Your NFTs minted here</p>
      <p className='max-w-3xl font-light text-sm w-full'>Here are the NFTs you have minted so far. You can now see them on your wallet and here as well. I'm sure it's first the beginning of your amazing journey with NFTs.</p>
<div className="flex flex-wrap gap-10">
{address && data && data.map((item, index) => <NFTMinted key={index} index={BigInt(item)} />)}
</div>
    </div>

    </div>
  )
}

export default MintSection