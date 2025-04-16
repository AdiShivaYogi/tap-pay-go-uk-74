
import { Layout } from "@/components/layout/layout";
import { ArrowRight, CheckCircle2, CreditCard, ExternalLink, Info, MoreHorizontal, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Steps } from "@/components/ui/steps";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Grid3Cols } from "@/components/ui/themed-components";

// Adăugăm o componentă pentru pașii de conectare
const ConnectStripeSteps = () => {
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

const ConnectStripe = () => {
  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={CreditCard}
          title="Conectare Stripe"
          description="Configurează integrarea cu Stripe pentru procesarea plăților"
        />
        
        <div className="space-y-6">
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Stripe este o platformă de procesare a plăților sigură și ușor de integrat. 
                  TapPayGo folosește Stripe pentru a procesa toate plățile tale în mod sigur.
                </AlertDescription>
              </Alert>
              
              <ConnectStripeSteps />
            </div>
          </StyledCard>
          
          <Grid3Cols>
            <StyledCard className="border-primary/10 h-full">
              <div className="p-6 h-full">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-full bg-blue-50">
                    <ShieldCheck className="h-5 w-5 text-blue-500" />
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 mb-2 font-medium">Securitate de nivel înalt</h3>
                <p className="text-sm text-muted-foreground">
                  Stripe oferă securitate PCI DSS nivel 1 pentru toate datele cardurilor tale, asigurând protecția maximă.
                </p>
              </div>
            </StyledCard>
            
            <StyledCard className="border-primary/10 h-full">
              <div className="p-6 h-full">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-full bg-blue-50">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 mb-2 font-medium">Plăți internaționale</h3>
                <p className="text-sm text-muted-foreground">
                  Acceptă plăți în peste 135 de valute diferite din întreaga lume, cu conversie automată.
                </p>
              </div>
            </StyledCard>
            
            <StyledCard className="border-primary/10 h-full">
              <div className="p-6 h-full">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-full bg-blue-50">
                    <ExternalLink className="h-5 w-5 text-blue-500" />
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 mb-2 font-medium">Dashboard dedicat</h3>
                <p className="text-sm text-muted-foreground">
                  Accesează dashboard-ul Stripe pentru rapoarte detaliate și gestionarea completă a plăților tale.
                </p>
              </div>
            </StyledCard>
          </Grid3Cols>
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Întrebări Frecvente</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Ce comisioane percepe Stripe?</AccordionTrigger>
                  <AccordionContent>
                    Stripe percepe un comision de 1.4% + 0.25€ pentru cardurile europene și 2.9% + 0.25€ pentru cardurile
                    non-europene. Nu există taxe ascunse sau costuri suplimentare.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Cât de repede primesc banii în contul meu?</AccordionTrigger>
                  <AccordionContent>
                    Plățile sunt procesate imediat, iar banii sunt transferați în contul tău bancar în 2-3 zile lucrătoare,
                    în funcție de banca ta.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Este necesar să am un cont Stripe separat?</AccordionTrigger>
                  <AccordionContent>
                    Da, vei avea nevoie de un cont Stripe pentru a procesa plățile. Procesul de conectare este simplu 
                    și îl poți realiza în câteva minute direct din această pagină.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Ce se întâmplă dacă un client contestă o plată?</AccordionTrigger>
                  <AccordionContent>
                    Stripe oferă un sistem integrat de gestionare a disputelor. Vei fi notificat și vei putea furniza
                    dovezi pentru a rezolva disputa. TapPayGo te ajută cu informațiile necesare în acest proces.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default ConnectStripe;
