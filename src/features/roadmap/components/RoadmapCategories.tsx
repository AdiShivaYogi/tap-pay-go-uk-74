
import { useState } from "react";
import { RoadmapCard } from "./RoadmapCard";
import { useRoadmapContext } from "../context/RoadmapContext";
import { RoadmapLegend } from "./RoadmapLegend";
import { StyledCard } from "@/components/ui/cards";
import { Category } from "../types";

interface CategoryButtonProps {
  name: string | Category;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const RoadmapCategory = ({ name, label, isSelected, onSelect }: CategoryButtonProps) => (
  <button
    onClick={onSelect}
    className={`px-3 py-1 text-sm font-medium rounded-md ${
      isSelected 
        ? 'bg-primary text-primary-foreground' 
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    }`}
  >
    {label}
  </button>
);

export const RoadmapCategories = () => {
  const { items, categories, activeCategory, setActiveCategory } = useRoadmapContext();
  
  // Filtrează elementele în funcție de categoria selectată sau afișează toate dacă nu e selectată nicio categorie
  const filteredItems = activeCategory !== 'all'
    ? items.filter(item => item.category === activeCategory)
    : items;

  return (
    <div className="space-y-8">
      <StyledCard className="p-6">
        <h2 className="text-xl font-semibold mb-6">Categorii Roadmap</h2>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <RoadmapCategory
            name="all"
            label="Toate"
            isSelected={activeCategory === 'all'}
            onSelect={() => setActiveCategory('all')}
          />
          {categories.map((category) => (
            <RoadmapCategory
              key={category}
              name={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              isSelected={activeCategory === category}
              onSelect={() => setActiveCategory(category)}
            />
          ))}
        </div>
        
        <RoadmapLegend />
      </StyledCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <RoadmapCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">Nu există elemente în această categorie.</p>
        </div>
      )}
    </div>
  );
};
