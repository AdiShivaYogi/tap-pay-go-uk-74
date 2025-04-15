
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Languages, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Translations = () => {
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
                <Languages className="h-8 w-8 text-primary" />
                Management Traduceri
              </h1>
              <p className="text-muted-foreground mt-1">
                Integrare cu DeepL API pentru traducerea automată a conținutului
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Integrare DeepL API</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Conectați-vă contul DeepL pentru a activa traducerea automată a conținutului în multiple limbi
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Button className="gap-2">
                      <FileText className="h-4 w-4" />
                      Configurare DeepL API
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Limbi suportate:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Engleză (EN)</li>
                      <li>Franceză (FR)</li>
                      <li>Germană (DE)</li>
                      <li>Spaniolă (ES)</li>
                      <li>Italiană (IT)</li>
                      <li>Portugheză (PT)</li>
                      <li>Olandeză (NL)</li>
                      <li>Poloneză (PL)</li>
                      <li>Rusă (RU)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Translations;

