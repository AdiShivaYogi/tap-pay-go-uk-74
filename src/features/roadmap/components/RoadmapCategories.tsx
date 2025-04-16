
import { useState } from "react";
import { RoadmapCard } from "./RoadmapCard";
import { RoadmapCategory } from "./RoadmapCategory";
import { useRoadmapContext } from "../context/RoadmapContext";
import { RoadmapLegend } from "./RoadmapLegend";
import { StyledCard } from "@/components/ui/cards";

export const RoadmapCategories = () => {
  const { categories, items } = useRoadmapContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrează elementele în funcție de categoria selectată sau afișează toate dacă nu e selectată nicio categorie
  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  return (
    <div className="space-y-8">
      <StyledCard className="p-6">
        <h2 className="text-xl font-semibold mb-6">Categorii Roadmap</h2>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <RoadmapCategory
            name="all"
            label="Toate"
            isSelected={selectedCategory === null}
            onSelect={() => setSelectedCategory(null)}
          />
          {categories.map((category) => (
            <RoadmapCategory
              key={category}
              name={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              isSelected={selectedCategory === category}
              onSelect={() => setSelectedCategory(category)}
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
