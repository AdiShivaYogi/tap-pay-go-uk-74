
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ImportantNotice() {
  return (
    <Alert variant="warning" className="bg-amber-50 border-amber-200">
      <InfoIcon className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800 text-sm">
        <p className="font-medium">Important:</p>
        <p>Cheia API va fi stocată în siguranță în edge functions Supabase și nu va fi expusă în frontend.</p>
      </AlertDescription>
    </Alert>
  );
}
