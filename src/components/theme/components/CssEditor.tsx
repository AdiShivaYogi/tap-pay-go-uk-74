
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface CssEditorProps {
  css: string;
  onChange: (css: string) => void;
}

export const CssEditor: React.FC<CssEditorProps> = ({ css, onChange }) => {
  return (
    <div className="border rounded-md">
      <Textarea
        className="font-mono text-sm h-48 resize-none p-4"
        value={css}
        onChange={(e) => onChange(e.target.value)}
        placeholder=":root { --primary-color: #0070f3; }"
      />
    </div>
  );
};
