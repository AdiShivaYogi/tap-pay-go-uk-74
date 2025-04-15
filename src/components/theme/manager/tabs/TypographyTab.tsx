
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TypographyTabProps {
  onStyleChange: (property: string, value: string) => void;
}

export function TypographyTab({ onStyleChange }: TypographyTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Font Size Base</Label>
        <Input 
          type="range" 
          min="12" 
          max="20" 
          defaultValue="16"
          onChange={(e) => {
            const css = `html { font-size: ${e.target.value}px; }`;
            onStyleChange('html', css);
          }}
        />
      </div>
      <div>
        <Label>Line Height</Label>
        <Input 
          type="range" 
          min="1" 
          max="2" 
          step="0.1"
          defaultValue="1.5"
          onChange={(e) => {
            const css = `body { line-height: ${e.target.value}; }`;
            onStyleChange('body', css);
          }}
        />
      </div>
    </div>
  );
}
