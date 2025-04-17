
import { Input } from "@/components/ui/input";

interface OpenRouterKeyFormProps {
  apiKey: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OpenRouterKeyForm({ 
  apiKey, 
  onChange, 
  disabled = false
}: OpenRouterKeyFormProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground mb-2">
        Introduceți cheia API OpenRouter pentru a folosi modelele Claude și alte modele AI
      </div>
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="sk_or_..."
        className="font-mono text-sm"
        disabled={disabled}
      />
      <div className="text-xs text-muted-foreground">
        Puteți găsi cheia API în{" "}
        <a 
          href="https://openrouter.ai/keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Panoul de control OpenRouter
        </a>
      </div>
    </div>
  );
}
