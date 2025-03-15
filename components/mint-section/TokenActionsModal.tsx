import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog'
import { ArrowRightLeftIcon, EllipsisIcon, FlameIcon, PictureInPicture } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogPortal, DialogTrigger } from '@radix-ui/react-dialog'
import Image from 'next/image'
import { Input } from '../ui/input'
import { toast } from 'sonner'

type Props = {children:React.ReactNode, 
    burnToken:()=>void,
    transferTokenToUser:(targetAddress:`0x${string}`)=>void,
    contractAddress: `0x${string}`,
    tokenImageURI: string,
    imgSrc: string,
    attributes: readonly { trait_type: string; value: string }[],
    tokenId: BigInt, tokenURI: string, tokenName: string, tokenDescription: string
}

function TokenActionsModal({children,attributes, transferTokenToUser, burnToken, imgSrc,tokenImageURI, tokenId, tokenURI, contractAddress, tokenName, tokenDescription}: Props) {
 const [targetAddress, setTargetAddress] = React.useState<string>('');
    
 
    return (
    <Dialog>

        <DialogTrigger asChild>
           {children}
        </DialogTrigger>
            <DialogContent className='z-[999999999999999999999999999999999] max-h-[45rem] overflow-y-auto flex flex-col justify-between   h-full max-w-96 w-full bg-neutral-700 '>
                <DialogTitle className='text-white'>
                    {tokenName}
                </DialogTitle>

   <div className=" w-full h-full flex flex-col gap-3 justify-center">
   <Image src={imgSrc} className='self-center shadow-xl max-w-72 object-cover w-full max-h-60 rounded-lg' alt={tokenId.toString()} width={240} height={240}/>

<div className="flex flex-col gap-1 text-white">
                        <p className=" font-normal text-blue-400" ><span className="font-semibold text-lg text-white">Token Name:</span> {tokenName}</p>
                        <p className=" font-normal text-blue-400"><span className="font-semibold text-white text-lg">Token ID:{" "}</span> {tokenId.toString()}</p>

</div>
<div className="flex flex-col text-white max-h-32 h-full w-full bg-neutral-800 rounded-lg p-2">
         <p className="font-semibold text-lg">Description: </p>                   
 
   <p className="max-h-32 h-full w-full font-light text-sm  overflow-y-auto">{tokenDescription}</p>
</div>
<div className="flex flex-col gap-1">
    <p className="font-semibold text-lg text-white">Attributes</p>
   <div className="grid  grid-cols-2 md:grid-cols-3 gap-4 max-w-full w-full">
                   {attributes.map((attr, idx) => (
                   <div key={idx} className="bg-gray-800 p-2 flex w-fit items-center gap-2 rounded-md">
                        <span className="text-blue-400 text-xs">{attr.trait_type}:</span>
                        <span className="text-white text-sm font-semibold">{attr.value}</span>
                      </div>
                   ))}
</div>
</div>

   </div>

<div className="flex flex-col gap-1">
    <p className="font-semibold text-white text-lg">Transfer Token Address:</p>
    <Input value={targetAddress} className='text-white' onChange={(e)=>{setTargetAddress(e.target.value)}} placeholder='Target Address (starting with 0x)'/>
</div>
                
        <DialogFooter className='mt-6'>
<Button onClick={()=>window.open(tokenImageURI, '_blank')}>
     ImageURI 
</Button>
                    
                    <Button onClick={() => window.open(tokenURI, '_blank')}>
     TokenURI <PictureInPicture/>
</Button>

            <Button onClick={()=>{
                if(targetAddress.slice(0,2) === "0x" && targetAddress.length > 10){
                    transferTokenToUser(targetAddress as `0x${string}`);
                    return;
                }
                toast.error("Invalid Address"); 
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