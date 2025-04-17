
import React, { useState } from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { useAgentMonitoring } from "./hooks";
import { 
  MonitorHeader, 
  CategoryFilter, 
  ActivityTabs,
  LearningOptions,
  TestToolsSection
} from "./components";

export const AgentActivityMonitor: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showTestTools, setShowTestTools] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [showAutoLearning, setShowAutoLearning] = useState(false);
  
  const { 
    activityData, 
    activityLogs, 
    isLoading, 
    categories,
    refreshData,
    totalActivities,
    autoRefresh,
    toggleAutoRefresh,
    lastRefresh
  } = useAgentMonitoring();

  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category === activeFilter ? null : category);
  };

  return (
    <StyledCard className="w-full">
      <MonitorHeader 
        totalActivities={totalActivities}
        lastRefresh={lastRefresh}
        autoRefresh={autoRefresh}
        toggleAutoRefresh={toggleAutoRefresh}
        showTestTools={showTestTools}
        setShowTestTools={setShowTestTools}
        showLearning={showLearning}
        setShowLearning={setShowLearning}
        showAutoLearning={showAutoLearning}
        setShowAutoLearning={setShowAutoLearning}
        refreshData={refreshData}
        isLoading={isLoading}
      />

      <StyledCardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <CategoryFilter 
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <TestToolsSection showTestTools={showTestTools} />
        </div>

        <LearningOptions 
          showLearning={showLearning}
          showAutoLearning={showAutoLearning}
        />

        <ActivityTabs 
          activityData={activityData}
          activityLogs={activityLogs}
          isLoading={isLoading}
          activeFilter={activeFilter}
          showAutoLearning={showAutoLearning}
        />
      </StyledCardContent>
    </StyledCard>
  );
};
