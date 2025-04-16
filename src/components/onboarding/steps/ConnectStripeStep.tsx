
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ConnectStripeStepProps {
  onConnect: () => void;
}

export const ConnectStripeStep: React.FC<ConnectStripeStepProps> = ({ onConnect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Conectează-te cu Stripe</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge className="bg-blue-500">UK Ready</Badge>
          <Badge variant="outline" className="text-green-600 border-green-600">GDPR Compliant</Badge>
        </div>
        <p className="text-muted-foreground">
          Pentru a începe să procesezi plăți în UK, conectează-te cu contul tău Stripe existent sau creează unul nou.
        </p>
      </div>
      
      <div className="bg-muted/30 p-6 rounded-lg space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          <div className="border rounded-md p-3 bg-white/50">
            <h3 className="font-medium mb-1 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Procesare plăți UK
            </h3>
            <p className="text-xs text-muted-foreground">Acceptă plăți în GBP cu carduri emise în Regatul Unit</p>
          </div>
          
          <div className="border rounded-md p-3 bg-white/50">
            <h3 className="font-medium mb-1 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Documente de conformitate
            </h3>
            <p className="text-xs text-muted-foreground">Toate documentele necesare sunt gestionate de Stripe</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          După conectare, vei reveni automat în aplicație.
          Stripe gestionează tot procesul de creare sau autentificare.
        </p>
        
        <Button 
          onClick={onConnect}
          className="w-full sm:w-auto h-14 px-8 text-lg mx-auto"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Conectează-te cu Stripe
        </Button>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Ai întrebări despre conformitatea UK?</p>
        <Link to="/help" className="text-primary hover:underline">
          Vezi documentația de conformitate
        </Link>
      </div>
    </div>
  );
};
