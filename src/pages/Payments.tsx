
import React from "react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols, Grid3Cols } from "@/components/ui/layout/grid";
import { StyledCard } from "@/components/ui/cards";
import { CreditCard, ArrowDownUp, QrCode, Wallet, ChevronsUpDown } from "lucide-react";

const Payments = () => {
  return (
    <Layout>
      <Section variant="default">
        <PageHeader
          icon={CreditCard}
          title="Metode de plată"
          description="Alege metoda de plată preferată pentru a efectua tranzacții rapide și sigure"
        />

        <Grid3Cols>
          <StyledCard>
            <div className="p-6 space-y-2 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Card de credit/debit</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Plătește rapid și sigur cu cardul tău Visa, Mastercard sau American Express.
              </p>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-2 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Plată prin cod QR</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Scanează codul QR cu aplicația ta bancară și finalizează plata instantaneu.
              </p>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-2 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Portofel electronic</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Folosește portofele electronice precum Apple Pay, Google Pay sau PayPal.
              </p>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-2 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2">
                <ArrowDownUp className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Transfer bancar</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Efectuează un transfer bancar direct din contul tău.
              </p>
            </div>
          </StyledCard>

          <StyledCard>
            <div className="p-6 space-y-2 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2">
                <ChevronsUpDown className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-medium">Plăți recurente</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Configurează plăți automate pentru abonamente și servicii.
              </p>
            </div>
          </StyledCard>
        </Grid3Cols>
      </Section>
    </Layout>
  );
};

export default Payments;
