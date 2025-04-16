import React from 'react';
import { StyledCard } from "@/components/ui/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ApiFeaturesList } from './ApiFeaturesList';
import { ApiAccessRequestForm } from './ApiAccessRequestForm';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const ApiDocumentation = () => {
  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Declarație de declinare a responsabilității</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            Utilizarea API-ului nostru este condiționată de următoarele aspecte:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Este <strong>obligatoriu</strong> să dețineți un cont Stripe activ și validat.
            </li>
            <li>
              Accesul la API este exclusiv pentru utilizatorii care au trecut de procesul de verificare și aprobare.
            </li>
            <li>
              TapPayGo nu răspunde pentru pierderile sau daunele rezultate din utilizarea necorespunzătoare a API-ului.
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      <StyledCard variant="default" className="p-6">
        <h1 className="text-3xl font-bold mb-2">API Enterprise</h1>
        <p className="text-muted-foreground mb-6">
          Accesează funcționalitățile platformei noastre prin API-ul Enterprise, 
          disponibil exclusiv pentru abonații planului API Enterprise.
        </p>
        
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Prezentare generală</TabsTrigger>
            <TabsTrigger value="authentication">Autentificare</TabsTrigger>
            <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Prezentare API</h2>
              <p className="text-muted-foreground">
                API-ul nostru REST oferă acces programatic la funcționalitățile 
                platformei de procesare a plăților contactless. Puteți integra 
                aceste funcționalități direct în aplicațiile și sistemele proprii.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Cum funcționează</h2>
              <p className="text-muted-foreground">
                După aprobarea cererii de acces, veți primi credențiale API unice
                (API key și secret) care vă vor permite să efectuați request-uri 
                autentificate către endpoint-urile API.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md border border-muted">
              <h3 className="text-md font-medium mb-2">Format date</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Toate request-urile și response-urile API folosesc formatul JSON.
              </p>
              <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                {`// Exemplu de request
{
  "amount": 100.00,
  "currency": "RON",
  "description": "Plată pentru servicii"
}

// Exemplu de response
{
  "success": true,
  "transaction_id": "tx_123456789",
  "status": "completed",
  "amount": 100.00,
  "currency": "RON",
  "created_at": "2025-04-15T12:00:00Z"
}`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication" className="space-y-4 mt-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Autentificare API</h2>
              <p className="text-muted-foreground mb-4">
                Autentificarea la API se face utilizând un API key și un secret. 
                Acestea trebuie transmise în headerele HTTP pentru fiecare request.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-md border border-muted">
                <h3 className="text-md font-medium mb-2">Header-uri de autentificare</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                  {`// Exemplu de header-uri HTTP
{
  "X-Api-Key": "api_key_123456789",
  "X-Api-Secret": "api_secret_123456789",
  "Content-Type": "application/json"
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Securitate</h2>
              <p className="text-muted-foreground">
                Toate request-urile către API sunt criptate utilizând HTTPS. 
                Pentru securitate maximă, nu partajați niciodată credențialele 
                API și nu le stocați în codul sursă public.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="rate-limits" className="space-y-4 mt-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Rate Limiting</h2>
              <p className="text-muted-foreground mb-4">
                Pentru a asigura performanța și disponibilitatea API-ului, 
                aplicăm limite de rate pentru request-uri:
              </p>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>10.000 request-uri / lună incluse în abonamentul de bază</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Maximum 100 request-uri / minut</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>£0.01 per request peste limita lunară</span>
                </li>
              </ul>
              
              <div className="bg-muted/50 p-4 rounded-md border border-muted">
                <h3 className="text-md font-medium mb-2">Header-uri Rate Limit</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Response-urile API includ header-uri care indică statusul rate limit-ului:
                </p>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto">
                  {`// Exemplu de header-uri pentru rate limiting
{
  "X-RateLimit-Limit": "10000",      // Limita totală lunară
  "X-RateLimit-Remaining": "9950",   // Request-uri rămase în luna curentă
  "X-RateLimit-Reset": "1714329600"  // Timestamp Unix pentru resetarea contorului
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </StyledCard>

      <ApiFeaturesList />
      
      <Separator className="my-8" />
      
      <ApiAccessRequestForm />
    </div>
  );
};
