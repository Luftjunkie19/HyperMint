'use client';

import React from 'react'
import { GiGalaxy } from "react-icons/gi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
 

type Props = {}

function Navbar({ }: Props) {

    const router = useRouter();
    
    const isMobile = useIsMobile();

  return (
      <div className='w-full h-16 p-2 fixed top-0 left-0 z-[50] bg-[#161B22]/70 backdrop-blur-lg   text-white flex items-center justify-center gap-2'>
          <div className="max-w-[90rem] w-full justify-between items-center gap-2 flex">
              <div className="flex items-center group gap-4 cursor-pointer">
                  <GiGalaxy size={48} className='text-blue-400'/>
              <p className="text-2xl group-hover:tracking-wider transition-all duration-500 font-medium text-yellow-400"> HyperMint </p>
              </div>

              


              <div className="items-center hidden lg:flex  gap-6">
                  <Button onClick={()=>router.replace("/")}>Home</Button>
                  <Button onClick={()=>router.replace("/#mint")} >Mint</Button>
                  <Button onClick={()=>router.replace("/#team")}>Team</Button>
                  <Button onClick={()=>router.replace("/#FAQ")}>FAQ</Button>
                  <Button onClick={()=>router.replace("/#social-media")}>Social Media</Button>
              </div>

              
              <div className="">
                  <ConnectButton label='Connect' accountStatus={'address'} showBalance={isMobile ? false : true} chainStatus={'icon'}/>
              </div>

          </div>
    </div>
  )
}

export default Navbar