
import { Input } from "@/components/ui/input";

interface OpenRouterKeyFormProps {
  apiKey: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function OpenRouterKeyForm({ apiKey, onChange, disabled }: OpenRouterKeyFormProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="apiKey" className="text-sm font-medium">
        Cheia API OpenRouter
      </label>
      <Input
        id="apiKey"
        type="password"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="sk-or-..."
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground">
        Poți obține o cheie API de la{" "}
        <a
          href="https://openrouter.ai/keys"
          className="text-primary underline"
          target="_blank"
          rel="noreferrer"
        >
          OpenRouter
        </a>
      </p>
    </div>
  );
}
