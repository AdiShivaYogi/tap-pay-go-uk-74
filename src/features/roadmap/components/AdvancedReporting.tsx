
import { BarChart4, ArrowUpRight, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useReportingData } from "@/hooks/use-reporting-data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdvancedReporting = () => {
  const { data: reportingData, isLoading } = useReportingData();

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription className="flex items-center gap-2">
          <BarChart4 className="h-4 w-4" />
          <span>Sistem de raportare avansat - Date în timp real</span>
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Volum Tranzacții
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Se încarcă...</span>
              </div>
            ) : (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportingData?.volumeData || []}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#2563eb"
                      fill="#3b82f6"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sumar Venituri
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Se încarcă...</span>
              </div>
            ) : (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportingData?.revenueData || []}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#16a34a"
                      fill="#22c55e"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Analiză Pattern-uri
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">Se încarcă...</span>
              </div>
            ) : (
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reportingData?.patternsData || []}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#9333ea"
                      fill="#a855f7"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
