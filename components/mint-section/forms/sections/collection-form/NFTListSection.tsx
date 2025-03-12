"use client"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"
import type { CollectionFormValues } from "../../CollectionMinter"

interface NFTListSectionProps {
  form: UseFormReturn<CollectionFormValues>
  editNft: (index: number) => void
  removeNft: (index: number) => void
  setActiveNftTab: (value: string) => void
}

export function NFTListSection({ form, editNft, removeNft, setActiveNftTab }: NFTListSectionProps) {
  return (
    <div className="space-y-4">
      {form.watch("nfts")?.length > 0 ? (
        <div className="space-y-4">
          {form.watch("nfts").map((nft, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white">{nft.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => editNft(index)}
                      className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNft(index)}
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-gray-700"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-gray-400 line-clamp-2">{nft.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-900">
                    {nft.imagePreview && (
                      <Image
                        src={nft.imagePreview || "/placeholder.svg"}
                        alt={nft.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium mb-1">Attributes:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {nft.attributes.slice(0, 3).map((attr, idx) => (
                        <div key={idx} className="text-xs bg-gray-900 px-2 py-1 rounded">
                          <span className="text-blue-400">{attr.trait_type}:</span>
                          <span className="text-white ml-1">{attr.value}</span>
                        </div>
                      ))}
                      {nft.attributes.length > 3 && (
                        <div className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">
                          +{nft.attributes.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-800 rounded-md">
          <p className="text-gray-400">No NFTs added yet</p>
          <Button variant="outline" onClick={() => setActiveNftTab("editor")} className="mt-4">
            <Plus size={16} className="mr-2" />
            Add NFT
          </Button>
        </div>
      )}
    </div>
  )
}

