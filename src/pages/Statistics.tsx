
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Activity, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionsBarChart } from "@/components/transactions/TransactionsBarChart";
import { TransactionsPieChart } from "@/components/transactions/TransactionsPieChart";
import { useQuery } from "@tanstack/react-query";
import { prepareChartData, preparePieData } from "@/utils/chart-utils";
import { Transaction } from "@/types/transactions";

// Mock data for demonstration purposes
const mockTransactions: Transaction[] = [
  { id: "1", user_id: "1", amount: 120, status: "completed", created_at: new Date().toISOString() },
  { id: "2", user_id: "1", amount: 75, status: "pending", created_at: new Date().toISOString() },
  { id: "3", user_id: "1", amount: 50, status: "failed", created_at: new Date().toISOString() },
  { id: "4", user_id: "1", amount: 200, status: "completed", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "5", user_id: "1", amount: 100, status: "completed", created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "6", user_id: "1", amount: 80, status: "failed", created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: "7", user_id: "1", amount: 60, status: "pending", created_at: new Date(Date.now() - 86400000 * 4).toISOString() },
];

const Statistics = () => {
  const { data: transactions = mockTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      // In a real app, this would fetch from an API
      return mockTransactions;
    },
  });

  const barChartData = prepareChartData(transactions);
  const pieChartData = preparePieData(transactions);

  return (
    <Layout>
      <div className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              Statistici
            </h1>
            <p className="text-muted-foreground mt-1">
              Analizează activitatea și tranzacțiile tale
            </p>
          </div>

          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Zilnic</TabsTrigger>
              <TabsTrigger value="weekly">Săptămânal</TabsTrigger>
              <TabsTrigger value="monthly">Lunar</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Plăți totale</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      +2.5% față de ieri
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sumă încasată</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,250 Lei</div>
                    <p className="text-xs text-muted-foreground">
                      +18.1% față de ieri
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Activitate pe ore</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[350px]">
                      <TransactionsBarChart data={barChartData} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Tipuri de plăți</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[350px]">
                      <TransactionsPieChart data={pieChartData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Alte conținuturi de taburi (similar structurate) */}
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Statistici săptămânale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Statisticile săptămânale vor fi disponibile în curând.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Statistici lunare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Statisticile lunare vor fi disponibile în curând.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="yearly">
              <Card>
                <CardHeader>
                  <CardTitle>Statistici anuale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Statisticile anuale vor fi disponibile în curând.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
