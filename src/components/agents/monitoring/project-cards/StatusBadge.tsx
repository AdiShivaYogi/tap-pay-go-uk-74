
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "în progres":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planificat":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "finalizat":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={`rounded-full px-3 py-0.5 ${getStatusStyles()}`}>
      {status}
    </Badge>
  );
};
