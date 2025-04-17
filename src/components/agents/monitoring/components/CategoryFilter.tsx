
import React from "react";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  activeFilter: string | null;
  onFilterChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge 
          key={category}
          variant={activeFilter === category ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onFilterChange(category)}
        >
          {category}
        </Badge>
      ))}
      {categories.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          Nu există categorii de activitate disponibile
        </p>
      )}
    </div>
  );
};
