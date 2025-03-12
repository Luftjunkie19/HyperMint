import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogClose } from '../../ui/dialog';
import { Form, useForm } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { formNFTSchema } from './TokenMinter';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Inbox } from 'lucide-react';
import { Button } from 'react-day-picker';
import Image from 'next/image';
type Props = {}

function CollectionMinter({}: Props) {

  const collectionFormMinter= z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long." }).max(50, { message: "Name must be at most 50 characters long." }),
    symbol: z.string().min(3, { message: "Symbol must be at least 3 characters long." }).max(6, { message: "Symbol must be at most 6 characters long." }),
    NFTsToSend: z.array(formNFTSchema).max(5, { message: "Max as a inital collection 5 NFTs, then you can add more." }), 
  });

  const form = useForm<z.infer<typeof collectionFormMinter>>({
    resolver: zodResolver(collectionFormMinter),
  })

  return (
    <Dialog>
    <DialogTrigger className='self-start text-base bg-green-500 py-2 rounded-md transition-all max-w-40 w-full hover:bg-green-700 text-gray-900 hover:text-white'>
Mint Collection
    </DialogTrigger>
    
<DialogContent className='w-full max-w-xl bg-gray-700 z-[999999999]'>

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
name="symbol"
render={() => (
<FormItem>
<FormLabel />
<FormControl>
<div className="flex gap-1 flex-col">
<p className='text-white font-semibold'>NFT Symbol</p>
<Input {...form.register("symbol")} name="NFT-symbol" type='text' placeholder="Enter NFT Symbol" aria-label='NFT Symbol' />
</div>
</FormControl>
<FormDescription />
<FormMessage />
</FormItem>
)}
/>




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

export default CollectionMinter