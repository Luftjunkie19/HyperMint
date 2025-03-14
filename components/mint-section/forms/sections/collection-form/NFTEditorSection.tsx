"use client"

import type React from "react"
import type { UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Inbox } from "lucide-react"
import Image from "next/image"
import type { CollectionFormValues } from "../../CollectionMinter"
import { NFTFormValues } from "../../TokenMinter"

interface NFTEditorSectionProps {
  nftForm: UseFormReturn<NFTFormValues>
  onNftImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  addNft: () => void
  editingNftIndex: number | null
}

export function NFTEditorSection({ nftForm, onNftImageSelect, addNft, editingNftIndex }: NFTEditorSectionProps) {
  return (
    <Form {...nftForm}>
      <form className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">NFT Details</h3>

          <FormField
            control={nftForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">NFT Name</FormLabel>
                <FormControl>
                  <Input className="text-white" {...field} placeholder="Enter NFT Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nftForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">NFT Description</FormLabel>
                <FormControl>
                  <Textarea  className="resize-none text-white h-20" {...field} placeholder="Enter NFT Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">NFT Image</h3>

          <FormField
            control={nftForm.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="text-white font-semibold">NFT Image</FormLabel>
                <FormControl>
                  <div
                    onClick={() => document.getElementById("nft-image-input")?.click()}
                    className="max-w-full cursor-pointer rounded-lg w-full h-40 bg-gray-900 flex flex-col gap-2 items-center justify-evenly border-2 border-dashed border-gray-700 hover:border-gray-500 transition-colors"
                  >
                    {nftForm.watch("imagePreview") ? (
                      <Image
                        src={nftForm.watch("imagePreview") || "/placeholder.svg"}
                        alt="NFT Preview"
                        width={160}
                        height={160}
                        className="w-full h-full rounded-lg object-contain p-2"
                      />
                    ) : (
                      <>
                        <p className="text-white text-lg font-semibold">Drag and Drop</p>
                        <Inbox size={32} className="text-gray-400" />
                        <p className="text-xs text-blue-400">*Upload any image up to 10 MB</p>
                      </>
                    )}
                    <input
                      id="nft-image-input"
                      {...nftForm.register("image")}
                      onChange={onNftImageSelect}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">
            NFT Attributes (5 required)
          </h3>

          <div className="space-y-3">
            {nftForm.watch("attributes")?.map((_, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <FormField
           
                  control={nftForm.control}
                  name={`attributes.${index}.trait_type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                     
                          placeholder={`Trait ${index + 1} Type`}
                          className="bg-gray-900 text-white border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={nftForm.control}
                  name={`attributes.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Trait ${index + 1} Value`}
                          className="bg-gray-900 text-white border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-400 mt-2">
            All 5 attributes are required. Examples: Power/100, Rarity/77, etc.
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={addNft} className="bg-blue-600 hover:bg-blue-700">
            {editingNftIndex !== null ? "Update NFT" : "Add NFT"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

