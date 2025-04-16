
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Steps } from "@/components/ui/steps";
import { WelcomeStep } from "./steps/WelcomeStep";
import { AboutStripeStep } from "./steps/AboutStripeStep";
import { ConnectStripeStep } from "./steps/ConnectStripeStep";
import { CompletedStep } from "./steps/CompletedStep";
import { toast } from "@/hooks/use-toast";

export const OnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(Math.round(((currentStep + 1) / (steps.length - 1)) * 100));
    }
  };
  
  const handleStripeConnect = () => {
    // Aici ar fi logica de conectare cu Stripe
    toast({
      title: "Cont Stripe conectat cu succes",
      description: "Poți începe să procesezi plăți imediat",
    });
    setCurrentStep(3);  // Salt la ultimul pas
    setProgress(100);
  };
  
  const steps = [
    {
      title: "Bun venit",
      content: <WelcomeStep onNext={handleNextStep} />
    },
    {
      title: "Despre Stripe",
      content: <AboutStripeStep onNext={handleNextStep} />
    },
    {
      title: "Conectare Stripe",
      content: <ConnectStripeStep onConnect={handleStripeConnect} />
    },
    {
      title: "Gata de încasare",
      content: <CompletedStep />
    }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Progres onboarding</p>
          <p className="text-sm font-medium">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Steps currentStep={currentStep} totalSteps={steps.length} />
      
      <div className="py-4">
        {steps[currentStep].content}
      </div>
    </div>
  );
};
