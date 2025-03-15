'use client';

import React from 'react'
import { AnimatedTestimonials } from '../ui/animated-testimonials';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { FaGithub, FaTwitter } from 'react-icons/fa';

type Props = {}

function TeamSection({ }: Props) {




  return (
      <div id='team'  className='max-w-7xl w-full mx-auto flex flex-col p-2'>
          <p className="text-white text-4xl font-semibold">Project Developer</p>

          <AnimatedTestimonials testimonials={[{
              'designation': 'Fullstack Developer',
              'name': 'Łukasz Szulc',
              'quote': `Hi there 👋🏼, my name is Łukasz Szulc and I'm ${formatDistanceToNow(new Date('06-05-2005'))} old Fullstack Developer. Born in 06.05.2005 in Warsaw, Poland. I've started my coding journey on 1st of July 2022 and since now I constantly develop myself in CS and Crypto.`,
              'src': 'https://pbs.twimg.com/media/GkgWveUXgAAFboj?format=jpg&name=large',
              socialMedia: [
                  { icon: FaGithub, url: 'https://github.com/Luftjunkie19', label: 'My Github Profile !' },
                  { icon: FaTwitter, url: 'https://x.com/Luftjunkie', label: 'Checkout My X Profile !' }
              ]
          },
          {
              'designation': 'How it all started ?',
              'name': 'Web3, Blockchain, Crypto.....',
              'quote': `I started learning about crypto in late 2021 as I've started to learn about the fundamentals of BTC. The thing that it's decentralized etc. I read 5 books about cryptocurrencies and watched x more videos about it. In October 2024, I decided I would like to learn how to develop things on blockchain.`,
              'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5CS_QUO8BINDzdhGPn1qLRNhvF3AYURRovw&s',
             
          },
              {
                  src: 'https://mecaluxpl.cdnwm.com/blog/img/nft-technologia-lancuch-dostaw.1.3.jpg',
                   'designation': 'What is this project for ? And why ?',
              'name': 'Web3, Blockchain, Crypto.....',
              'quote': `With this project you can test how this all minting process looks like without needs to pay any REAL money. No worries, I won't require from you any private-key or anything as other phising websites do. The only thing is that you need to be connected to the Holesky Testnet Chain.`,
        }
          ]} />


    </div>
  )
}

export default TeamSection