
import React from "react";
import { MonitoringStats } from "./MonitoringStats";
import { ActionLog } from "./ActionLog";

export const MonitoringTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <MonitoringStats />
      <ActionLog />
    </div>
  );
};
