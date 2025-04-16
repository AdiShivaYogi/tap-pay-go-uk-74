
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Check } from "lucide-react";

export const UKComplianceAlert: React.FC = () => {
  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-blue-700 flex items-start">
        <div className="space-y-2">
          <p className="font-medium">
            TapPayGo este optimizat pentru piața UK și este în conformitate cu reglementările locale.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Conformitate GDPR</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Procesare în GBP</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Strong Customer Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">Stripe Connect UK Ready</span>
            </div>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
