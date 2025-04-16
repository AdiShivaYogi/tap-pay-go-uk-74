
import React, { createContext, useContext, useState } from 'react';
import { Category, RoadmapItem } from '../types';
import { roadmapItems } from '../data/roadmap-data';

interface RoadmapContextType {
  activeCategory: Category | 'all';
  setActiveCategory: (category: Category | 'all') => void;
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
  items: RoadmapItem[];
  categories: Category[];
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Extract unique categories from roadmapItems
  const categories = [...new Set(roadmapItems.map(item => item.category).filter(Boolean))] as Category[];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <RoadmapContext.Provider value={{
      activeCategory,
      setActiveCategory,
      expandedCategories,
      toggleCategory,
      items: roadmapItems,
      categories
    }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmapContext = () => {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmapContext must be used within a RoadmapContextProvider');
  }
  return context;
};
