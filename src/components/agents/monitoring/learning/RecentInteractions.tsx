
import React from "react";
import { Badge } from "@/components/ui/badge";

interface InteractionItem {
  sourceName?: string;
  targetName?: string;
  learningType: string;
}

interface RecentInteractionsProps {
  interactions: InteractionItem[];
}

export const RecentInteractions: React.FC<RecentInteractionsProps> = ({ interactions }) => {
  if (interactions.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Interacțiuni recente:</h3>
      <div className="space-y-2">
        {interactions.map((interaction, index) => (
          <div key={index} className="p-2 border rounded text-sm flex items-center">
            <span className="font-medium">{interaction.sourceName}</span>
            <span className="mx-2">învață de la</span>
            <span className="font-medium">{interaction.targetName}</span>
            <Badge variant="outline" className="ml-auto">
              {interaction.learningType}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
