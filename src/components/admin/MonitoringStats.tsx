
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MonitoringStatsProps {
  isLoading: boolean;
  stats: {
    totalTransactions: number;
    averageAmount: number;
    activeUsers: number;
    successRate: number;
  };
}

export const MonitoringStats = ({ isLoading, stats }: MonitoringStatsProps) => {
  return (
    <>
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Monitorizare Etică</AlertTitle>
        <AlertDescription>
          Monitorizăm doar date agregate, fără acces la informații sensibile despre tranzacții.
          Toate datele sensibile sunt gestionate exclusiv de Stripe.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tranzacții</CardDescription>
            <CardTitle className="text-2xl">
              {isLoading ? <Skeleton className="h-8 w-20" /> : stats.totalTransactions}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Număr total de încercări de plată
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Valoare Medie</CardDescription>
            <CardTitle className="text-2xl">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                `£${stats.averageAmount.toFixed(2)}`
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Media valorii tranzacțiilor reușite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Utilizatori Activi</CardDescription>
            <CardTitle className="text-2xl">
              {isLoading ? <Skeleton className="h-8 w-20" /> : stats.activeUsers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Utilizatori cu cel puțin o tranzacție
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rata de Succes</CardDescription>
            <CardTitle className="text-2xl">
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                `${stats.successRate.toFixed(1)}%`
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Procentaj tranzacții finalizate cu succes
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
