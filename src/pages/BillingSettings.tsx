
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { StyledCard, StyledCardHeader, StyledCardContent, StyledCardTitle } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, PlusCircle, Wallet, Download, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";

const BillingSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      default: true
    },
    {
      id: "pm_2",
      type: "card",
      brand: "mastercard",
      last4: "5555",
      expMonth: 6,
      expYear: 2024,
      default: false
    }
  ]);

  const [invoices, setInvoices] = useState([
    {
      id: "inv_1",
      number: "INV-001",
      date: "2025-03-15",
      amount: 49.99,
      status: "paid"
    },
    {
      id: "inv_2",
      number: "INV-002",
      date: "2025-02-15",
      amount: 49.99,
      status: "paid"
    },
    {
      id: "inv_3",
      number: "INV-003",
      date: "2025-01-15",
      amount: 49.99,
      status: "paid"
    }
  ]);

  const handleSetDefaultCard = (id: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setPaymentMethods(methods => 
        methods.map(method => ({
          ...method,
          default: method.id === id
        }))
      );
      
      setIsLoading(false);
      toast({
        title: "Metodă implicită actualizată",
        description: "Metoda de plată implicită a fost actualizată cu succes.",
      });
    }, 800);
  };
  
  const handleRemoveCard = (id: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setPaymentMethods(methods => methods.filter(method => method.id !== id));
      
      setIsLoading(false);
      toast({
        title: "Metodă eliminată",
        description: "Metoda de plată a fost eliminată cu succes.",
      });
    }, 800);
  };
  
  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="vizitator" />
        </Section>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Section>
        <PageHeader
          icon={CreditCard}
          title="Setări de plată"
          description="Gestionează metodele de plată și vizualizează istoricul facturilor"
          gradient={true}
        />
        
        <div className="grid grid-cols-1 gap-6">
          {/* Metode de plată */}
          <StyledCard>
            <StyledCardHeader>
              <StyledCardTitle className="flex items-center justify-between">
                <span>Metode de plată</span>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adaugă metodă nouă
                </Button>
              </StyledCardTitle>
            </StyledCardHeader>
            <StyledCardContent>
              {paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                          {method.brand === "visa" ? (
                            <span className="text-blue-600 font-bold">VISA</span>
                          ) : (
                            <span className="text-red-600 font-bold">MC</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">
                            •••• •••• •••• {method.last4}
                            {method.default && (
                              <Badge variant="outline" className="ml-2 text-xs">Implicit</Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expiră {method.expMonth < 10 ? `0${method.expMonth}` : method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.default && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefaultCard(method.id)}
                            disabled={isLoading}
                          >
                            Setează implicit
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemoveCard(method.id)}
                          disabled={isLoading || method.default}
                        >
                          Elimină
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed rounded-md">
                  <Wallet className="h-8 w-8 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 font-medium">Nu există metode de plată</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nu ai adăugat încă nicio metodă de plată
                  </p>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Adaugă metodă de plată
                  </Button>
                </div>
              )}
            </StyledCardContent>
          </StyledCard>
          
          {/* Facturi */}
          <StyledCard>
            <StyledCardHeader>
              <StyledCardTitle>Istoricul facturilor</StyledCardTitle>
            </StyledCardHeader>
            <StyledCardContent>
              {invoices.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <div className="grid grid-cols-4 font-medium p-3 bg-muted text-muted-foreground text-sm">
                    <div>Număr</div>
                    <div>Data</div>
                    <div>Sumă</div>
                    <div className="text-right">Acțiuni</div>
                  </div>
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="grid grid-cols-4 p-3 border-t items-center">
                      <div>{invoice.number}</div>
                      <div>{invoice.date}</div>
                      <div>{invoice.amount.toFixed(2)} EUR</div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Descarcă
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed rounded-md">
                  <p className="text-muted-foreground">Nu există facturi disponibile</p>
                </div>
              )}
            </StyledCardContent>
          </StyledCard>
          
          {/* Abonament */}
          <StyledCard>
            <StyledCardHeader>
              <StyledCardTitle>Abonamentul tău</StyledCardTitle>
            </StyledCardHeader>
            <StyledCardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 mb-4 bg-muted/30 rounded-md border">
                <div>
                  <h3 className="font-semibold text-lg">Plan Business</h3>
                  <p className="text-muted-foreground">49.99 EUR / lună</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-2 block md:inline-block md:mb-0">Activ</Badge>
                  <p className="text-xs text-muted-foreground">Se reînnoiește pe 15 mai 2025</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button variant="outline" className="flex-1">Schimbă planul</Button>
                <Button variant="destructive" className="flex-1">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Anulează abonamentul
                </Button>
              </div>
            </StyledCardContent>
          </StyledCard>
        </div>
      </Section>
    </Layout>
  );
};

export default BillingSettings;
