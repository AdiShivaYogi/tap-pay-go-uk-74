
import { Layout } from "@/components/layout/layout";
import { BarChart2, PieChart, RefreshCcw } from "lucide-react";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReportStats } from "@/components/reports/ReportStats";
import { ReportCharts } from "@/components/reports/ReportCharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Statistics = () => {
  const [period, setPeriod] = useState<"week" | "month" | "all">("month");
  const deviceCompatibility = useDeviceCompatibility();
  
  const { data: transactions = [], isLoading, refetch } = useQuery({
    queryKey: ['transactions', period],
    queryFn: async () => {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Filtrare după perioadă
      const now = new Date();
      if (period === "week") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        query = query.gte('created_at', weekAgo.toISOString());
      } else if (period === "month") {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        query = query.gte('created_at', monthAgo.toISOString());
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return (
    <Layout>
      <SectionContainer>
        <PageHeader
          icon={BarChart2}
          title="Statistici"
          description="Analizează tendințele plăților și performanța tranzacțiilor"
        />
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Privire de Ansamblu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refetch()}
                className="h-8 w-8"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Perioadă:</span>
              <Select value={period} onValueChange={(value: "week" | "month" | "all") => setPeriod(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selectează perioada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Ultima săptămână</SelectItem>
                  <SelectItem value="month">Ultima lună</SelectItem>
                  <SelectItem value="all">Tot istoricul</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <ReportStats transactions={transactions} isLoading={isLoading} />
          
          <ReportCharts transactions={transactions} isLoading={isLoading} period={period} />
          
          <StyledCard className="border-primary/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <span>Analiza Plăților</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Metode de Plată Populare</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Visa</span>
                      <span className="font-medium">73%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">MasterCard</span>
                      <span className="font-medium">24%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Alte carduri</span>
                      <span className="font-medium">3%</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Ore de Vârf pentru Plăți</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Dimineață (8-12)</span>
                      <span className="font-medium">32%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">După-amiază (12-17)</span>
                      <span className="font-medium">45%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Seara (17-22)</span>
                      <span className="font-medium">23%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </StyledCard>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default Statistics;
