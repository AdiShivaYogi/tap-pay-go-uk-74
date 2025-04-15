
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CssEditorProps {
  css: string;
  onChange: (value: string) => void;
  onApply: () => void;
}

export function CssEditor({ css, onChange, onApply }: CssEditorProps) {
  return (
    <div className="space-y-4">
      <Label>CSS Personalizat</Label>
      <Textarea 
        value={css}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Introduceți CSS personalizat aici..."
        className="font-mono text-sm h-32"
      />
      <Button onClick={onApply} className="w-full">
        Aplică Modificările
      </Button>
    </div>
  );
}
