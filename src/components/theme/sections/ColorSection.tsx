
import { theme } from "@/config/theme";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function ColorSection() {
  const colorKeys = Object.keys(theme.colors) as Array<keyof typeof theme.colors>;

  return (
    <div className="space-y-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Vizualizați și testați culorile temei. Modificările se reflectă în timp real.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {colorKeys.map((key) => (
          <div key={key} className="space-y-2">
            <Label className="text-sm capitalize">{key}</Label>
            <div 
              className="h-20 rounded-lg border-2"
              style={{ backgroundColor: `hsl(var(--${key}))` }}
            />
            <code className="text-xs block bg-muted p-2 rounded">
              {theme.colors[key]}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
