
import { Layout } from "@/components/layout/layout";
import { ArrowRight, CheckCircle2, CreditCard, FileCheck, Lock, Shield, ShieldCheck, User } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { Button } from "@/components/ui/button";
import { Steps } from "@/components/ui/steps";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(Math.round(((currentStep + 1) / (steps.length - 1)) * 100));
      toast({
        title: `Pas ${currentStep + 1} completat!`,
        description: "Configurarea progresează cu succes.",
      });
    }
  };
  
  const steps = [
    {
      title: "Profil",
      icon: User,
      description: "Completează informațiile despre tine și afacerea ta",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Completează informațiile de bază despre tine și afacerea ta pentru a configura contul TapPayGo.
            Aceste informații sunt necesare pentru procesarea plăților și pentru a-ți oferi o experiență personalizată.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Informații necesare:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Nume complet</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Email de contact</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Număr de telefon</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Numele afacerii (opțional)</span>
              </li>
            </ul>
          </div>
          <Button onClick={handleNextStep} className="w-full">Completează profilul</Button>
        </div>
      ),
    },
    {
      title: "Conectare Stripe",
      icon: CreditCard,
      description: "Conectează contul tău Stripe pentru procesarea plăților",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            TapPayGo folosește Stripe pentru procesarea sigură a plăților. Conectează contul tău Stripe existent 
            sau creează unul nou pentru a începe să primești plăți.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Am deja un cont Stripe</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button onClick={handleNextStep} variant="outline" className="w-full">Conectează cont</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Creează cont nou</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button onClick={handleNextStep} className="w-full">Creează cont</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Verificare cont",
      icon: Shield,
      description: "Verifică-ți contul pentru a evita limitările",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Verificarea contului tău este necesară pentru a procesa plăți fără limitări. Aceasta include
            verificarea identității tale și a informațiilor bancare.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Documente necesare:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Act de identitate (CI sau pașaport)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Detalii cont bancar</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Adresă fizică</span>
              </li>
            </ul>
          </div>
          <Button onClick={handleNextStep} className="w-full">Verifică cont</Button>
        </div>
      ),
    },
    {
      title: "Configurare completă",
      icon: FileCheck,
      description: "Contul tău este configurat și gata de utilizare",
      content: (
        <div className="space-y-4">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">
              Felicitări! Contul tău TapPayGo este complet configurat și gata de utilizare.
              Poți acum să procesezi plăți utilizând iPhone-ul tău.
            </AlertDescription>
          </Alert>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Următorii pași:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Procesează prima ta plată</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Explorează dashboardul și rapoartele</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>Configurează notificările pentru plăți</span>
              </li>
            </ul>
          </div>
          <Link to="/dashboard">
            <Button className="w-full">Mergi la Dashboard</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Progres configurare</p>
          <p className="text-sm font-medium">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Steps currentStep={currentStep} totalSteps={steps.length} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                currentStep === index 
                  ? "border-primary bg-primary/5" 
                  : "border-muted bg-card"
              }`}
              onClick={() => {
                if (index <= currentStep) {
                  setCurrentStep(index);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  currentStep >= index ? "bg-primary/10" : "bg-muted"
                }`}>
                  <step.icon className={`h-5 w-5 ${
                    currentStep >= index ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <div>
                  <p className={`font-medium ${
                    currentStep >= index ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-span-1 md:col-span-3">
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h3>
              {steps[currentStep].content}
            </div>
          </StyledCard>
        </div>
      </div>
    </div>
  );
};

const Onboarding = () => {
  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={FileCheck}
          title="Configurare Cont"
          description="Parcurge pașii pentru configurarea contului TapPayGo"
        />
        
        <div className="space-y-6">
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <Lock className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Configurarea contului tău este necesară pentru a începe să procesezi plăți.
                  Informațiile tale sunt securizate și protejate.
                </AlertDescription>
              </Alert>
              
              <OnboardingSteps />
            </div>
          </StyledCard>
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Siguranță și confidențialitate</h3>
                  <p className="text-sm text-muted-foreground">
                    TapPayGo ia în serios siguranța și confidențialitatea datelor tale. Toate informațiile sunt 
                    criptate și stocate în siguranță, iar procesarea plăților respectă cele mai înalte standarde 
                    de securitate. Pentru mai multe informații, consultă <Link to="/privacy" className="text-primary hover:underline">Politica de Confidențialitate</Link>.
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
