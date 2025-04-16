
import { Input } from "@/components/ui/input";

interface DeepseekKeyFormProps {
  apiKey: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function DeepseekKeyForm({ apiKey, onChange, disabled }: DeepseekKeyFormProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="apiKey" className="text-sm font-medium">
        Cheia API Deepseek
      </label>
      <Input
        id="apiKey"
        type="password"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="sk_deepseek_..."
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground">
        Poți obține o cheie API de la{" "}
        <a
          href="https://platform.deepseek.com/"
          className="text-primary underline"
          target="_blank"
          rel="noreferrer"
        >
          Deepseek Platform
        </a>
      </p>
    </div>
  );
}
