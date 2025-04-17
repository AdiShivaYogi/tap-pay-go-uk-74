
import React from "react";
import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case "înaltă":
        return "bg-red-100 text-red-800 border-red-200";
      case "medie":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "scăzută":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={`rounded-full px-3 py-0.5 ${getPriorityStyles()}`}>
      Prioritate {priority}
    </Badge>
  );
};
