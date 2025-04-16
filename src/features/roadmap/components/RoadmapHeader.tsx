
import { BarChart2 } from "lucide-react";
import { HeaderTitle } from "./header/HeaderTitle";
import { HeaderSecurityScore } from "./header/HeaderSecurityScore";
import { HeaderPriorityProgress } from "./header/HeaderPriorityProgress";
import { Button } from "@/components/ui/button";

interface RoadmapHeaderProps {
  showMVP?: boolean;
  onToggleMVP?: () => void;
}

export const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({ showMVP, onToggleMVP }) => {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-8 space-y-6">
      <div className="flex justify-between items-center">
        <HeaderTitle />
        {onToggleMVP && (
          <Button onClick={onToggleMVP} variant="outline" size="sm">
            {showMVP ? 'Arată Roadmap Detaliat' : 'Arată MVP Roadmap'}
          </Button>
        )}
      </div>
      <HeaderSecurityScore />
      <HeaderPriorityProgress />
    </div>
  );
};
