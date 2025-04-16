
import React, { createContext, useState, useContext, useMemo } from 'react';
import { RoadmapContextType, RoadmapItem, Category } from '../types';
import { roadmapItems } from '../data/roadmap-data';

// Create the RoadmapContext
const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

// Create a provider component
export const RoadmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<Category | null | 'all'>('all');

  // Extract unique categories from roadmap items
  const categories = useMemo(() => {
    const uniqueCategories = new Set<Category>();
    roadmapItems.forEach((item) => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });
    return Array.from(uniqueCategories);
  }, []);

  // Create context value
  const value: RoadmapContextType = {
    items: roadmapItems,
    categories,
    activeCategory,
    setActiveCategory,
  };

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
};

// Create a hook for using the RoadmapContext
export const useRoadmapContext = () => {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmapContext must be used within a RoadmapProvider');
  }
  return context;
};
