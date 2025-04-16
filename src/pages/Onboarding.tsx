
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { ArrowRight, CreditCard, Info, Shield, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/styled-card";
import { Button } from "@/components/ui/button";
import { Steps } from "@/components/ui/steps";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Onboarding = () => {
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
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4">Bun venit la TapPayGo</h2>
            <p className="text-muted-foreground text-lg">
              Transformă-ți iPhone-ul într-un cititor de carduri. Fără hardware. Fără cont separat. Doar Stripe.
            </p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/8d8d7578-89fa-456f-b552-520d487871a5.png" 
              alt="TapPayGo Demo" 
              className="rounded-lg shadow-lg max-w-md"
            />
          </div>
          
          <Button 
            onClick={handleNextStep} 
            className="w-full h-14 text-lg"
          >
            Continuă <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      ),
    },
    {
      title: "Despre Stripe",
      content: (
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md inline-flex items-center gap-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold">Stripe</span>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-lg text-muted-foreground">
              TapPayGo nu procesează plăți. Toate încasările se fac în siguranță prin Stripe — una dintre cele mai sigure platforme de plăți din lume.
            </p>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200 mb-6">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              Stripe gestionează toate informațiile bancare și financiare. TapPayGo nu stochează niciodată datele cardurilor clienților.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={handleNextStep}
            className="w-full h-14 text-lg"
          >
            Continuă <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      ),
    },
    {
      title: "Conectare Stripe",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">Conectează-te cu Stripe</h2>
            <p className="text-muted-foreground">
              Pentru a începe să procesezi plăți, conectează-te cu contul tău Stripe existent sau creează unul nou.
            </p>
          </div>
          
          <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              După conectare, vei reveni automat în aplicație.
              Stripe gestionează tot procesul de creare sau autentificare.
            </p>
            
            <Button 
              onClick={handleStripeConnect}
              className="w-full sm:w-auto h-14 px-8 text-lg mx-auto"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Conectează-te cu Stripe
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Gata de încasare",
      content: (
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
      ),
    }
  ];

  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={CreditCard}
          title="Onboarding TapPayGo"
          description="Configurează rapid aplicația pentru a începe să procesezi plăți"
        />
        
        <div className="space-y-6 max-w-2xl mx-auto">
          <StyledCard className="border-primary/10">
            <div className="p-6">
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
            </div>
          </StyledCard>
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Securitate și confidențialitate</h3>
                  <p className="text-sm text-muted-foreground">
                    TapPayGo este o aplicație care doar intermediază conexiunea ta cu Stripe. 
                    Noi nu stocăm date bancare sau informații personale sensibile. Toate plățile 
                    și tranzacțiile sunt gestionate de Stripe, unul dintre liderii globali în 
                    procesarea plăților securizate.
                  </p>
                </div>
              </div>
            </div>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Onboarding;
