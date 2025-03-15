"use client"
import React, { useRef, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formNFTSchema, type NFTFormValues } from "./TokenMinter"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useAccount, useDeployContract, useWaitForTransactionReceipt, useWatchContractEvent, useWriteContract } from "wagmi"
import { holeskyAbi, holeskyContractHash } from "@/contract/abi/holeskyAbi"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stepper } from "@/components/Stepper"

// Import section components
import { CollectionBasicInfoSection } from "./sections/collection-form/CollectionBasicInfoSection"
import { NFTListSection } from "./sections/collection-form/NFTListSection"
import { NFTEditorSection } from "./sections/collection-form/NFTEditorSection"
import { CollectionSummarySection } from "./sections/collection-form/CollectionSummarySection"
import { TransactionStatusSection } from "./sections/collection-form/TransactionStatusSection"
import { factoryAbi, factoryContractAddr } from "@/contract/abi/nftFactoryAbi"
import { useStore } from "@/lib/zustandContext"
import { Log } from "viem"

type collectionEventReturnedData = Log & {
  args: {
    collectionAddress: `0x${string}`;
    name: string;
    symbol: string;
  };
};


// Define the collection schema
const collectionFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(20, { message: "Name must be at most 20 characters long." }),
  symbol: z
    .string()
    .min(3, { message: "Symbol must be at least 3 characters long." })
    .max(6, { message: "Symbol must be at most 6 characters long." }),

  
  initialNft: formNFTSchema
})

// Export the CollectionFormValues type so it can be used in the section components
export type CollectionFormValues = z.infer<typeof collectionFormSchema>

function CollectionMinter() {
  const {insertNewContract}=useStore();
  const { isConnected, address } = useAccount()
  const { data: hash, isPending, writeContract, error } = useWriteContract()
const [finalDeployedContractData, setFinalDeployedContractData] = useState<{contractAddress: `0x${string}`, symbol: string, name: string}>();
  const { isLoading: isConfirming, isSuccess: isConfirmed, error:confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  useWatchContractEvent({
    address: factoryContractAddr as `0x${string}`,
    abi:factoryAbi,
    eventName: 'CollectionCreated',
    onLogs(logs) {
      setFinalDeployedContractData({
        contractAddress: (logs[0] as collectionEventReturnedData).args.collectionAddress,
        symbol:  (logs[0] as collectionEventReturnedData).args.symbol,
        name:  (logs[0] as collectionEventReturnedData).args.name
      });
      insertNewContract( (logs[0] as collectionEventReturnedData).args.collectionAddress);
    },
  })

  const [step, setStep] = useState(0)
  const steps = ["Contract Data", "NFT Creation", "Summary", "Transaction"]

  const [editingNftIndex, setEditingNftIndex] = useState<number | null>(null)
  const [activeNftTab, setActiveNftTab] = useState("list")
  const [transactionDetails, setTransactionDetails] = useState<{
    hash?: string
    contractAddress?: string
  }>({})


  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      initialNft:{
        'name': '',
        'description': '',
        'image': '',
        'imagePreview': '',
        'attributes': [
          { 'trait_type': '', 'value': '' },
          { 'trait_type': '', 'value': '' },
          { 'trait_type': '', 'value': '' },
          { 'trait_type': '', 'value': '' },
          { 'trait_type': '', 'value': '' }
        ]
      }
    },
  })

  const nftForm = useForm<NFTFormValues>({
    resolver: zodResolver(formNFTSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      imagePreview: "",
      attributes: [
        { trait_type: "", value: "" },
        { trait_type: "", value: "" },
        { trait_type: "", value: "" },
        { trait_type: "", value: "" },
        { trait_type: "", value: "" }
        ]
    }
  })

  const removeImage = (index: number) => {
    const image = form.watch('initialNft.image');
  }

  const onNftImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("No files selected")
      return
    }

    const file = e.target.files[0]

    if (!file.type.includes("image")) {
      toast.error("Only images are allowed")
      return
    }

    if (file.size > 10000000) {
      toast.error("File size is too large")
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      nftForm.setValue("imagePreview", reader.result as string)
    }

    nftForm.setValue("image", file)
  }

  const addNft = () => {
    nftForm.handleSubmit((data) => {
      const currentNft = form.watch("initialNft") || []

      if (currentNft.attributes.length < 5) {
        toast.error("5 Attributes are required !");
        return
      }


      form.setValue("initialNft", {...nftForm.getValues()});

      // Reset NFT form
      nftForm.reset({
        name: "",
        description: "",
        attributes: Array(5)
          .fill(null)
          .map(() => ({ trait_type: "", value: "" })),
      });

      toast.success(editingNftIndex !== null ? "NFT updated" : "NFT added")
      setActiveNftTab("list")
    })()
  }

  const editNft = (index: number) => {
    const nft = form.watch("initialNft");
  
    
    nftForm.setValue("name", nft.name);
    nftForm.setValue("description", nft.description);
    nftForm.setValue("image", nft.image);
    nftForm.setValue("imagePreview", nft.imagePreview);
    setEditingNftIndex(index)
    setActiveNftTab("editor")
  }

  const removeNft = (index: number) => {
 
    form.resetField('initialNft')
    toast.success("NFT removed")
  }

  const submitForm = async (data: CollectionFormValues) => {
    if (!isConnected) {
      toast.error("You have to connect your wallet first")
      return
    }

    try {
      // Step 1: Upload all images to IPFS
      const formData = new FormData()
      formData.append("file", data.initialNft.image!)
      formData.append("name", data.initialNft.name)
      formData.append("description", data.initialNft.description)

      const keyValues: Record<string, string> = {}
      data.initialNft.attributes.forEach((attribute) => {
        keyValues[attribute.trait_type] = attribute.value
      })

      formData.append("keyValues", JSON.stringify(keyValues))

      const uploadRequest = await fetch("/api/pinata/post", {
        method: "POST",
        body: formData,
      })

      const uploadResponse = await uploadRequest.json()

      if (uploadResponse.error) {
        throw new Error(`Error uploading image for NFT `)
      }

      const imageCID = uploadResponse.IpfsHash
      const imageURI = `ipfs://${imageCID}`

      // Upload metadata JSON
      const metadata = {
        name: data.initialNft.name,
        description: data.initialNft.description,
        image: imageURI,
        attributes: data.initialNft.attributes,
      }

      const metadataRequest = await fetch("/api/pinata/post", {
        method: "POST",
        body: JSON.stringify(metadata),
        headers: { "Content-Type": "application/json" },
      });

      const metadataResponse = await metadataRequest.json();

      if (metadataResponse.error) {
        throw new Error(`Error uploading metadata for NFT`);
      }

      const tokenURI = `ipfs://${metadataResponse.IpfsHash}`;

       console.log(address as `0x${string}`,
          tokenURI,
          imageURI,
          data.name)

      writeContract({
        address:factoryContractAddr as `0x${string}`,
        abi:factoryAbi,
        account: address as `0x${string}`,
        functionName: "createCollection",
        args: [
          data.name,
          data.symbol,
        {
          tokenName:form.watch('initialNft.name'),
          tokenURI:tokenURI,
          tokenImageURI:imageURI,
          description:form.watch('initialNft.description'),
        },
        form.watch('initialNft.attributes').map((attribute) => (attribute.trait_type )),
        form.watch('initialNft.attributes').map((attribute) => (attribute.value)), 
        ]
      })
    

      setStep(3) // Move to transaction step
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Error processing your request")
    }
  }

  const nextStep = () => {
    if (step === 0) {
      form.trigger(["name", "symbol"]).then((isValid) => {
        if (isValid) setStep(1)
      })
    } else if (step === 1) {
      form.trigger("initialNft").then((isValid) => {
        if (isValid) setStep(2)
      })
    } else {
      setStep(Math.min(step + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setStep(Math.max(step - 1, 0))
  }

  // Update transaction status based on contract interaction
  React.useEffect(() => {
    if (hash) {
      setTransactionDetails((prev) => ({ ...prev, hash }))
    }

    if (isConfirmed) {
      // In a real implementation, you would get the deployed contract address from the event logs
      setTransactionDetails((prev) => ({
        ...prev,
        contractAddress: "0x...", // This would come from the transaction receipt
      }))
    }
  }, [hash, isConfirmed])

  // Render the appropriate content based on the current step
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CollectionBasicInfoSection form={form} />
          </motion.div>
        )
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">NFT Creation</h3>
              <div className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white">
        Initial Token Creation !
              </div>
            </div>

            <Tabs value={activeNftTab} onValueChange={setActiveNftTab} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="list" className="flex-1">
                  NFT List
                </TabsTrigger>
                <TabsTrigger value="editor" className="flex-1">
                  NFT Editor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="mt-4">
                <NFTListSection form={form} editNft={editNft} removeNft={removeNft} setActiveNftTab={setActiveNftTab} />
              </TabsContent>

              <TabsContent value="editor" className="mt-4">
                <NFTEditorSection
                  nftForm={nftForm}
                  onNftImageSelect={onNftImageSelect}
                  addNft={addNft}
                  editingNftIndex={editingNftIndex}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Collection Summary</h3>
            <CollectionSummarySection form={form} />

            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-sm">
                By proceeding, you'll deploy a new NFT collection contract with the specified NFTs. This action cannot
                be undone once confirmed.
              </p>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionStatusSection
              isPending={isPending}
              isConfirming={isConfirming}
              isConfirmed={isConfirmed}
              error={confirmError}
              hash={transactionDetails.hash}
              contractAddress={transactionDetails.contractAddress}
              setStep={setStep}
              finalData={finalDeployedContractData}
            />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="self-start text-base bg-green-500 py-2 rounded-md transition-all max-w-40 w-full hover:bg-green-700 text-gray-900 hover:text-white">
        Mint Collection
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl bg-gray-700 max-h-[36rem] h-full  overflow-y-auto z-[999999999]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Create NFT Collection</DialogTitle>
          <DialogDescription>Deploy a new NFT collection with multiple assets to the blockchain</DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <Stepper
          steps={steps}
          activeStep={step}
          onStepClick={(idx) => {
            // Only allow clicking on completed steps
            if (idx <= step) {
              setStep(idx)
            }
          }}
          className="mb-6"
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-4 border-t border-gray-600">
              {step > 0 && step < 3 && (
                <Button type="button" variant="outline" onClick={prevStep} className="w-full sm:w-auto">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {step >= 0 && step < 2 && (
                <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === 2 && (
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                  disabled={isPending || isConfirming}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>Deploy Collection</>
                  )}
                </Button>
              )}

              {step === 3 && isConfirmed && !error && (
                <DialogClose asChild>
                  <Button className="w-full sm:w-auto">Close</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CollectionMinter

