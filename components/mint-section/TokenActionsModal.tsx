import React from 'react'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'
import { ArrowRightLeftIcon, EllipsisIcon, FlameIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogPortal, DialogTrigger } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { Input } from '../ui/input'

type Props = {children:React.ReactNode, 
    burnToken:()=>void,
    transferTokenToUser:(targetAddress:`0x${string}`)=>void,
    contractAddress:`0x${string}`, imgSrc:string, tokenId:BigInt, tokenURI:string, tokenName:string, tokenDescription:string}

function TokenActionsModal({children, transferTokenToUser, burnToken, imgSrc, tokenId, tokenURI, contractAddress, tokenName, tokenDescription}: Props) {
 const [targetAddress, setTargetAddress] = React.useState<string>('');
    
 
    return (
    <Dialog>

        <DialogTrigger asChild>
           {children}
        </DialogTrigger>
        <DialogContent className='z-[999999999999999999999999999999999] max-h-[90vh] flex flex-col justify-between   h-full max-w-96 w-full bg-neutral-700 '>

   <div className=" w-full h-full flex flex-col gap-3 justify-center">
   <Image src={imgSrc} className='self-center shadow-xl max-w-60 w-full max-h-60 rounded-lg' alt={tokenId.toString()} width={100} height={100}/>

<div className="flex flex-col gap-1">
    <p>Token Name: {tokenName}</p>
    <p>{tokenDescription}</p>
</div>

<Input value={targetAddress} className='text-white' onChange={(e)=>{setTargetAddress(e.target.value)}} placeholder='Target Address (starting with 0x)'/>

   </div>

        <DialogFooter className=''>
            <Button onClick={()=>{
                if(targetAddress.slice(0,2) === "0x" && targetAddress.length > 10){
                    transferTokenToUser(targetAddress as `0x${string}`);
                }
            }} className='flex bg-blue-500 transition-all  items-center gap-2'>
                <ArrowRightLeftIcon />
                <span>Transfer</span>
            
            </Button>

            <Button onClick={burnToken} className='flex bg-red-600 items-center transition-all hover:bg-red-800 gap-2'>
                <FlameIcon />
                <span>Burn Token</span>
            </Button>
           
    </DialogFooter>
        </DialogContent>

    </Dialog>
  )
}

export default TokenActionsModal