
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RoadmapItem } from "../types";
import { getStatusIcon, getStatusBadge, getPriorityBadge } from "./StatusBadges";

interface RoadmapCardProps {
  item: RoadmapItem;
}

export const RoadmapCard = ({ item }: RoadmapCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {item.icon && <span>{item.icon}</span>}
          <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
        </div>
        {getStatusIcon(item.status)}
      </CardHeader>
      <CardDescription className="px-6">
        {item.description}
      </CardDescription>
      <CardContent className="mt-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {getStatusBadge(item.status)}
          {getPriorityBadge(item.priority)}
        </div>
        <ul className="space-y-2">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-2 w-2 h-2 rounded-full bg-primary/20 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
