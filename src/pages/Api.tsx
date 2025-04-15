
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiDocumentation } from "@/components/api/ApiDocumentation";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Code } from "lucide-react";

const Api = () => {
  const { isAdmin, role } = useUserRole();

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={Code}
            title="API Documentation"
            description="Documentație completă pentru integrarea API"
          />
          
          <div className="space-y-6 max-w-[1400px] mx-auto">
            {!isAdmin && (
              <AccessRestrictionAlert role={role} />
            )}
            
            <ApiDocumentation />
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default Api;
