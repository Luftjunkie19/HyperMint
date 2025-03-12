import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import  { NFTFormValues } from "../../TokenMinter";

interface NFTBasicInfoSectionProps {
  form: UseFormReturn<NFTFormValues>
}

export function NFTBasicInfoSection({ form }: NFTBasicInfoSectionProps) {
  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">Basic Information</h3>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white font-semibold">NFT Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter NFT Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white font-semibold">NFT Description</FormLabel>
            <FormControl>
              <Textarea className="resize-none h-20" {...field} placeholder="Enter NFT Description" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

