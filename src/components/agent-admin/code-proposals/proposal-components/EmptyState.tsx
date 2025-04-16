
import React from "react";
import { Code } from "lucide-react";

export const EmptyState = () => (
  <div className="text-center py-12">
    <Code size={32} className="mx-auto mb-3 text-muted-foreground/50" />
    <p className="text-muted-foreground">
      Selectați o propunere de cod pentru a vedea detaliile.
    </p>
  </div>
);
