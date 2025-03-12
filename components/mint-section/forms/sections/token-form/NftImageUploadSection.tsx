"use client"

import type React from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Inbox } from "lucide-react"
import Image from "next/image"
import type { NFTFormValues } from "../../TokenMinter"

interface NFTImageUploadSectionProps {
  form: UseFormReturn<NFTFormValues>
  inputRef: React.RefObject<HTMLInputElement>
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function NFTImageUploadSection({ form, inputRef, onImageSelect }: NFTImageUploadSectionProps) {
  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">NFT Image</h3>

      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem>
            <FormLabel className="text-white font-semibold">Source File</FormLabel>
            <FormControl>
              <div
                onClick={() => inputRef.current?.click()}
                className="max-w-full cursor-pointer rounded-lg w-full h-60 bg-gray-900 flex flex-col gap-2 items-center justify-evenly border-2 border-dashed border-gray-700 hover:border-gray-500 transition-colors"
              >
                {form.watch("imagePreview") ? (
                  <Image
                    src={form.watch("imagePreview") || "/placeholder.svg"}
                    alt="NFT Preview"
                    width={240}
                    height={240}
                    className="w-full h-full rounded-lg object-contain p-2"
                  />
                ) : (
                  <>
                    <p className="text-white text-2xl font-semibold">Drag and Drop</p>
                    <Inbox size={48} className="text-gray-400" />
                    <p className="text-xs text-blue-400">*Upload any image up to 10 MB</p>
                  </>
                )}
                <input
                  {...form.register("image")}
                  onChange={onImageSelect}
                  ref={inputRef}
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
  )
}

