
import React, { useState } from 'react';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface AutonomyAlertProps {
  showAutonomyAlert: boolean;
  setShowAutonomyAlert: (show: boolean) => void;
}

export const AutonomyAlert = ({ 
  showAutonomyAlert, 
  setShowAutonomyAlert 
}: AutonomyAlertProps) => {
  if (!showAutonomyAlert) return null;
  
  return (
    <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200 rounded-lg">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Monitorizare Autonomă Activă</AlertTitle>
      <AlertDescription className="text-amber-700">
        <p className="mt-1">
          Componenta de auto-execuție generează activitate reală pentru agenți și API-uri pentru a demonstra funcționalitatea.
          Activitatea va fi vizibilă în panourile de monitorizare și în conturile API.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 bg-white border-amber-300 hover:bg-amber-100"
          onClick={() => setShowAutonomyAlert(false)}
        >
          Am înțeles
        </Button>
      </AlertDescription>
    </Alert>
  );
};
