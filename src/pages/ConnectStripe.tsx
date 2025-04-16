
import { Layout } from "@/components/layout/layout";
import { CreditCard, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StyledCard } from "@/components/ui/styled-card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Section } from "@/components/ui/themed-components";

const ConnectStripe = () => {
  const { connectStripe, user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  
  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      // Simulăm conectarea cu Stripe (într-o aplicație reală ar trebui implementată OAuth)
      await new Promise(resolve => setTimeout(resolve, 1500));
      await connectStripe('demo-account-id');
      toast({
        title: "Cont Stripe conectat",
        description: "Acum poți începe să accepți plăți prin Stripe",
      });
      navigate('/dashboard');
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

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={CreditCard}
          title="Conectare cu Stripe"
          description="Simplu și rapid - conectează-te pentru a începe să procesezi plăți"
          gradient={true}
        />
        
        <div className="space-y-6 max-w-2xl mx-auto">
          {user?.stripeConnected ? (
            <StyledCard className="border-primary/10 bg-gradient-to-br from-green-50 to-green-100/10">
              <div className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold">Contul tău Stripe este conectat</h2>
                  <p className="text-muted-foreground">
                    Ești gata să procesezi plăți. Accesează dashboard-ul pentru a începe.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <Link to="/dashboard">
                      <Button size="lg" className="gap-2">
                        Mergi la Dashboard <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="gap-2">
                      Vezi contul Stripe <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </StyledCard>
          ) : (
            <StyledCard className="border-primary/10">
              <div className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Conectează-te cu Stripe</h2>
                    <p className="text-muted-foreground">
                      Pentru a începe să procesezi plăți, conectează contul tău Stripe cu TapPayGo.
                    </p>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertDescription className="text-blue-700">
                      TapPayGo nu procesează sau stochează informații bancare. Toate plățile sunt procesate direct prin Stripe,
                      una dintre cele mai sigure platforme de plăți din lume.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={handleConnect} 
                    disabled={isConnecting}
                    size="lg"
                    className="w-full h-14 text-lg gap-2"
                  >
                    {isConnecting ? "Se conectează..." : "Conectează-te cu Stripe"}
                    {!isConnecting && <ArrowRight className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </StyledCard>
          )}
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">De ce să folosești Stripe cu TapPayGo?</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Fără hardware suplimentar</h4>
                  <p className="text-sm text-muted-foreground">
                    Folosește iPhone-ul pentru a accepta plăți NFC, fără niciun terminal POS suplimentar.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Securitate de nivel bancar</h4>
                  <p className="text-sm text-muted-foreground">
                    Stripe folosește criptare avansată și respectă cele mai înalte standarde de securitate.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Plăți internaționale</h4>
                  <p className="text-sm text-muted-foreground">
                    Acceptă carduri din întreaga lume și primește banii direct în contul tău.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Rapoarte detaliate</h4>
                  <p className="text-sm text-muted-foreground">
                    Accesează istoricul tranzacțiilor și rapoarte financiare direct din contul tău Stripe.
                  </p>
                </div>
              </div>
            </div>
          </StyledCard>
        </div>
      </Section>
    </Layout>
  );
};

export default ConnectStripe;
