
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorsTabProps {
  onStyleChange: (property: string, value: string) => void;
}

export function ColorsTab({ onStyleChange }: ColorsTabProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Culoare Primară</Label>
        <Input 
          type="color" 
          value="#9b87f5"
          onChange={(e) => {
            const css = `:root { --primary: ${e.target.value}; }`;
            onStyleChange(':root', css);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Culoare Secundară</Label>
        <Input 
          type="color" 
          value="#7E69AB"
          onChange={(e) => {
            const css = `:root { --secondary: ${e.target.value}; }`;
            onStyleChange(':root', css);
          }}
        />
      </div>
    </div>
  );
}
