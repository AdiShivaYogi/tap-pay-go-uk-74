
import React from 'react';
import { Badge } from "@/components/ui/badge";

type Status = 'planned' | 'inProgress' | 'completed';

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadges = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'planned':
      return <Badge variant="outline" className="bg-muted">Planificat</Badge>;
    case 'inProgress':
      return <Badge variant="default" className="bg-blue-500">În progres</Badge>;
    case 'completed':
      return <Badge variant="default" className="bg-green-500">Finalizat</Badge>;
    default:
      return null;
  }
};

export function getStatusBadge(status: Status) {
  return <StatusBadges status={status} />;
}
