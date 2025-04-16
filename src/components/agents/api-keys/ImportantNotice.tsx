
import { AlertTriangle } from "lucide-react";

export function ImportantNotice() {
  return (
    <div className="bg-amber-50 border-amber-200 border p-3 rounded-md flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-amber-800">
        <p className="font-medium">Important</p>
        <p>Cheia API va fi stocată securizat și nu va fi expusă în frontend.</p>
      </div>
    </div>
  );
}
