
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LearningTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  learningTypes: string[];
}

export const LearningTypeSelect: React.FC<LearningTypeSelectProps> = ({
  value,
  onValueChange,
  learningTypes
}) => {
  return (
    <div>
      <label className="text-xs mb-1 block">Tip de învățare</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selectează tipul"/>
        </SelectTrigger>
        <SelectContent>
          {learningTypes.map(type => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
