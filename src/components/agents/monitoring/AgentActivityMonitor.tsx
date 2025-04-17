
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

export const AgentActivityMonitor: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showTestTools, setShowTestTools] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [showAutoLearning, setShowAutoLearning] = useState(true); // Activat implicit
  
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
        <Alert className="mb-4 border-amber-500 bg-amber-50/40">
          <AlertTitle className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-amber-600" /> 
            Auto-învățare activată
          </AlertTitle>
          <AlertDescription className="text-sm">
            Agenții autonomi vor colecta date în timp real și vor evolua folosind algoritmii de auto-învățare. 
            Monitorizați progresul în secțiunea de auto-învățare de mai jos.
          </AlertDescription>
        </Alert>

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
