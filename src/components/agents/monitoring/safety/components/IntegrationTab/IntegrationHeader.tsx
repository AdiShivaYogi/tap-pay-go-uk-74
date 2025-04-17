
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Server } from "lucide-react";

export const IntegrationHeader: React.FC = () => {
  return (
    <Alert className="border-amber-300 bg-amber-50">
      <AlertTitle className="flex items-center gap-1 text-amber-800">
        <Server className="h-4 w-4 text-amber-600" />
        Integrare cu Surse de Date Reale
      </AlertTitle>
      <AlertDescription className="text-amber-700">
        Această secțiune vă permite conectarea infrastructurii de siguranță la surse reale de date 
        și sisteme de monitorizare pentru agenții autonomi. Stadiul curent: În implementare.
      </AlertDescription>
    </Alert>
  );
};
