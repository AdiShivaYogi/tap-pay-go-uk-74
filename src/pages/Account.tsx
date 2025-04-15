
import { Layout } from "@/components/layout/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { SecuritySettings } from "@/components/security/SecuritySettings";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Shield, Settings, CreditCard } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { PageHeader } from "@/components/ui/page-header";

const Account = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <SectionContainer>
          <div className="text-center py-8">
            <h1 className="text-2xl font-semibold">Trebuie să fiți autentificat</h1>
            <p className="mt-2 text-muted-foreground">
              Vă rugăm să vă autentificați pentru a accesa setările contului.
            </p>
          </div>
        </SectionContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={UserCircle}
          title="Setări Cont"
          description="Gestionați setările și preferințele contului dvs."
        />

        <div className="space-y-6">
          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Securitate</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Plăți</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold">Profil</h2>
                <Separator />
                <div className="p-4">
                  <p>Setările de profil vor fi implementate în curând.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold">Securitate</h2>
                <Separator />
                <SecuritySettings />
              </div>
            </TabsContent>
            
            <TabsContent value="billing">
              <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold">Plăți</h2>
                <Separator />
                <div className="p-4">
                  <p>Setările de plăți vor fi implementate în curând.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Account;
