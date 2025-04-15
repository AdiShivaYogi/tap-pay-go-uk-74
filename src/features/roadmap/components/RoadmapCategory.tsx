
import React from 'react';
import { RoadmapCard } from "./RoadmapCard";
import { roadmapItems } from "../data/roadmap-data";
import { Category } from "../types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRoadmapContext } from '../context/RoadmapContext';
import { cn } from '@/lib/utils';

interface RoadmapCategoryProps {
  title: string;
  categories: Category[];
}

export const RoadmapCategory: React.FC<RoadmapCategoryProps> = ({ 
  title, 
  categories 
}) => {
  const { expandedCategories, toggleCategory } = useRoadmapContext();
  const isExpanded = expandedCategories.includes(title);

  const categoryItems = roadmapItems.filter(item => 
    categories.includes(item.category as Category)
  );

  // Debugging category items
  console.log(`${title} items:`, categoryItems);
  console.log(`${title} filtered from categories:`, categories);

  const completedItems = categoryItems.filter(item => item.status === "completed").length;
  const totalItems = categoryItems.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-card rounded-lg border border-border">
      <button
        onClick={() => toggleCategory(title)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className="text-sm text-muted-foreground">
            {completedItems} din {totalItems} completate ({progress}%)
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-6">
          {categoryItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {categoryItems.map((item, index) => (
                <RoadmapCard key={`${item.title}-${index}`} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Nu există elemente în această categorie.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
