import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { StyledCard } from "@/components/ui/cards";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const ApiAccessRequestForm = () => {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [useCase, setUseCase] = useState('');
  const [expectedVolume, setExpectedVolume] = useState('');
  const [hasStripeAccount, setHasStripeAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasStripeAccount) {
      toast({
        title: "Cont Stripe necesar",
        description: "Trebuie să confirmați că dețineți un cont Stripe pentru a solicita acces API.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Autentificare necesară",
        description: "Trebuie să fiți autentificat pentru a solicita acces API.",
        variant: "destructive"
      });
      return;
    }

    if (!companyName || !useCase || !expectedVolume) {
      toast({
        title: "Formular incomplet",
        description: "Vă rugăm să completați toate câmpurile obligatorii.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('request-api-access', {
        body: {
          companyName,
          useCase,
          expectedVolume,
          userEmail: user.email
        }
      });

      if (error) throw error;

      toast({
        title: "Solicitare trimisă cu succes",
        description: "Vom reveni cu un răspuns în cel mai scurt timp posibil.",
        variant: "default"
      });

      // Reset form
      setCompanyName('');
      setUseCase('');
      setExpectedVolume('');
    } catch (error) {
      console.error('Error submitting API access request:', error);
      toast({
        title: "Eroare la trimiterea solicitării",
        description: "A apărut o eroare. Vă rugăm să încercați din nou mai târziu.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledCard variant="default" className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Solicită acces API</h2>
      
      <Alert className="mb-6">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <AlertTitle>Condiții obligatorii</AlertTitle>
        <AlertDescription>
          <p>
            Pentru a primi acces la API, aveți nevoie de:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Un cont Stripe activ și verificat</li>
            <li>Un scop valid de utilizare a API-ului</li>
            <li>Aprobare manuală din partea echipei TapPayGo</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-1">
            Numele companiei
          </label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Introduceți numele companiei"
            required
          />
        </div>
        
        <div>
          <label htmlFor="useCase" className="block text-sm font-medium mb-1">
            Descriere caz de utilizare
          </label>
          <Textarea
            id="useCase"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="Descrieți cum intenționați să utilizați API-ul nostru"
            rows={4}
            required
          />
        </div>
        
        <div>
          <label htmlFor="expectedVolume" className="block text-sm font-medium mb-1">
            Volum estimat de tranzacții
          </label>
          <Select value={expectedVolume} onValueChange={setExpectedVolume}>
            <SelectTrigger>
              <SelectValue placeholder="Selectați volumul estimat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sub_1000">Sub 1.000 tranzacții / lună</SelectItem>
              <SelectItem value="1000_5000">1.000 - 5.000 tranzacții / lună</SelectItem>
              <SelectItem value="5000_10000">5.000 - 10.000 tranzacții / lună</SelectItem>
              <SelectItem value="peste_10000">Peste 10.000 tranzacții / lună</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="stripe-account"
            checked={hasStripeAccount}
            onChange={(e) => setHasStripeAccount(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="stripe-account" className="text-sm text-gray-700">
            Confirm că dețin un cont Stripe activ
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !hasStripeAccount}
        >
          {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
        </Button>
      </form>
    </StyledCard>
  );
};
