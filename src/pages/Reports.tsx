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
  const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
  const [selectedRange, setSelectedRange] = useState<{ label: string; value: string } | null>(null);

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
              <StyledCardTitle>Selectează perioada</StyledCardTitle>
            </StyledCardHeader>
            <StyledCardContent>
              <DateRangeSelector
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
            </StyledCardContent>
          </StyledCard>

          <ReportStats startDate={startDate} endDate={endDate} />
        </Grid2Cols>

        <Section variant="alt">
          <ReportCharts startDate={startDate} endDate={endDate} />
        </Section>
      </Section>
    </Layout>
  );
};

export default Reports;
