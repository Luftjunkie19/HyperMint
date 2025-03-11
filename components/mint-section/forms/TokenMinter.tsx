"use client";
import { z } from "zod"
import Image from "next/image";
import React, { useRef, useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../ui/dialog';
import { DialogHeader, DialogClose } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { toast } from "sonner";
import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { holeskyAbi, holeskyContractHash } from "@/contract/abi/holeskyAbi";
type Props = {}

function TokenMinter({ }: Props) {
  const { isConnected, address } = useAccount();
  const { data: hash, isPending, writeContract, error} = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed  } =
    useWaitForTransactionReceipt({
      hash,
    });


 

 
const formSchema = z.object({
  name: z.string()
})


    const inputRef = useRef<HTMLInputElement>(null);
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const [fileData, setFileData] = useState<File | null>(null);
      const [attributes, setAttributes] = useState<Record<string, string>[]>();
        const [name, setName] = useState<string>("");
        const [description, setDescription] = useState<string>("");
    const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    
      if (!isConnected) {
        toast.error("You have to connect your wallet first");
        return;
      }
    
      // Step 1: Upload Image to IPFS
      const formData = new FormData();
      formData.append("file", fileData!);
      formData.append("name", name);
      formData.append("description", description);
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
      console.log("Upload Response:", uploadResponse);
    
      if (uploadResponse.error) {
        toast.error("Error uploading image");
        return;
      }
    
      const imageCID = uploadResponse.IpfsHash; // The image CID
      const imageURI =  `ipfs://${imageCID}`;
    
      console.log(imageURI);
    
      // Step 2: Upload Metadata JSON to IPFS
      const metadata = {
        name: name,
        description: description,
        image: imageURI, // Link to the image
        attributes: [
          { trait_type: "Strength", value: "100" },
          { trait_type: "Social", value: "52" },
          { trait_type: "Health", value: "78" },
          { trait_type: "Skills", value: "74" },
          { trait_type: "Luck", value: "85" }
        ]
      };
    
      const metadataRequest = await fetch("/api/pinata/post", {
        method: "POST",
        body: JSON.stringify(metadata),
        headers: { "Content-Type": "application/json" }
      });
    
      const metadataResponse = await metadataRequest.json();
      console.log("Metadata Upload Response:", metadataResponse);
    
      if (metadataResponse.error) {
        toast.error("Error uploading metadata");
        return;
      }
    
      console.log(metadataResponse.IpfsHash, metadataResponse, `ipfs://${metadataResponse.IpfsHash}`);
    
      const tokenURI = `ipfs://${metadataResponse.IpfsHash}`; // Use JSON CID
    
      console.log(tokenURI, 'Token URI');
      console.log(imageURI, 'Image URI');
    
    
      // Step 3: Mint NFT
      writeContract({
       abi:holeskyAbi,
        address: holeskyContractHash as `0x${string}`,
        functionName: "mintNFT",
        account: address,
        args: [tokenURI, imageURI,name , description, ["strength", "social", "health", "skills", "luck"], ["100", "52", "78", "74", "85"]]
      });
    };
    
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
          console.log(reader.result as string);
          setImagePreview(reader.result as string);
        };
    
    
    
    
      }
    
    


  return (
  <Dialog>
                      <DialogTrigger className='self-start text-base bg-green-500 py-2 rounded-md transition-all max-w-32 w-full hover:bg-green-700 text-gray-900 hover:text-white'>
              Mint Asset
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
                    <Image src={imagePreview} alt='' width={100} height={100} className='w-full h-full rounded-lg' />
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
                <p className='text-white font-semibold'>NFT Description</p>
                <Textarea className='resize-none h-20' onChange={(e) => setDescription(e.target.value)} placeholder="Enter NFT Description" aria-label='NFT Description' />
              </div>
                          <DialogClose asChild>

                <Button className="py-3" onClick={submitForm}>
                  {isPending ? "Minting...." : 'Confirm'}
                </Button>
                          </DialogClose>

{isPending && <p className='text-white text-center'>Minting....</p>}  
                {error && <p>{error.message}-{error.name}</p>}
             
                          </DialogContent>
         
</Dialog>
  )
}

export default TokenMinter