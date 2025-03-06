import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

type Props = {}

function FaqSection({}: Props) {
  return (
      <div id='FAQ' className='max-w-[95rem] w-full mx-auto flex flex-col gap-2'>
          <p className='text-4xl font-bold text-white'>Frequently Asked Questions</p>
          <p className='font-light text-white '>This section is devoted to questions and answers that are frequently asked.</p>


              <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto p-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className='text-lg text-white'>What if I don't have any SepoliaETH ?</AccordionTrigger>
        <AccordionContent className='text-neutral-300'>
          If you have lack of SepoliaETH or you don't have any SepoliaETH, you can get it from <a className='text-blue-400 hover:underline transition-all' target='_blank' href='https://cloud.google.com/application/web3/faucet/ethereum/sepolia'>This faucet here</a>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className='text-lg text-white'>How can I be sure the software is not malicious?</AccordionTrigger>
        <AccordionContent className='text-neutral-300'>
          Firstly, you can see the source of code of this project right on my Github profile, so go and check it out. Secondly you have to connect to a testnet, which does not require any real money from you.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className='text-lg text-white'>Is it animated?</AccordionTrigger>
        <AccordionContent className='text-neutral-300'>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    </div>
  )
}

export default FaqSection