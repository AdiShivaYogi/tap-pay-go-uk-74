
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Steps } from "@/components/ui/steps";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export const ConnectStripeSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user, connectStripe } = useAuth();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      // Simulăm conectarea cu Stripe (într-o aplicație reală ar trebui implementată OAuth)
      await new Promise(resolve => setTimeout(resolve, 1500));
      await connectStripe('demo-account-id');
      
      toast({
        title: "Cont Stripe conectat cu succes",
        description: "Poți începe să procesezi plăți imediat",
      });
      
      setCurrentStep(3);
      
      // După o scurtă pauză, redirecționăm către dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast({
        title: "Eroare la conectare",
        description: "Nu s-a putut realiza conexiunea cu Stripe",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
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
          disabled={isConnecting}
        >
          {isConnecting ? "Se conectează..." : "Conectează cu Stripe"} <ArrowRight className="h-4 w-4" />
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
