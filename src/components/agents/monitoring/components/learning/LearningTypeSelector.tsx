
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LearningTypeSelectorProps {
  selectedTypes: string[];
  availableTypes: string[];
  onAddType: (type: string) => void;
  onRemoveType: (type: string) => void;
}

export const LearningTypeSelector: React.FC<LearningTypeSelectorProps> = ({
  selectedTypes,
  availableTypes,
  onAddType,
  onRemoveType
}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTypes.map(type => (
          <Badge 
            key={type} 
            variant="secondary"
            className="flex items-center gap-1"
          >
            {type}
            <button 
              onClick={() => onRemoveType(type)}
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
      
      <Select onValueChange={onAddType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Adaugă tip de învățare" />
        </SelectTrigger>
        <SelectContent>
          {availableTypes.filter(type => !selectedTypes.includes(type)).map(type => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
