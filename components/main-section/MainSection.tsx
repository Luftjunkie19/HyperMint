import Image from 'next/image'
import React from 'react'
import KenobiGif from "../../public/gifs/starting.gif";
import { Button } from '../ui/button';
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision';
import ColourfulText from '../ui/colourful-text';
import { TextGenerateEffect } from '../ui/text-generate-effect';
type Props = {}

function MainSection({}: Props) {
  return (
   

      <div className='max-w-[90rem] z-20 my-12 lg:max-h-[42rem] mx-auto h-full  w-full flex justify-between flex-wrap gap-6 items-center p-8'>
          
<Image src={KenobiGif} className=' rounded-lg sm:mx-auto sm:max-w-xl lg:max-w-72 w-full  sm:h-96 lg:h-72' alt='Kenobi' width={100} height={100} />

     
          <div className=" sm:max-w-xl md:max-w-2xl  lg:max-w-xl xl:max-w-2xl w-full flex flex-col   gap-3">
              <p className=' text-4xl lg:text-6xl font-bold text-white'>Hello <ColourfulText text="there !" /></p>
              <TextGenerateEffect duration={0.1} className="text-white font-light text-sm" words='Unique, ever-changing NFTs, create you will. Through the Force of blockchain, images of your own upload and transform, you can. ⚡ Dynamic they are, evolving over time, reflecting new forms, hmmm. 🎨 Stored in the stars of IPFS, unaltered yet ever-growing, they remain. ✨ Mint, modify, and let your creations shape the digital galaxy, you must! 🚀'/>

<Button className='self-start text-base bg-green-500 py-5 transition-all sm:max-w-28 w-full hover:bg-green-700 text-gray-900 hover:text-white'>Mint</Button>
          </div>          
     

          
    </div>

  )
}

export default MainSection