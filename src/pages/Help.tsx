import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols } from "@/components/ui/layout/grid";
import { StyledCard } from "@/components/ui/cards";
import { HelpCircle, FileText, MessageCircle, Video, Mail, LifeBuoy } from "lucide-react";

const Help = () => {
  return (
    <Layout>
      <Section variant="default">
        <PageHeader
          icon={HelpCircle}
          title="Centru de ajutor"
          description="Găsește răspunsuri la întrebările tale sau contactează echipa noastră de suport"
        />
        
        <Grid2Cols>
          <StyledCard className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4 p-4">
              <FileText className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Documentație</h3>
                <p className="text-sm text-muted-foreground">Găsește ghiduri detaliate și tutoriale</p>
              </div>
            </div>
          </StyledCard>
          
          <StyledCard className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4 p-4">
              <MessageCircle className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Comunitate</h3>
                <p className="text-sm text-muted-foreground">Conectează-te cu alți utilizatori și experți</p>
              </div>
            </div>
          </StyledCard>
          
          <StyledCard className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4 p-4">
              <Video className="h-6 w-6 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">Tutoriale Video</h3>
                <p className="text-sm text-muted-foreground">Urmărește tutoriale video pas cu pas</p>
              </div>
            </div>
          </StyledCard>
          
          <StyledCard className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4 p-4">
              <Mail className="h-6 w-6 text-orange-500" />
              <div>
                <h3 className="text-lg font-semibold">Contactează-ne</h3>
                <p className="text-sm text-muted-foreground">Trimite un mesaj echipei noastre de suport</p>
              </div>
            </div>
          </StyledCard>
        </Grid2Cols>
        
        <Section variant="alt">
          <StyledCard>
            <div className="flex items-center space-x-4 p-4">
              <LifeBuoy className="h-6 w-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Întrebări frecvente</h3>
                <p className="text-sm text-muted-foreground">Răspunsuri la cele mai comune întrebări</p>
              </div>
            </div>
          </StyledCard>
        </Section>
      </Section>
    </Layout>
  );
};

export default Help;
