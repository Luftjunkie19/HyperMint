"use client"
import { z } from "zod"
import Image from "next/image"
import type React from "react"
import { useRef, useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DialogHeader, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Check, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { holeskyAbi, holeskyContractHash } from "@/contract/abi/holeskyAbi"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Stepper } from "@/components/Stepper"

// Import section components
import { NFTBasicInfoSection } from "./sections/token-form/NftBasicInfoSection"
import { NFTImageUploadSection } from "./sections/token-form/NftImageUploadSection"
import { NftTraitsSection } from "./sections/token-form/NftTraitsSection"

export const formNFTSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(25, { message: "Name must be at most 25 characters long." }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." })
    .max(300, { message: "Description must be at most 300 characters long." }),
  image: z
    .any()
    .refine((file) => file?.size <= 10000000, `Max image size is 10MB.`)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file?.type),
      "Only .jpg, .jpeg, .png, .gif and .webp formats are supported.",
    ),
  imagePreview: z.string(),
  attributes: z
    .array(
      z.object({
        trait_type: z
          .string()
          .min(2, { message: "Trait type must be at least 2 characters long." })
          .max(16, { message: "Trait type must be at most 25 characters long." }),
        value:  z
          .string().min(1, { message: "Value must be at least 1 characters long." }).max(24, { message: "Value must be at most 24 characters long." }),
      }),
    )
    .length(5, { message: "Must have exactly 5 attributes" }),
})

// Export the NFTFormValues type so it can be used in the section components
export type NFTFormValues = z.infer<typeof formNFTSchema>

function TokenMinter() {
  const { isConnected, address } = useAccount()
  const { data: hash, isPending, writeContract, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed, error:confirmError,
    errorUpdateCount, isLoadingError, isError:isConfirmError, data:confirmData, failureReason, failureCount

  } = useWaitForTransactionReceipt({

    hash,

  })

  const [step, setStep] = useState(0)
  const steps = ["Data Entry", "File Upload", "NFT-Attributes",  "Confirmation", "Transaction"]

  const form = useForm<NFTFormValues>({
    resolver: zodResolver(formNFTSchema),
    defaultValues: {
      'attributes': Array(5).fill(null, 0, 5).map(() => ({ trait_type: "", value: "" })),
    }
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      form.setValue("imagePreview", reader.result as string)
    }

    form.setValue("image", file)
  }

  const submitForm = async (data: NFTFormValues) => {
    console.log(data);
    if (!isConnected) {
      toast.error("You have to connect your wallet first")
      return
    }

    // Step 1: Upload Image to IPFS
    const formData = new FormData()
    formData.append("file", data.image!)
    formData.append("name", data.name)
    formData.append("description", data.description)

    const keyValues: Record<string, string> = {}
    data.attributes.forEach((attribute) => {
      keyValues[attribute.trait_type] = attribute.value
    })

    formData.append("keyValues", JSON.stringify(keyValues))

    try {
      const uploadRequest = await fetch("/api/pinata/post", {
        method: "POST",
        body: formData,
      })

      const uploadResponse = await uploadRequest.json()

      if (uploadResponse.error) {
        toast.error("Error uploading image")
        return
      }

      const imageCID = uploadResponse.IpfsHash
      const imageURI = `ipfs://${imageCID}`

      // Step 2: Upload Metadata JSON to IPFS
      const metadata = {
        name: data.name,
        description: data.description,
        image: imageURI,
        attributes: data.attributes,
      }

      const metadataRequest = await fetch("/api/pinata/post", {
        method: "POST",
        body: JSON.stringify(metadata),
        headers: { "Content-Type": "application/json" },
      })

      const metadataResponse = await metadataRequest.json()

      if (metadataResponse.error) {
        toast.error("Error uploading metadata")
        return
      }

      const tokenURI = `ipfs://${metadataResponse.IpfsHash}`

      // Step 3: Mint NFT
      writeContract({
        abi: holeskyAbi,
        address: holeskyContractHash as `0x${string}`,
        functionName: "mintNFT",
        account: address,
        args: [
          address as `0x${string}`,
          tokenURI,
          imageURI,
          data.name,
          data.description,
          data.attributes.map((attribute) => attribute.trait_type) as [string, string, string, string, string],
          data.attributes.map((attribute) => attribute.value) as [string, string, string, string, string],
        ],
      })

      setStep(4) // Move to transaction step
    } catch (err) {
      console.log(err)
      toast.error("Error processing your request")
    }
  }

  const nextStep = () => {
    if (step === 0) {

  Promise.all([
        form.trigger("name"),
      form.trigger("description"),
  ])
      .then((results) => {
        if (!results.find((item)=>!item)) setStep(1)
      });

      
    } else {
      setStep(Math.min(step + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setStep(Math.max(step - 1, 0))
  }

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
            <NFTBasicInfoSection form={form} />
           
          </motion.div>
        )
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >

            <NFTImageUploadSection form={form} inputRef={inputRef} onImageSelect={onImageSelect} />
          </motion.div>
       
        )
      case 2: return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >

        <NftTraitsSection form={form} />    
          </motion.div>
      )
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Confirm Your NFT Details</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-2">Preview</h4>
                <div className="bg-gray-900 rounded-lg overflow-hidden h-60 flex items-center justify-center">
                  {form.watch("imagePreview") ? (
                    <Image
                      src={form.watch("imagePreview") || "/placeholder.svg"}
                      alt="NFT Preview"
                      width={240}
                      height={240}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <p className="text-gray-500">No image uploaded</p>
                  )}
                </div>
              </div>

              <div className="space-y-4 self-end">
                <div>
                  <h4 className="text-white font-semibold">Name</h4>
                  <p className="text-gray-300">{form.watch("name")}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold">Description</h4>
                  <p className="text-gray-300 line-clamp-1 hover:text-blue-500 transition-all cursor-pointer">{form.watch("description")}</p>
                </div>

              </div>
            </div>
                <div className="">
                  <h4 className="text-white font-semibold">Attributes</h4>
                  <div className="grid grid-cols-3 gap-2 mt-2 max-w-  w-full">
                    {form.watch("attributes")?.map((attr, idx) => (
                      <div key={idx} className="bg-gray-800 p-2 flex items-center justify-between rounded-md">
                        <span className="text-blue-400 text-sm">{attr.trait_type}:</span>
                        <span className="text-white font-semibold">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-sm">
                By proceeding, you'll initiate a blockchain transaction to mint this NFT. This action cannot be undone
                once confirmed.
              </p>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 py-4"
          >
            <h3 className="text-xl font-bold text-white text-center">Transaction Status</h3>

            <div className="flex flex-col items-center justify-center py-8">
              {isPending && !isConfirming && (
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={48} className="animate-spin text-blue-500" />
                    </div>
                  </div>
                  <p className="text-white text-lg">Minting your NFT...</p>
                  <p className="text-gray-400 text-sm">Please confirm the transaction in your wallet</p>
                </div>
              )}

              {isConfirming && !isConfirmed && (
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={48} className="animate-spin text-yellow-500" />
                    </div>
                  </div>
                  <p className="text-white text-lg">Transaction Confirmed</p>
                  <p className="text-gray-400 text-sm">Waiting for blockchain confirmation...</p>
                </div>
              )}

              {isConfirmed && (
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto bg-green-900/20 rounded-full flex items-center justify-center">
                    <Check size={48} className="text-green-500" />
                  </div>
                  <p className="text-white text-lg">Success!</p>
                  <p className="text-gray-400 text-sm">Your NFT has been minted successfully</p>

                  {hash && (
                    <a
                      href={`https://holeskyscan.io/tx/${hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline text-sm"
                    >
                      View on Explorer
                    </a>
                  )}
                </div>
              )}

              {error
              && (
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto bg-red-900/20 rounded-full flex items-center justify-center">
                    <X size={48} className="text-red-500" />
                  </div>
                  <p className="text-white text-lg">Transaction Failed</p>
                  
                  <p className="text-red-400 text-sm">Simple Error{
                    error.name
                  }
                  

                  </p>
                </div>
              )}

              
              {confirmError
              && (
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto bg-red-900/20 rounded-full flex items-center justify-center">
                    <X size={48} className="text-red-500" />
                  </div>
                  <p className="text-white text-lg">Transaction Failed</p>
                  <p className="text-red-400 text-sm ">{" "} {
                   confirmError.name
                  }
                  

                  </p>

                    <p className="text-red-400 text-sm ">ConfirmError: {" "} {
                   JSON.stringify(confirmError.cause)
                  }
                  <p>{JSON.stringify({...failureReason, failureCount})}</p>
                   

                  </p>
                </div>
              )}
              
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="self-start text-base bg-green-500 py-2 rounded-md transition-all max-w-32 w-full hover:bg-green-700 text-gray-900 hover:text-white">
        Mint Asset
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl max-h-[36rem] h-full  overflow-y-auto bg-gray-700 z-[999999999]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Mint Your NFT</DialogTitle>
          <DialogDescription>
            Create a unique NFT with custom properties and mint it to the blockchain
          </DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <Stepper steps={steps} activeStep={step} className="mb-6" />

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

              {step >= 0 && step < 4 && (
                <Button type="button" onClick={nextStep} className="w-full sm:w-auto">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === 3 && (
                <Button
                  type="submit"
                  className="w-full self-end  sm:w-auto bg-green-600 hover:bg-green-700"
                  disabled={isPending || isConfirming}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    <>Mint NFT</>
                  )}
                </Button>
              )}

              {step === 3 && isConfirmed && !error && (
                <DialogClose asChild>
                  <Button className="w-full sm:w-auto">Close</Button>
                </DialogClose>
              )}

              {step === 3 && error && (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                  Try Again
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TokenMinter

