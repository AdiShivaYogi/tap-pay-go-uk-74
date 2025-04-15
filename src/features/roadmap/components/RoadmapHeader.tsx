
import { BarChart2 } from "lucide-react";
import { HeaderTitle } from "./header/HeaderTitle";
import { HeaderSecurityScore } from "./header/HeaderSecurityScore";
import { HeaderPriorityProgress } from "./header/HeaderPriorityProgress";

export const RoadmapHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-8 space-y-6">
      <HeaderTitle />
      <HeaderSecurityScore />
      <HeaderPriorityProgress />
    </div>
  );
};
