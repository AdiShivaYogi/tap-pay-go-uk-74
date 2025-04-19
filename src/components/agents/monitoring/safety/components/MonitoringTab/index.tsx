
import React from "react";
import { MonitoringStats } from "./MonitoringStats";
import { ActionLog } from "./ActionLog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MonitoringTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <ScrollArea className="h-[calc(100vh-400px)] pr-4">
        <div className="pb-6">
          <MonitoringStats />
          <ActionLog />
        </div>
      </ScrollArea>
    </div>
  );
};
