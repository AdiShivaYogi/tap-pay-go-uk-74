
import { Badge } from "@/components/ui/badge";

export interface TimeEstimationBadgeProps {
  timeEstimate?: "days" | "weeks" | "months";
}

export const TimeEstimationBadge = ({ timeEstimate }: TimeEstimationBadgeProps) => {
  switch (timeEstimate) {
    case "days":
      return <Badge variant="outline" className="text-green-600 border-green-600">Zile</Badge>;
    case "weeks":
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Săptămâni</Badge>;
    case "months":
      return <Badge variant="outline" className="text-red-600 border-red-600">Luni</Badge>;
    default:
      return <Badge variant="outline">Nedefinit</Badge>;
  }
};
