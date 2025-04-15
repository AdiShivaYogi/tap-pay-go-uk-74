
import { Layout } from "@/components/layout/layout";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, History, Clock } from "lucide-react";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { useDeviceCompatibility } from "@/hooks/use-device-compatibility";

const Payments = () => {
  const { user } = useAuth();
  const deviceCompatibility = useDeviceCompatibility();

  return (
    <Layout>
      <div className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CreditCard className="h-8 w-8 text-primary" />
              Plăți
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestionează plățile și vezi istoricul tranzacțiilor
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Plată nouă</CardTitle>
                <CardDescription>Procesează o plată nouă</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="default">
                  <Plus className="mr-2 h-4 w-4" />
                  Plată nouă
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tranzacții recente</CardTitle>
                <CardDescription>Istoricul plăților</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <History className="mr-2 h-4 w-4" />
                  Vezi istoricul
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plăți programate</CardTitle>
                <CardDescription>Plăți recurente</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Gestionează programările
                </Button>
              </CardContent>
            </Card>
          </div>

          <PaymentForm deviceCompatibility={deviceCompatibility} />
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
