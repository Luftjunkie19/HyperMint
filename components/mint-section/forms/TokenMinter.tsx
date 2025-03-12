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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {}

export const formNFTSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }).max(50, { message: "Name must be at most 50 characters long." }),
  description: z.string().min(3, { message: "Description must be at least 3 characters long." }).max(100, { message: "Description must be at most 100 characters long." }),
  image: z
  .any()
  .refine((file) => file?.size <= 10000000, `Max image size is 10MB.`)
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file?.type),
    "Only .jpg, .jpeg, .png, .gif and .webp formats are supported."
  ),
  imagePreview: z.string(),
  attributes: z.array(
    z.object({
      trait_type: z.string().min(3, { message: "Trait type must be at least 3 characters long." }).max(50, { message: "Trait type must be at most 50 characters long." }),
      value: z.string().min(3, { message: "Value must be at least 3 characters long." }).max(10, { message: "Value must be at most 10 characters long." }),
    })
  ).max(5, { message: "Max 5 attributes." })
});

function TokenMinter({ }: Props) {
  const { isConnected, address } = useAccount();
  const { data: hash, isPending, writeContract, error} = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed  } =
    useWaitForTransactionReceipt({
      hash,
    });

     



    const form= useForm<z.infer<typeof formNFTSchema>>({
      resolver: zodResolver(formNFTSchema),
      
    });



 



    const inputRef = useRef<HTMLInputElement>(null);
   
    const submitForm = async (data: z.infer<typeof formNFTSchema>, e: React.FormEvent) => {
      e.preventDefault();
    
      if (!isConnected) {
        toast.error("You have to connect your wallet first");
        return;
      }
    
      // Step 1: Upload Image to IPFS
      const formData = new FormData();
      formData.append("file", data.image!);
      formData.append("name", data.name);
      formData.append("description", data.description);

      let keyValues:Record<string, string> = {};
      data.attributes.forEach((attribute, index) => {
        keyValues[attribute.trait_type]= attribute.value;
        });

      formData.append("keyValues", JSON.stringify(keyValues));
    
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
        name: data.name,
        description: data.description,
        image: imageURI, // Link to the image
        attributes: data.attributes
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
        args: [tokenURI, imageURI, data.name , data.description, (data.attributes.map((attribute) => attribute.trait_type) as [string, string, string, string, string]), (data.attributes.map((attribute) => attribute.value) as [string, string, string, string, string])]
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
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          form.setValue("imagePreview", reader.result as string);
        };
    
      form.setValue("image", file);
    
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

        <Form {...form}>
<form onSubmit={form.handleSubmit(submitForm)}>

  <FormField
    control={form.control}
    name="name"
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
        <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Name</p>
                <Input {...form.register("name")} name="NFT-name" type='text' placeholder="Enter NFT Name" aria-label='NFT Name' />
              </div>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />

<FormField
    control={form.control}
    name="description"
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
        <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Description</p>
                <Textarea className='resize-none h-20' {...form.register("description")} name="NFT-description" placeholder="Enter NFT Description" aria-label='NFT Description' />
              </div>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />




<FormField
    control={form.control}
    name="image"
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
        <div onClick={()=>inputRef.current?.click()} className="flex gap-1 flex-col">
                <p className='text-white font-semibold text-lg'>Source File</p>
                <div className="max-w-96 cursor-pointer rounded-lg self-center w-full h-60 bg-gray-900 flex flex-col gap-2 items-center justify-evenly">
                {form.watch("imagePreview") ? (
                    <Image src={form.watch("imagePreview")} alt='' width={100} height={100} className='w-full h-full rounded-lg' />
                  ) : (
              <>
                    <p className='text-white text-2xl font-semibold'>Drag and Drop</p>
                  <Inbox size={48} color='white' />
                          <p className='text-xs text-blue-400'>*Upload any image, mp3 or mp4 up to 10 MB</p>
                        </>      
                  )}
                  <input {...form.register("image")} onChange={onImageSelect} ref={inputRef} type="file" name="" className='hidden' id="" />
              

                              </div>
                </div>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
             {form.watch("imagePreview") && <p className='text-xs line-clamp-1   text-blue-400'>{form.watch("imagePreview")}</p>}


           
                          <DialogClose asChild>

                <Button className="py-3" >
                  {isPending ? "Minting...." : 'Confirm'}
                </Button>
                          </DialogClose>

{isPending && <p className='text-white text-center'>Minting....</p>}  
                {error && <p>{error.message}-{error.name}</p>}


                </form>
</Form>
             
                          </DialogContent>
         
</Dialog>
  )
}

export default TokenMinter

