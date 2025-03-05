import React from 'react'
import { GiGalaxy } from "react-icons/gi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';

type Props = {}

function Navbar({}: Props) {
  return (
      <div className='w-full h-16 p-2 bg-neutral-800 text-white flex items-center justify-center gap-2'>
          <div className="max-w-[80rem] w-full justify-between items-center gap-2 flex">
              <div className="flex items-center group gap-4 cursor-pointer">
                  <GiGalaxy size={48} className='text-blue-400'/>
              <p className="text-2xl group-hover:tracking-wider transition-all duration-500 font-medium text-yellow-400"> HyperMint </p>
              </div>

              


              <div className="items-center hidden lg:flex  gap-6">
                  <Button >Mint</Button>
                  <Button >About</Button>
                  <Button>Team</Button>
                  <Button>FAQ</Button>
                  <Button>Social Media</Button>
              </div>

              
              <div className="">
                  <ConnectButton />
              </div>

          </div>
    </div>
  )
}

export default Navbar