"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

// Update the StepperProps interface to make steps optional with a default value
interface StepperProps {
  steps?: string[]
  activeStep: number
  onStepClick?: (step: number) => void
  className?: string
}

// Add a default value for steps and add a null check before mapping
export function Stepper({ steps = [], activeStep, onStepClick, className }: StepperProps) {
  return (
    <div className={cn("w-full mb-6", className)}>
      <div className="flex justify-between items-center">
        {steps && steps.length > 0 ? (
          steps.map((stepName, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onStepClick?.(idx)}
                  disabled={idx > activeStep}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    activeStep === idx
                      ? "bg-blue-600 text-white"
                      : activeStep > idx
                        ? "bg-green-600 text-white cursor-pointer"
                        : "bg-gray-800 text-gray-400 cursor-not-allowed",
                  )}
                >
                  {activeStep > idx ? <Check size={16} /> : idx + 1}
                </button>
                <span
                  className={cn(
                    "text-xs mt-1",
                    activeStep === idx ? "text-blue-400" : activeStep > idx ? "text-green-400" : "text-gray-500",
                  )}
                >
                  {stepName}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div className={cn("flex-1 h-1 mx-2", activeStep > idx ? "bg-green-600" : "bg-gray-800")} />
              )}
            </React.Fragment>
          ))
        ) : (
          <div>No steps provided</div>
        )}
      </div>
    </div>
  )
}

