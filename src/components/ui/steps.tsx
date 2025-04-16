
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface StepsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function Steps({ currentStep, totalSteps, className }: StepsProps) {
  return (
    <div className={cn("flex justify-between", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex flex-1 items-center">
          <div className="relative flex items-center justify-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                index <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-muted/50 text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index > 0 && (
              <div
                className={cn(
                  "absolute right-full h-[2px] w-full",
                  index <= currentStep ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={cn(
                "h-[2px] flex-1",
                index < currentStep ? "bg-primary" : "bg-muted",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
