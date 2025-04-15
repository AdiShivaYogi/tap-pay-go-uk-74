
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Activity, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionsBarChart } from "@/components/transactions/TransactionsBarChart";
import { TransactionsPieChart } from "@/components/transactions/TransactionsPieChart";

const Statistics = () => {
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
                    <TransactionsBarChart height={350} />
                  </CardContent>
                </Card>
                <Card className="col-span-2 md:col-span-1">
                  <CardHeader>
                    <CardTitle>Tipuri de plăți</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TransactionsPieChart height={350} />
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
