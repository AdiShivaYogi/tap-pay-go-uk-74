
import { Badge } from "@/components/ui/badge";
import { Status, Priority } from "../types";
import { CheckCircle2, ClockIcon, Circle } from "lucide-react";

export const getStatusIcon = (status: Status) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="text-green-500" />;
    case "in-progress":
      return <ClockIcon className="text-blue-500" />;
    case "pending":
      return <Circle className="text-gray-400" />;
  }
};

export const getStatusBadge = (status: Status) => {
  const variants = {
    "completed": "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    "pending": "bg-gray-100 text-gray-800"
  };

  const labels = {
    "completed": "Completat",
    "in-progress": "În Lucru",
    "pending": "În Așteptare"
  };

  return (
    <Badge variant="outline" className={`${variants[status]}`}>
      {labels[status]}
    </Badge>
  );
};

export const getPriorityBadge = (priority?: Priority) => {
  if (!priority) return null;
  
  const variants = {
    "high": "bg-red-100 text-red-800",
    "medium": "bg-yellow-100 text-yellow-800",
    "low": "bg-green-100 text-green-800"
  };

  const labels = {
    "high": "Prioritate Înaltă",
    "medium": "Prioritate Medie",
    "low": "Prioritate Scăzută"
  };

  return (
    <Badge variant="outline" className={`${variants[priority]} ml-2`}>
      {labels[priority]}
    </Badge>
  );
};
