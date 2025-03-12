"use client"

import type React from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, X } from "lucide-react"
import Image from "next/image"
import type { CollectionFormValues } from "../../CollectionMinter"

interface CollectionImagesSectionProps {
  form: UseFormReturn<CollectionFormValues>
  imageInputRef: React.RefObject<HTMLInputElement>
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeImage: (index: number) => void
}

export function CollectionImagesSection({
  form,
  imageInputRef,
  onImageSelect,
  removeImage,
}: CollectionImagesSectionProps) {
  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">Collection Images</h3>

      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel className="text-white font-semibold">Collection Images (Max 5)</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {form.watch("images")?.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image.preview || "/placeholder.svg"}
                        alt={`Collection Image ${index + 1}`}
                        width={120}
                        height={120}
                        className="w-full h-24 object-cover rounded-md border border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {(form.watch("images")?.length || 0) < 5 && (
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full h-24 border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center hover:border-gray-500 transition-colors"
                    >
                      <Plus size={24} className="text-gray-400" />
                      <span className="text-gray-400 text-sm mt-1">Add Image</span>
                    </button>
                  )}
                </div>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onImageSelect}
                  className="hidden"
                />
              </div>
            </FormControl>
            <FormDescription className="text-gray-400 text-xs">
              Upload up to 5 images for your collection
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

