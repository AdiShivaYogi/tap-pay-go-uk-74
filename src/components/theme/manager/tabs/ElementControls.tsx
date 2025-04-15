
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ElementControlsProps {
  activeStyles: { [key: string]: string };
  onStyleChange: (property: string, value: string) => void;
}

export function ElementControls({ activeStyles, onStyleChange }: ElementControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Culoare Text</Label>
        <Input 
          type="color" 
          value={activeStyles.color || "#000000"}
          onChange={(e) => onStyleChange('color', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Culoare Fundal</Label>
        <Input 
          type="color" 
          value={activeStyles.backgroundColor || "#ffffff"}
          onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Dimensiune Font ({activeStyles.fontSize})</Label>
        <Input 
          type="range" 
          min="8" 
          max="32" 
          value={parseInt(activeStyles.fontSize) || 16}
          onChange={(e) => onStyleChange('fontSize', `${e.target.value}px`)}
        />
      </div>
      <div className="space-y-2">
        <Label>Grosime Font ({activeStyles.fontWeight})</Label>
        <Input 
          type="range" 
          min="100" 
          max="900" 
          step="100"
          value={activeStyles.fontWeight || 400}
          onChange={(e) => onStyleChange('fontWeight', e.target.value)}
        />
      </div>
    </div>
  );
}
