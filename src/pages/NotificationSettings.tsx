
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { StyledCard, StyledCardHeader, StyledCardContent, StyledCardTitle } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { BellRing, Save, Mail, MessageSquare, CreditCard, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";

const NotificationSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [notifications, setNotifications] = useState({
    // Email notifications
    emailTransactions: true,
    emailNewFeatures: false,
    emailSecurity: true,
    emailMarketing: false,
    emailSummary: true,
    
    // Push notifications
    pushTransactions: true,
    pushNewFeatures: true,
    pushSecurity: true,
    pushBilling: true
  });
  
  const handleToggle = (field: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Setări actualizate",
        description: "Preferințele tale de notificare au fost salvate cu succes.",
      });
    }, 1000);
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
          icon={BellRing}
          title="Setări notificări"
          description="Personalizează preferințele tale de notificare și comunicare"
          gradient={true}
        />
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSaveSettings();
        }}>
          <div className="grid grid-cols-1 gap-6">
            {/* Notificări prin email */}
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Notificări prin email
                </StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tranzacții și plăți</h4>
                      <p className="text-sm text-muted-foreground">
                        Primește notificări despre tranzacțiile tale și starea plăților
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailTransactions}
                      onCheckedChange={() => handleToggle("emailTransactions")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Caracteristici noi</h4>
                      <p className="text-sm text-muted-foreground">
                        Află despre noile caracteristici și actualizările platformei
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNewFeatures}
                      onCheckedChange={() => handleToggle("emailNewFeatures")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Alerte de securitate</h4>
                      <p className="text-sm text-muted-foreground">
                        Primește alerte importante privind securitatea contului
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailSecurity}
                      onCheckedChange={() => handleToggle("emailSecurity")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Noutăți și marketing</h4>
                      <p className="text-sm text-muted-foreground">
                        Primește oferte promoționale și informații despre evenimente
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailMarketing}
                      onCheckedChange={() => handleToggle("emailMarketing")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Raport săptămânal</h4>
                      <p className="text-sm text-muted-foreground">
                        Primește un rezumat săptămânal al activității contului tău
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailSummary}
                      onCheckedChange={() => handleToggle("emailSummary")}
                    />
                  </div>
                </div>
              </StyledCardContent>
            </StyledCard>
            
            {/* Notificări push */}
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Notificări push
                </StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tranzacții</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificări în timp real despre tranzacțiile procesate
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushTransactions}
                      onCheckedChange={() => handleToggle("pushTransactions")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Caracteristici noi</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificări despre noile caracteristici și actualizări
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNewFeatures}
                      onCheckedChange={() => handleToggle("pushNewFeatures")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Securitate</h4>
                      <p className="text-sm text-muted-foreground">
                        Alerte de securitate și autentificări noi
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushSecurity}
                      onCheckedChange={() => handleToggle("pushSecurity")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Plăți și facturare</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificări despre plățile procesate și facturi emise
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushBilling}
                      onCheckedChange={() => handleToggle("pushBilling")}
                    />
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <ShieldAlert className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Notificări obligatorii</h4>
                    <p className="text-sm text-yellow-700">
                      Anumite notificări critice de securitate și de conformitate nu pot fi dezactivate deoarece sunt necesare pentru protecția contului tău.
                    </p>
                  </div>
                </div>
              </StyledCardContent>
            </StyledCard>
            
            {/* Butoane de acțiune */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">Resetează la valorile implicite</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  "Se salvează..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvează setările
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Section>
    </Layout>
  );
};

export default NotificationSettings;
