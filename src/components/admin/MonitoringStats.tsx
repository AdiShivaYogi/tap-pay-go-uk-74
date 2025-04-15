import { StyledCard, StyledCardHeader, StyledCardContent, StyledCardTitle, StyledCardDescription } from "@/components/ui/card-variants";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MonitoringStatsProps {
  isLoading: boolean;
  stats: {
    totalTransactions: number;
    suspiciousTransactions: number;
    successRate: number;
    averageAmount: number;
    recentAlerts: {
      id: string;
      type: 'warning' | 'error' | 'success';
      message: string;
      timestamp: string;
    }[];
  };
}

export const MonitoringStats = ({ isLoading, stats }: MonitoringStatsProps) => {
  const getAlertIcon = (type: 'warning' | 'error' | 'success') => {
    switch (type) {
      case 'warning':
        return <Bell className="h-4 w-4" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (type: 'warning' | 'error' | 'success') => {
    switch (type) {
      case 'warning':
        return 'outline';
      case 'error':
        return 'destructive';
      case 'success':
        return 'default';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StyledCard variant="gradient">
        <StyledCardHeader>
          <StyledCardTitle>Monitorizare Tranzacții</StyledCardTitle>
          <StyledCardDescription>
            Statistici agregate, fără expunerea datelor sensibile
          </StyledCardDescription>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium">Total Tranzacții</p>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{stats.totalTransactions}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">Rata de Succes</p>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-1" />
              ) : (
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">Tranzacții Suspecte</p>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-1" />
              ) : (
                <p className="text-2xl font-bold text-amber-600">
                  {stats.suspiciousTransactions}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">Valoare Medie</p>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-1" />
              ) : (
                <p className="text-2xl font-bold">
                  £{stats.averageAmount.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </StyledCardHeader>
      </StyledCard>

      <StyledCard variant="gradient">
        <StyledCardHeader>
          <StyledCardTitle>Alerte Recente</StyledCardTitle>
          <StyledCardDescription>
            Notificări despre activități neobișnuite
          </StyledCardDescription>
          <div className="space-y-4 mt-4">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </>
            ) : (
              stats.recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={getAlertVariant(alert.type)}>
                      {getAlertIcon(alert.type)}
                    </Badge>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </StyledCardHeader>
      </StyledCard>
    </div>
  );
};
