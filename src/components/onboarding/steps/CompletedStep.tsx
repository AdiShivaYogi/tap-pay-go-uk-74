
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const CompletedStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <ShieldCheck className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Ești gata să accepți plăți!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Contul tău Stripe este conectat. Poți începe să procesezi plăți cu cardul NFC direct pe iPhone.
        </p>
      </div>
      
      <Link to="/dashboard">
        <Button className="w-full h-14 text-lg">
          Încasează prima plată <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};
