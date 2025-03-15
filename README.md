
# HyperMint, NFT-minting/management app



![Logo](https://giffiles.alphacoders.com/212/212629.gif)



## HyperMint, Mint it Hyper, Get it fast 



This project has been created for practice purposes to test my skills in solidity. 

This project is a simple minting app with a Star Wars theme, built with solidity for smart-contract's code and with NextJS powered by TypeScript for frontend and interaction with smart-contract.

In HyperMint, you can mint either your collection or an asset to already existing smart-contract, if you don't want your own collection. 

The contracts has been deployed on Holesky Testnet, and it will only be accessible there.
## Screenshots

![Main Page](https://pbs.twimg.com/media/GmE6B1yWwAAMzAW?format=jpg&name=large)

![Action Modal](https://pbs.twimg.com/media/GmE6GFlbYAAFhKO?format=jpg&name=large)

![Last Section](https://pbs.twimg.com/media/GmE6GF1bcAI4-G7?format=jpg&name=large)



## Codebase Structure

`app` - Folder where all the code, user uses and sees is written.

- `/api` - Folder with endpoints to manage the Pinata File Storage to IPFS.

### Components, the building bricks of this project.

- `/components` - This folder includes a lot of sub-folders, where the components as well. However in the root of this folder you'll find besides the sub-folders a Stepper Component for the form and 2 expandable-card components, which arguably will be used in the future refinement.
- `/components/navbar` - Folder containing the Navbar component, where you can navigate from there. 
- `/components/faq-section` - Folder containing the component displaying the 3 questions for filling-purposes.
- `/components/main-section` - Just a simple hero section component. 
- `/components/mint-secion` - Contains the Modal for user's NFT with actions he can proceed on them. The main component, which contains the buttons for selection, what user wants to mint (collection or asset). It contains also the display of the minted tokens by the user and deployed collections.
- `/components/mint-section/forms` - This form contains the forms for the NFT creation. in `/sections` subfolder there are the sections to display in the form in the stepper.
- `/components/team-section` - A section devoted to display, who's standing behind the project and a bit of self-promote 😅
- `/components/ui` - components from shadcn and ascernity library to make my UI look neater.

`/contract` - Contains the ABI and smart-contract addresses and the json files of the contracts.

`/contract/abi` - Contains the abis for interactions and the addresses.

`/contract/json` - Contains the json files to certain contracts. 

`/hooks` - Contains custom hooks needed for interaction with the web-app.

`/lib` - Contains configs for wagmi, pinata and zustand.

`/providers` - Contains wrapper components, which the root of the app is wrapped with.
## Authors

- [@Luftjunkie](https://www.github.com/Luftjunkie19)


## Acknowledgements

 - [Patrick Collins, CEO Of Cyfrin](https://github.com/patrickalphac) - Who Created an awesome course on Solidity and Foundry.



## If you want to run the project locally:

Clone the project

```bash
  git clone https://github.com/Luftjunkie19/HyperMint.git
```
## ** Important note
You have to create your own account on pinata and swap the properties in the minting `/api` folder.
##
Go to the project directory

```bash
  cd HyperMint
```

Install dependencies

```bash
  npm install
```

If it does not work properly, you could get error, run 
```bash
npm i --force
```

Then start the project with

```bash
  npm run dev
```


## Support

If something get's broken message me on - [X](https://x.com/luftjunkie) or message me on discord Luftjunkie#1566

