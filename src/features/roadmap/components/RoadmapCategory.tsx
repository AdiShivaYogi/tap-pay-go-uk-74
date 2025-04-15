
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

  const completedItems = categoryItems.filter(item => item.status === "completed").length;
  const totalItems = categoryItems.length;
  const progress = Math.round((completedItems / totalItems) * 100);

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
      
      <div className={cn(
        "grid gap-6 transition-all duration-300",
        isExpanded 
          ? "grid-rows-[1fr] p-6" 
          : "grid-rows-[0fr] overflow-hidden"
      )}>
        <div className="min-h-0">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categoryItems.map((item, index) => (
              <RoadmapCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
