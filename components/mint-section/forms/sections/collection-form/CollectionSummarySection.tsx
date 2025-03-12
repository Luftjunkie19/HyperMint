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
          <div className="col-span-2">
            <p className="text-gray-400 text-sm">Description</p>
            <p className="text-white">{form.watch("description")}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2 border-b border-gray-700 pb-2">Collection Images</h4>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {form.watch("images")?.map((image, index) => (
            <div key={index} className="aspect-square">
              <Image
                src={image.preview || "/placeholder.svg"}
                alt={`Collection Image ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2 border-b border-gray-700 pb-2">
          NFTs in Collection ({form.watch("nfts")?.length})
        </h4>
        <div className="space-y-4">
          {form.watch("nfts")?.map((nft, index) => (
            <div key={index} className="flex gap-3 border-b border-gray-700 pb-3 last:border-0 last:pb-0">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-900 flex-shrink-0">
                {nft.imagePreview && (
                  <Image
                    src={nft.imagePreview || "/placeholder.svg"}
                    alt={nft.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h5 className="text-white font-medium">{nft.name}</h5>
                <p className="text-gray-400 text-sm line-clamp-1">{nft.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {nft.attributes.slice(0, 3).map((attr, idx) => (
                    <span key={idx} className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-blue-400">
                      {attr.trait_type}: {attr.value}
                    </span>
                  ))}
                  {nft.attributes.length > 3 && (
                    <span className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-gray-400">
                      +{nft.attributes.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

