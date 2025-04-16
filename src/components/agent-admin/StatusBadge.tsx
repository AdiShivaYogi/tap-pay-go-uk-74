
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex gap-1 items-center">
          <Check className="h-3 w-3" />
          <span>Finalizat</span>
        </Badge>
      );
    case "inProgress":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 flex gap-1 items-center">
          <Clock className="h-3 w-3" />
          <span>În progres</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 flex gap-1 items-center">
          <AlertCircle className="h-3 w-3" />
          <span>Planificat</span>
        </Badge>
      );
  }
};
