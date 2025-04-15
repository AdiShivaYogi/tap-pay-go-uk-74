
import React from 'react';
import { RoadmapCard } from "./RoadmapCard";
import { roadmapItems } from "../data/roadmap-data";
import { Category } from "../types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRoadmapContext } from '../context/RoadmapContext';
import { cn } from '@/lib/utils';
import { StyledCard, StyledCardContent } from "@/components/ui/styled-card";
import { Progress } from "@/components/ui/progress";

interface RoadmapCategoryProps {
  title: string;
  categories: string[];
}

export const RoadmapCategory: React.FC<RoadmapCategoryProps> = ({ 
  title, 
  categories 
}) => {
  const { expandedCategories, toggleCategory } = useRoadmapContext();
  const isExpanded = expandedCategories.includes(title);

  const categoryItems = roadmapItems.filter(item => 
    item.category && categories.includes(item.category as Category)
  );

  const completedItems = categoryItems.filter(item => item.status === "completed").length;
  const totalItems = categoryItems.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <StyledCard className="bg-gradient-to-br from-card to-secondary/5 backdrop-blur-sm">
      <button
        onClick={() => toggleCategory(title)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Progress 
              value={progress} 
              className="w-20 h-2"
            />
            <span>
              {completedItems}/{totalItems}
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <StyledCardContent>
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
        </StyledCardContent>
      )}
    </StyledCard>
  );
};
