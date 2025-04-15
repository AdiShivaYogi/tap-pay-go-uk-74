
import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleSlash, CheckCircle2, CircleDot } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Status = () => {
  const services = [
    {
      name: "Plăți Contactless",
      status: "operational",
      description: "Procesarea plăților funcționează normal"
    },
    {
      name: "Autentificare",
      status: "operational",
      description: "Sistemul de autentificare funcționează normal"
    },
    {
      name: "API",
      status: "development",
      description: "API-ul este în dezvoltare activă"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case "development":
        return <CircleSlash className="h-6 w-6 text-amber-500" />;
      default:
        return <CircleDot className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold mb-6">Status Sistem</h1>
            
            <Alert>
              <AlertTitle className="text-lg font-semibold mb-2">
                Status General: Operațional
              </AlertTitle>
              <AlertDescription>
                Monitorizăm constant toate sistemele pentru a asigura cea mai bună experiență.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg bg-card flex items-start gap-4"
                >
                  {getStatusIcon(service.status)}
                  <div>
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Status;
