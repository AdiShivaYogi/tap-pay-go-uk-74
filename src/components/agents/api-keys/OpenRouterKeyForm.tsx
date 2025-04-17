
import React from "react";
import { Input } from "@/components/ui/input";
import { FormDescription } from "@/components/ui/form";
import { AlertCircle } from "lucide-react";

interface OpenRouterKeyFormProps {
  apiKey: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OpenRouterKeyForm({ apiKey, onChange, disabled = false }: OpenRouterKeyFormProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <label htmlFor="api-key" className="text-sm font-medium">
          Cheie API OpenRouter
        </label>
        <Input
          id="api-key"
          type="password"
          autoComplete="off"
          value={apiKey}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Introduceți cheia API OpenRouter (începe cu sk_or_...)"
          className="font-mono"
          disabled={disabled}
        />
      </div>
      
      <FormDescription className="flex items-center gap-2 text-xs">
        <AlertCircle className="h-3 w-3" />
        <span>Cheia API nu este stocată în browser, ci direct în Supabase Secrets.</span>
      </FormDescription>
    </div>
  );
}
