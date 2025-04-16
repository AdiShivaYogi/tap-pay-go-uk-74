
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Steps } from "@/components/ui/steps";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export const ConnectStripeSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  
  const handleConnect = () => {
    // Aici ar trebui să fie logica de conectare cu Stripe
    // În mod normal, ar trebui să redirecționăm către Stripe Connect sau să folosim Stripe OAuth
    setTimeout(() => {
      toast({
        title: "Cont Stripe conectat cu succes",
        description: "Poți începe să procesezi plăți imediat",
      });
      setCurrentStep(3);
    }, 1500);
  };

  const steps = [
    {
      title: "Creare cont Stripe",
      description: "Creează sau conectează contul tău Stripe existent",
      action: (
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setCurrentStep(1)}
        >
          Sunt pregătit <ArrowRight className="h-4 w-4" />
        </Button>
      ),
    },
    {
      title: "Verifică informațiile",
      description: "Completează informațiile necesare pentru Stripe",
      action: (
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setCurrentStep(2)}
        >
          Continuă <ArrowRight className="h-4 w-4" />
        </Button>
      ),
    },
    {
      title: "Conectează API Keys",
      description: "Conectează contul TapPayGo cu credențialele Stripe",
      action: (
        <Button 
          variant="default" 
          className="gap-2"
          onClick={handleConnect}
        >
          Conectează cu Stripe <ArrowRight className="h-4 w-4" />
        </Button>
      ),
    },
    {
      title: "Gata!",
      description: "Contul tău Stripe este conectat și configurat",
      action: (
        <Link to="/dashboard">
          <Button variant="default" className="gap-2">
            Mergi la Dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ),
    },
  ];
  
  return (
    <div className="space-y-8">
      <Steps currentStep={currentStep} totalSteps={steps.length} />
      
      <div className="p-6 border rounded-lg bg-muted/30">
        <h3 className="text-lg font-medium mb-4">{steps[currentStep].title}</h3>
        <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
        {steps[currentStep].action}
      </div>
      
      {currentStep === 3 && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            Felicitări! Contul tău Stripe este acum conectat cu TapPayGo. Poți începe să procesezi plăți imediat.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
