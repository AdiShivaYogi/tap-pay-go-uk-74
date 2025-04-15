
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Key, Shield } from "lucide-react";

const Api = () => {
  const { isAdmin, role } = useUserRole();

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container py-8">
          <div className="space-y-6 max-w-[1400px] mx-auto">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FileCode className="h-8 w-8 text-primary" />
                Documentație API
              </h1>
              <p className="text-muted-foreground mt-1">
                Resurse și documentație pentru integrarea cu API-ul nostru
              </p>
            </div>

            <Tabs defaultValue="endpoints" className="space-y-4">
              <TabsList>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="authentication">Autentificare</TabsTrigger>
                <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
              </TabsList>

              <TabsContent value="endpoints" className="space-y-4">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Endpoints API</h2>
                  <div className="space-y-4">
                    <p>Documentația detaliată pentru fiecare endpoint va fi disponibilă în curând.</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="authentication" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Autentificare</h2>
                  </div>
                  <div className="space-y-4">
                    <p>Detalii despre metodele de autentificare vor fi disponibile în curând.</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="rate-limits" className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold">Rate Limits</h2>
                  </div>
                  <div className="space-y-4">
                    <p>Informații despre limitele de rate și politicile de utilizare vor fi disponibile în curând.</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Api;
