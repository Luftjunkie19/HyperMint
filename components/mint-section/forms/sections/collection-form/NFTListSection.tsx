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
      {form.watch("initialNft").attributes.find((attr) => attr.trait_type.trim() !== "" && attr.value.trim() !== "") ? (
        <div className="space-y-4">
        
            <Card className="bg-gray-800 border-gray-700 rounded-lg">
              <CardHeader >
                <div className="flex justify-between items-center p-1">
                  <CardTitle className="text-white">{form.watch("initialNft").name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => editNft(3)}
                      className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNft(2)}
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-gray-700"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-gray-400 line-clamp-1">{form.watch("initialNft").description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-900">
                    {form.watch("initialNft").imagePreview && (
                      <Image
                        src={form.watch("initialNft").imagePreview || "/placeholder.svg"}
                        alt={form.watch("initialNft").name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium mb-1">Attributes:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {form.watch("initialNft").attributes.slice(0, 3).map((attr, idx) => (
                        <div key={idx} className="text-xs bg-gray-900 px-2 py-1 rounded">
                          <span className="text-blue-400">{attr.trait_type}:</span>
                          <span className="text-white ml-1">{attr.value}</span>
                        </div>
                      ))}
                      {form.watch("initialNft").attributes.length > 3 && (
                        <div className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400">
                          +{form.watch("initialNft").attributes.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
      
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

