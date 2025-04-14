
import { BarChart4, ArrowUpRight, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AdvancedReporting = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription className="flex items-center gap-2">
          <BarChart4 className="h-4 w-4" />
          <span>Sistem de raportare în dezvoltare - Prioritate Înaltă</span>
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
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">În implementare</span>
            </div>
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
            <div className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">În curând</span>
            </div>
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
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-muted-foreground">În curând</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
