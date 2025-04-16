import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { 
  Section, 
  PageHeader, 
  Heading2, 
  Heading3, 
  LeadText, 
  Paragraph, 
  MutedText, 
  Grid2Cols,
  Grid3Cols,
  Grid4Cols,
  ThemedCard,
  StyledCard
} from "@/components/ui/themed-components";
import { theme } from "@/config/theme";
import { Separator } from "@/components/ui/separator";

const DesignSystem = () => {
  return (
    <Layout>
      <Section>
        <PageHeader 
          title="Sistemul de Design TapPayGo" 
          description="Un ghid complet de componente și stiluri care asigură consistența designului în întreaga aplicație."
        />

        <div className="space-y-16">
          <div>
            <Heading2 className="mb-6">Tipografie</Heading2>
            <Grid2Cols>
              <div className="space-y-8">
                <div>
                  <Heading3 className="mb-2">Titluri</Heading3>
                  <div className="space-y-4">
                    <div>
                      <h1 className={theme.typography.h1}>Heading 1</h1>
                      <MutedText>theme.typography.h1</MutedText>
                    </div>
                    <div>
                      <h2 className={theme.typography.h2}>Heading 2</h2>
                      <MutedText>theme.typography.h2</MutedText>
                    </div>
                    <div>
                      <h3 className={theme.typography.h3}>Heading 3</h3>
                      <MutedText>theme.typography.h3</MutedText>
                    </div>
                    <div>
                      <h4 className={theme.typography.h4}>Heading 4</h4>
                      <MutedText>theme.typography.h4</MutedText>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <Heading3 className="mb-2">Text</Heading3>
                  <div className="space-y-4">
                    <div>
                      <p className={theme.typography.lead}>Text lead care introduce secțiuni importante.</p>
                      <MutedText>theme.typography.lead</MutedText>
                    </div>
                    <div>
                      <p className={theme.typography.paragraph}>Paragraf standard cu informații pentru utilizatori.</p>
                      <MutedText>theme.typography.paragraph</MutedText>
                    </div>
                    <div>
                      <p className={theme.typography.muted}>Text secundar mai puțin accentuat pentru informații adiționale.</p>
                      <MutedText>theme.typography.muted</MutedText>
                    </div>
                  </div>
                </div>
              </div>
            </Grid2Cols>
          </div>

          <Separator />

          <div>
            <Heading2 className="mb-6">Efecte și Gradiente</Heading2>
            <Grid3Cols>
              <ThemedCard>
                <h3 className={theme.effects.gradient.primary}>Gradient Primary</h3>
                <MutedText>theme.effects.gradient.primary</MutedText>
              </ThemedCard>
              <ThemedCard>
                <h3 className={theme.effects.gradient.subtle}>Gradient Subtle</h3>
                <MutedText>theme.effects.gradient.subtle</MutedText>
              </ThemedCard>
              <ThemedCard>
                <h3 className={theme.effects.gradient.accent}>Gradient Accent</h3>
                <MutedText>theme.effects.gradient.accent</MutedText>
              </ThemedCard>
            </Grid3Cols>
          </div>

          <Separator />

          <div>
            <Heading2 className="mb-6">Carduri</Heading2>
            <Grid3Cols>
              <ThemedCard variant="base">
                <h3 className={theme.typography.h3}>Card Standard</h3>
                <Paragraph>Cardul de bază pentru conținut.</Paragraph>
                <MutedText>variant="base"</MutedText>
              </ThemedCard>
              <ThemedCard variant="interactive">
                <h3 className={theme.typography.h3}>Card Interactiv</h3>
                <Paragraph>Card cu efect de hover pentru elemente interactive.</Paragraph>
                <MutedText>variant="interactive"</MutedText>
              </ThemedCard>
              <ThemedCard variant="highlight">
                <h3 className={theme.typography.h3}>Card Evidențiat</h3>
                <Paragraph>Card pentru informații importante.</Paragraph>
                <MutedText>variant="highlight"</MutedText>
              </ThemedCard>
            </Grid3Cols>
            
            <div className="mt-8">
              <Heading3 className="mb-4">Carduri Stilizate</Heading3>
              <Grid3Cols>
                <StyledCard variant="default">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">Card Default</h3>
                    <p className="text-muted-foreground">Cu gradient animat</p>
                  </div>
                </StyledCard>
                <StyledCard variant="gradient" gradient={false}>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">Card Gradient</h3>
                    <p className="text-muted-foreground">Fără gradient animat</p>
                  </div>
                </StyledCard>
                <StyledCard variant="transparent" gradient={false}>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">Card Transparent</h3>
                    <p className="text-muted-foreground">Cu fundal semi-transparent</p>
                  </div>
                </StyledCard>
              </Grid3Cols>
            </div>
          </div>

          <Separator />

          <div>
            <Heading2 className="mb-6">Grid Layout</Heading2>
            <div className="space-y-8">
              <div>
                <Heading3 className="mb-4">Grid cu 2 Coloane</Heading3>
                <Grid2Cols>
                  <ThemedCard>Coloana 1</ThemedCard>
                  <ThemedCard>Coloana 2</ThemedCard>
                </Grid2Cols>
              </div>
              
              <div>
                <Heading3 className="mb-4">Grid cu 3 Coloane</Heading3>
                <Grid3Cols>
                  <ThemedCard>Coloana 1</ThemedCard>
                  <ThemedCard>Coloana 2</ThemedCard>
                  <ThemedCard>Coloana 3</ThemedCard>
                </Grid3Cols>
              </div>
              
              <div>
                <Heading3 className="mb-4">Grid cu 4 Coloane</Heading3>
                <Grid4Cols>
                  <ThemedCard>Coloana 1</ThemedCard>
                  <ThemedCard>Coloana 2</ThemedCard>
                  <ThemedCard>Coloana 3</ThemedCard>
                  <ThemedCard>Coloana 4</ThemedCard>
                </Grid4Cols>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Heading2 className="mb-6">Butoane</Heading2>
            <div className="flex flex-wrap gap-4">
              <Button className={theme.components.button.primary}>Buton Primary</Button>
              <Button className={theme.components.button.secondary}>Buton Secondary</Button>
              <Button className={theme.components.button.outline}>Buton Outline</Button>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default DesignSystem;
