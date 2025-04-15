
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LayoutTabProps {
  onStyleChange: (property: string, value: string) => void;
}

export function LayoutTab({ onStyleChange }: LayoutTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Container Max Width</Label>
        <Input 
          type="range" 
          min="768" 
          max="1920" 
          step="64"
          defaultValue="1280"
          onChange={(e) => {
            const css = `.container { max-width: ${e.target.value}px; }`;
            onStyleChange('.container', css);
          }}
        />
      </div>
      <div>
        <Label>Gap Size</Label>
        <Input 
          type="range" 
          min="4" 
          max="16" 
          defaultValue="8"
          onChange={(e) => {
            const css = `:root { --gap: ${e.target.value}px; }`;
            onStyleChange(':root', css);
          }}
        />
      </div>
    </div>
  );
}
