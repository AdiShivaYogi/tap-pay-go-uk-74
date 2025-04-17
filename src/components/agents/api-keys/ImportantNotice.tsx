
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ImportantNotice() {
  return (
    <Alert variant="warning" className="bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-amber-700 text-sm">
        <p className="font-medium mb-1">Cheile API sunt confidențiale</p>
        <p>
          Nu distribuiți niciodată cheia API și nu o includeți în cod. 
          Cheile sunt stocate în siguranță în Supabase Secrets și nu în browser.
        </p>
      </AlertDescription>
    </Alert>
  );
}
