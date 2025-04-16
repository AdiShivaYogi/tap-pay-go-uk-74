import { useState } from "react";
import { useRoadmapContext } from "../context/RoadmapContext";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight } from "lucide-react";
import { StyledCard } from "@/components/ui/cards";
import { RoadmapItem } from "../types";

interface RoadmapCategoryProps {
  title: string;
  items: RoadmapItem[];
}

export const RoadmapCategory: React.FC<RoadmapCategoryProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { completedTasks } = useRoadmapContext();

  const totalTasks = items.length;
  const completedTasksInCategory = items.filter(item => completedTasks.includes(item.id)).length;
  const progress = totalTasks > 0 ? (completedTasksInCategory / totalTasks) * 100 : 0;

  return (
    <StyledCard className="border-primary/10">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center">
            {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <Badge variant="secondary">{completedTasksInCategory}/{totalTasks} Tasks</Badge>
        </button>
      </div>
      <div className="px-4 pb-4">
        <Progress value={progress} className="h-2" />
      </div>
      {isOpen && (
        <div className="px-4 pb-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </StyledCard>
  );
};
