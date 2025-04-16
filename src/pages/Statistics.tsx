import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols, Grid3Cols } from "@/components/ui/layout/grid";
import { StyledCard } from "@/components/ui/cards";
import { BarChart2, TrendingUp, PieChart, Calendar, Filter } from "lucide-react";

const Statistics = () => {
  return (
    <Layout>
      <Section variant="default">
        <PageHeader
          icon={BarChart2}
          title="Statistici și Analize"
          description="Monitorizează performanța afacerii tale cu ajutorul statisticilor detaliate"
        />
        
        <Grid2Cols>
          <StyledCard variant="default">
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Venituri Totale</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold">£12,500</div>
              <p className="text-xs text-muted-foreground">
                +15% față de luna trecută
              </p>
            </div>
          </StyledCard>
          
          <StyledCard variant="default">
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Număr de Tranzacții</h3>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">320</div>
              <p className="text-xs text-muted-foreground">
                +8% față de luna trecută
              </p>
            </div>
          </StyledCard>
        </Grid2Cols>
        
        <Section variant="alt">
          <Grid3Cols>
            <StyledCard variant="default">
              <div className="p-6 space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Top Categorie Produse</h3>
                <div className="text-xl font-bold">Îmbrăcăminte</div>
                <p className="text-xs text-muted-foreground">
                  Vânzări: £4,500
                </p>
              </div>
            </StyledCard>
            
            <StyledCard variant="default">
              <div className="p-6 space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Metodă de Plată Preferată</h3>
                <div className="text-xl font-bold">Card Bancar</div>
                <p className="text-xs text-muted-foreground">
                  75% din tranzacții
                </p>
              </div>
            </StyledCard>
            
            <StyledCard variant="default">
              <div className="p-6 space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Locație Principală Clienți</h3>
                <div className="text-xl font-bold">Londra</div>
                <p className="text-xs text-muted-foreground">
                  40% din clienți
                </p>
              </div>
            </StyledCard>
          </Grid3Cols>
        </Section>
        
        <Section>
          <Grid2Cols>
            <StyledCard variant="default">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Distribuția Vânzărilor</h3>
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <PieChart className="h-48 w-full" />
              </div>
            </StyledCard>
            
            <StyledCard variant="default">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Evoluția Vânzărilor Lunare</h3>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <BarChart2 className="h-48 w-full" />
              </div>
            </StyledCard>
          </Grid2Cols>
        </Section>
      </Section>
    </Layout>
  );
};

export default Statistics;
