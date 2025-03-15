import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { CollectionFormValues } from "../../CollectionMinter"

interface CollectionBasicInfoSectionProps {
  form: UseFormReturn<CollectionFormValues>
}

export function CollectionBasicInfoSection({ form }: CollectionBasicInfoSectionProps) {
  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">Collection Information</h3>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white font-semibold">Collection Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Collection Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="symbol"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white font-semibold">Collection Symbol</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Collection Symbol (e.g. BTC)" />
            </FormControl>
            <FormDescription className="text-gray-400 text-xs">
              A short identifier for your collection (3-6 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

 
    </div>
  )
}

