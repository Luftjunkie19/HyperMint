'use client';

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

import Jaba from "../../public/gifs/jaba.gif";
import { BackgroundGradient } from '../ui/background-gradient';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Inbox } from 'lucide-react';
import { useSonner } from 'sonner';
import { toast } from "sonner"
type Props = {}

function MintSection({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  

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
      setImagePreview(reader.result as string);
    };




  }
 
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
                      
  <DialogContent className='w-full bg-gray-700 z-[999999999]'>
                       
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
                <Input type='text' placeholder="Enter NFT Name" aria-label='NFT Name' />
              </div>

                 <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Symbol</p>
                <Input type='text' placeholder="Enter NFT Symbol" aria-label='NFT Symbol' />
              </div>
              <div className="flex gap-1 flex-col">
                <p className='text-white font-semibold'>NFT Description</p>
                <Textarea className='resize-none h-20' placeholder="Enter NFT Description" aria-label='NFT Description' />
              </div>
                          
                <Button>Confirm</Button>
                          </DialogContent>
</Dialog>
                </div>

             
                    
        
        
            
              </div>
              
          </div>

     

    </div>
  )
}

export default MintSection