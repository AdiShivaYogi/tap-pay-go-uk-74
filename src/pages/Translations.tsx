
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Languages, Globe, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface DeepLConfigForm {
  apiKey: string;
}

const Translations = () => {
  const { isAdmin, role } = useUserRole();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState('');
  
  const form = useForm<DeepLConfigForm>({
    defaultValues: {
      apiKey: "",
    },
  });

  const onSubmit = async (data: DeepLConfigForm) => {
    setLoading(true);
    setSubmitStatus('idle');
    setErrorDetails('');
    
    try {
      console.log('Submitting DeepL API key...');
      const response = await supabase.functions.invoke('set-deepl-key', {
        body: { key: data.apiKey }
      });

      if (response.error) {
        console.error('Error saving DeepL API key:', response.error);
        setSubmitStatus('error');
        setErrorDetails(response.error.message || 'Eroare la salvarea cheii API');
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu s-a putut salva cheia API",
        });
        return;
      }
      
      setSubmitStatus('success');
      toast({
        title: "Configurare reușită",
        description: "Cheia API DeepL a fost salvată cu succes",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error saving DeepL API key:', error);
      setSubmitStatus('error');
      setErrorDetails(error instanceof Error ? error.message : 'Eroare necunoscută');
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva cheia API",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container py-8">
          <div className="space-y-6 max-w-[1400px] mx-auto">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Languages className="h-8 w-8 text-primary" />
                Management Traduceri
              </h1>
              <p className="text-muted-foreground mt-1">
                Integrare cu DeepL API pentru traducerea automată a conținutului
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Integrare DeepL API</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Conectați-vă contul DeepL pentru a activa traducerea automată a conținutului în multiple limbi
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  {submitStatus === 'success' && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Cheie API salvată cu succes</AlertTitle>
                      <AlertDescription className="text-green-700">
                        Configurarea DeepL este acum completă și puteți folosi funcționalitățile de traducere.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {submitStatus === 'error' && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Eroare la salvarea cheii API</AlertTitle>
                      <AlertDescription>
                        {errorDetails || "A apărut o eroare la salvarea cheii. Vă rugăm să încercați din nou."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cheie API DeepL</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Introduceți cheia API DeepL"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Puteți găsi cheia API în panoul de control DeepL
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="gap-2" 
                        disabled={loading}
                      >
                        <FileText className="h-4 w-4" />
                        {loading ? "Se salvează..." : "Salvează cheia API"}
                      </Button>
                    </form>
                  </Form>

                  <div className="text-sm text-muted-foreground">
                    <p>Limbi suportate:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Engleză (EN)</li>
                      <li>Franceză (FR)</li>
                      <li>Germană (DE)</li>
                      <li>Spaniolă (ES)</li>
                      <li>Italiană (IT)</li>
                      <li>Portugheză (PT)</li>
                      <li>Olandeză (NL)</li>
                      <li>Poloneză (PL)</li>
                      <li>Rusă (RU)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Translations;
