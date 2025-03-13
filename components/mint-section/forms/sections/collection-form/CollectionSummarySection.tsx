import type { UseFormReturn } from "react-hook-form"
import Image from "next/image"
import type { CollectionFormValues } from "../../CollectionMinter"

interface CollectionSummarySectionProps {
  form: UseFormReturn<CollectionFormValues>
}

export function CollectionSummarySection({ form }: CollectionSummarySectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2 border-b border-gray-700 pb-2">Collection Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-white">{form.watch("name")}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Symbol</p>
            <p className="text-white">{form.watch("symbol")}</p>
          </div>
        
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2 border-b border-gray-700 pb-2">Collection Images</h4>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
         
            <div className="aspect-square">
              <Image
                src={form.watch('initialNft').imagePreview || "/placeholder.svg"}
                alt={`Collection Image Preview`}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
  
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2 border-b border-gray-700 pb-2">
          Initial NFT in Collection
        </h4>
        <div className="space-y-4">
      
            <div  className="flex gap-3 border-b border-gray-700 pb-3 last:border-0 last:pb-0">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-900 flex-shrink-0">
                {form.watch('initialNft').imagePreview && (
                  <Image
                    src={form.watch('initialNft').imagePreview || "/placeholder.svg"}
                    alt={form.watch('initialNft').name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h5 className="text-white font-medium">{form.watch('initialNft').name}</h5>
                <p className="text-gray-400 text-sm line-clamp-1">{form.watch('initialNft').description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {form.watch('initialNft').attributes.slice(0, 3).map((attr, idx) => (
                    <span key={idx} className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-blue-400">
                      {attr.trait_type}: {attr.value}
                    </span>
                  ))}
                  {form.watch('initialNft').attributes.length > 3 && (
                    <span className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-gray-400">
                      +{form.watch('initialNft').attributes.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
       
        </div>
      </div>
    </div>
  )
}

