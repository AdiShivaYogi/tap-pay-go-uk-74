
import { theme } from "@/config/theme";

export function SpacingSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Spațiere Predefinită</h3>
        
        <div className="space-y-4">
          <div className="border rounded p-4">
            <div className={theme.spacing.section + " border border-dashed border-primary/50"}>
              <div className="h-20 bg-primary/10 rounded flex items-center justify-center">
                Section Spacing
              </div>
            </div>
            <code className="text-sm text-muted-foreground mt-2 block">
              theme.spacing.section
            </code>
          </div>

          <div className="border rounded p-4">
            <div className={theme.spacing.container + " border border-dashed border-primary/50"}>
              <div className="h-20 bg-primary/10 rounded flex items-center justify-center">
                Container Spacing
              </div>
            </div>
            <code className="text-sm text-muted-foreground mt-2 block">
              theme.spacing.container
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
