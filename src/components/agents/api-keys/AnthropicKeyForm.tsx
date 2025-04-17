
import { Input } from "@/components/ui/input";

interface AnthropicKeyFormProps {
  apiKey: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AnthropicKeyForm({ 
  apiKey, 
  onChange, 
  disabled = false
}: AnthropicKeyFormProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground mb-2">
        Introduceți cheia API Anthropic pentru a folosi modelele Claude în agenții autonomi
      </div>
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="sk-ant-..."
        className="font-mono text-sm"
        disabled={disabled}
      />
      <div className="text-xs text-muted-foreground">
        Puteți găsi cheia API în{" "}
        <a 
          href="https://console.anthropic.com/settings/keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Panoul de control Anthropic
        </a>
      </div>
    </div>
  );
}
