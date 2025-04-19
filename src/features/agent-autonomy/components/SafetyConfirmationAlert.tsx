
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface SafetyConfirmationAlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const SafetyConfirmationAlert = ({
  onConfirm,
  onCancel
}: SafetyConfirmationAlertProps) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Confirmare dezactivare limite siguranță</AlertTitle>
      <AlertDescription>
        <p className="mb-3">
          Dezactivarea limitelor de siguranță permite agenților să opereze fără restricții.
          Această acțiune poate avea consecințe neprevăzute. Doriți să continuați?
        </p>
        <div className="flex gap-2">
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Confirm dezactivarea
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel}>
            Anulează
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
