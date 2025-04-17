
import { useState } from "react";

export const useImplementationProgress = () => {
  const [implementationProgress, setImplementationProgress] = useState({
    dataSources: 15,
    riskEvaluation: 25,
    monitoring: 30,
    logging: 20,
    adaptiveSafety: 10,
  });

  const updateImplementationProgress = (system: string) => {
    const progressKey = system === 'dataSources' ? 'dataSources' :
                       system === 'realTimeMonitoring' ? 'monitoring' :
                       system === 'riskAlgorithm' ? 'riskEvaluation' : 'adaptiveSafety';
    
    setImplementationProgress(prev => ({
      ...prev,
      [progressKey]: Math.min(prev[progressKey as keyof typeof prev] + 10, 100)
    }));
  };

  return {
    implementationProgress,
    setImplementationProgress,
    updateImplementationProgress
  };
};
