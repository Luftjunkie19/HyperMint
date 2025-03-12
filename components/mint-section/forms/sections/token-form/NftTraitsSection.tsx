import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { NFTFormValues } from "../../TokenMinter"

interface NftTraitsSectionProps {
  form: UseFormReturn<NFTFormValues>
}

export function NftTraitsSection({ form }: NftTraitsSectionProps) {
  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">NFT Attributes (5 required)</h3>

      <div className="space-y-4">
        {form.watch("attributes")?.map((_, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name={`attributes.${index}.trait_type`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder={`Trait ${index + 1} Type`} className="bg-gray-900 border-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`attributes.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Trait ${index + 1} Value`}
                      className="bg-gray-900 border-gray-700"
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
        All 5 attributes are required. Examples: Background/Blue, Rarity/Legendary, etc.
      </div>
    </div>
  )
}
