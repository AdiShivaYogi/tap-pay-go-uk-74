
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { StyledCard } from "@/components/ui/cards";
import { CssEditor } from "./components/CssEditor";

interface GlobalCssManagerProps {
  initialCss?: string;
  onCssUpdate: (css: string) => void;
}

export const GlobalCssManager: React.FC<GlobalCssManagerProps> = ({ initialCss = "", onCssUpdate }) => {
  const [css, setCss] = useState(initialCss);

  const handleCssChange = (newCss: string) => {
    setCss(newCss);
  };

  const handleApplyCss = () => {
    onCssUpdate(css);
  };

  const handleResetCss = () => {
    setCss("");
    onCssUpdate("");
  };

  return (
    <StyledCard variant="default" className="space-y-4">
      <h2 className="text-xl font-semibold">Gestionează CSS Global</h2>
      <p className="text-muted-foreground">
        Editează stilurile CSS globale pentru a personaliza aspectul aplicației.
      </p>

      <CssEditor css={css} onChange={handleCssChange} />

      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={handleResetCss}>
          Resetează
        </Button>
        <Button onClick={handleApplyCss}>Aplică</Button>
      </div>
    </StyledCard>
  );
};
