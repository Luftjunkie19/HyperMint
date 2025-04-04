"use client"
import { Check, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WaitForTransactionReceiptErrorType } from "viem"

interface TransactionStatusSectionProps {
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  error: WaitForTransactionReceiptErrorType  | null
  hash?: string
  contractAddress?: string
  setStep: (step: number) => void,
  finalData: {
    contractAddress: `0x${string}`;
    symbol: string;
    name: string;
  } | undefined
} 

export function TransactionStatusSection({
  isPending,
  isConfirming,
  isConfirmed,
  error,
  hash,finalData,
  contractAddress,
  setStep,
}: TransactionStatusSectionProps) {
  return (
    <div className="space-y-6 py-4">
      <h3 className="text-xl font-bold text-white text-center">Transaction Status</h3>

      <div className="flex flex-col items-center justify-center py-8">
        {isPending && (
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={48} className="animate-spin text-blue-500" />
              </div>
            </div>
            <p className="text-white text-lg">Deploying Collection...</p>
            <p className="text-gray-400 text-sm">Please confirm the transaction in your wallet</p>
          </div>
        )}

        {isConfirming && (
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
            <p className="text-gray-400 text-sm">Your NFT collection has been deployed successfully</p>

            <div className="w-full space-y-2 text-left">

              {finalData && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Name</span>
                  <code className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
                    {finalData.name}
                  </code>
                  <span className="text-sm font-medium text-white mt-2">Symbol</span> 
                  <code className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
                    {finalData.symbol}
                  </code>
                </div>
              )
              }


              {hash && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Transaction Hash</span>
                  <code className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">{hash}</code>
                  <a
                    href={`https://holeskyscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline text-sm mt-1"
                  >
                    View on Explorer
                  </a>
                </div>
              )}

              {finalData && (
                <div className="flex flex-col mt-3">
                  <span className="text-sm font-medium text-white">Contract Address</span>
                  <code className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
                    {finalData.contractAddress}
                  </code>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto bg-red-900/20 rounded-full flex items-center justify-center">
              <X size={48} className="text-red-500" />
            </div>
            <p className="text-white text-lg">Transaction Failed</p>
          <p className="text-red-400 text-sm ">ConfirmError: {" "} {
                   JSON.stringify({details: (error.cause as any).details, version: (error.cause as any).version,  shortMessage: (error.cause as any).shortMessage})  
                  }</p>
                  

            <Button type="button" variant="outline" onClick={() => setStep(2)} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

