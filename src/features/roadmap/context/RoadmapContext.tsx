
import React, { createContext, useContext, useState } from 'react';
import { Category } from '../types';

interface RoadmapContextType {
  activeCategory: Category | 'all';
  setActiveCategory: (category: Category | 'all') => void;
  expandedCategories: string[];
  toggleCategory: (category: string) => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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
      toggleCategory
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
