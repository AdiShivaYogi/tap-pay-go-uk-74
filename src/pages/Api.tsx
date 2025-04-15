
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiDocumentation } from "@/components/api/ApiDocumentation";

const Api = () => {
  const { isAdmin, role } = useUserRole();

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container py-8">
          <div className="space-y-6 max-w-[1400px] mx-auto">
            {!isAdmin && (
              <AccessRestrictionAlert role={role} />
            )}
            
            <ApiDocumentation />
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Api;
