
import { Layout } from "@/components/layout/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { SecuritySettings } from "@/components/security/SecuritySettings";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserCircle, Shield, Settings, CreditCard, BellRing } from "lucide-react";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Link, useNavigate } from "react-router-dom";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Layout>
        <Section>
          <div className="text-center py-8">
            <h1 className="text-2xl font-semibold">Trebuie să fiți autentificat</h1>
            <p className="mt-2 text-muted-foreground">
              Vă rugăm să vă autentificați pentru a accesa setările contului.
            </p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={UserCircle}
          title="Setări Cont"
          description="Gestionați setările și preferințele contului dvs."
          gradient={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle>Meniu Setări</StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent className="p-0">
                <div className="flex flex-col">
                  <Link to="/account/profile" className="flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b">
                    <UserCircle className="h-5 w-5 text-primary" />
                    <span>Profil</span>
                  </Link>
                  <Link to="/account" className="flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b bg-accent/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Securitate</span>
                  </Link>
                  <Link to="/account/billing" className="flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Plăți și facturare</span>
                  </Link>
                  <Link to="/account/notifications" className="flex items-center gap-3 p-4 hover:bg-accent transition-colors">
                    <BellRing className="h-5 w-5 text-primary" />
                    <span>Notificări</span>
                  </Link>
                </div>
              </StyledCardContent>
            </StyledCard>
          </div>
          
          <div className="md:col-span-2">
            <SecuritySettings />
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Account;
