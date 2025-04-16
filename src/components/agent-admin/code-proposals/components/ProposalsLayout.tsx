
import React from "react";

interface ProposalsLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export const ProposalsLayout = ({ sidebar, content }: ProposalsLayoutProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div className="lg:col-span-1 border-r pr-4">
      <h3 className="text-sm font-medium mb-2">Propuneri în așteptare</h3>
      {sidebar}
    </div>
    
    <div className="lg:col-span-2">
      {content}
    </div>
  </div>
);
