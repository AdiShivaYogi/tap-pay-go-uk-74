
import React from "react";
import { IntegrationHeader } from "./IntegrationHeader";
import { DataSources } from "./DataSources";
import { MonitoringParameters } from "./MonitoringParameters";
import { ImplementationProgress } from "./ImplementationProgress";

interface IntegrationTabProps {
  dataConnections: Record<string, boolean>;
  monitoringParameters: Record<string, boolean>;
  implementationProgress: Record<string, number>;
  toggleDataConnection: (connection: string) => void;
  toggleMonitoringParameter: (parameter: string) => void;
}

export const IntegrationTab: React.FC<IntegrationTabProps> = ({
  dataConnections,
  monitoringParameters,
  implementationProgress,
  toggleDataConnection,
  toggleMonitoringParameter
}) => {
  return (
    <div className="space-y-4">
      <IntegrationHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataSources 
          dataConnections={dataConnections}
          toggleDataConnection={toggleDataConnection}
        />
        <MonitoringParameters 
          monitoringParameters={monitoringParameters}
          toggleMonitoringParameter={toggleMonitoringParameter}
        />
      </div>
      
      <ImplementationProgress 
        implementationProgress={implementationProgress}
      />
    </div>
  );
};
