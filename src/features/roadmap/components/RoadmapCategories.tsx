
import React from "react";
import { RoadmapCategory } from "./RoadmapCategory";
import { useRoadmapContext } from "../context/RoadmapContext";
import { roadmapData } from "../data/roadmap-data";

interface RoadmapCategoriesProps {
  // Add any props if needed
}

export const RoadmapCategories: React.FC<RoadmapCategoriesProps> = () => {
  const categories = Object.keys(roadmapData).map((category) => ({
    title: category,
    items: roadmapData[category]
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Categorii Roadmap</h2>
      {categories.map((category, index) => (
        <RoadmapCategory 
          key={index}
          title={category.title} 
          items={category.items} 
        />
      ))}
    </div>
  );
};
