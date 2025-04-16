import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { RoadmapHeader } from "@/features/roadmap/components/RoadmapHeader";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { CurrentRoadmapFocus } from "@/features/roadmap/components/CurrentRoadmapFocus";
import { StyledCard } from "@/components/ui/cards";
import { BarChart } from "lucide-react";
import { RoadmapProvider } from "@/features/roadmap/context/RoadmapContext";
import { RoadmapProgress } from "@/features/roadmap/components/RoadmapProgress";
import { RoadmapCategories } from "@/features/roadmap/components/RoadmapCategories";
import { MVPRoadmap } from "@/features/roadmap/components/MVPRoadmap";
import { ProgressOptimizationPanel } from "@/features/roadmap/components/ProgressOptimizationPanel";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const Roadmap = () => {
  const { user } = useAuth();
  const [showMVP, setShowMVP] = useState(false);
  
  return (
    <Layout>
      <RoadmapProvider>
        <Section>
          <PageHeader
            icon={BarChart}
            title="Roadmap TapPayGo"
            description="Planul de dezvoltare și implementare a funcționalităților"
          />
          
          <RoadmapHeader onToggleMVP={() => setShowMVP(!showMVP)} showMVP={showMVP} />
          
          {!user?.isAdmin && (
            <div className="mb-8">
              <AccessRestrictionAlert />
            </div>
          )}
          
          <div className="space-y-8">
            {showMVP ? (
              <MVPRoadmap />
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CurrentRoadmapFocus />
                  </div>
                  <div>
                    <StyledCard>
                      <div className="p-6">
                        <RoadmapProgress />
                      </div>
                    </StyledCard>
                  </div>
                </div>
                
                <ProgressOptimizationPanel />
                
                <RoadmapCategories />
              </>
            )}
          </div>
        </Section>
      </RoadmapProvider>
    </Layout>
  );
};

export default Roadmap;
