
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Grid2Cols } from "@/components/ui/layout/grid";
import { DateRangeSelector } from "@/components/reports/DateRangeSelector";
import { ReportStats } from "@/components/reports/ReportStats";
import { ReportCharts } from "@/components/reports/ReportCharts";
import { useDateRange } from "@/hooks/use-date-range";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { FileBarChart } from "lucide-react";

const Reports = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedRange, setSelectedRange] = useState<{ label: string; value: string } | null>(null);

  const dateRange = {
    startDate: date,
    endDate: date
  };

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={FileBarChart}
          title="Rapoarte și Analitice"
          description="Analizează datele și generează rapoarte personalizate"
        />

        <Grid2Cols>
          <StyledCard>
            <StyledCardHeader>
              <StyledCardTitle>Selectează data</StyledCardTitle>
            </StyledCardHeader>
            <StyledCardContent>
              <DateRangeSelector
                date={date}
                setDate={setDate}
                defaultDate={new Date()}
              />
            </StyledCardContent>
          </StyledCard>

          <ReportStats startDate={date} endDate={date} />
        </Grid2Cols>

        <Section variant="alt">
          <ReportCharts dateRange={{ startDate: date, endDate: date }} />
        </Section>
      </Section>
    </Layout>
  );
};

export default Reports;
