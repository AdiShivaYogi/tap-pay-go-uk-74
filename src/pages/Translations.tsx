
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ApiKeyForm } from "@/components/translations/ApiKeyForm";
import { SupportedLanguages } from "@/components/translations/SupportedLanguages";

// Updated interface to match the ApiKeyForm props
type APIConfigData = {
  [key: string]: string;
};

const Translations = () => {
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState('');

  const onSubmitDeepL = async (data: APIConfigData) => {
    setLoading(true);
    setSubmitStatus('idle');
    setErrorDetails('');
    
    try {
      const response = await supabase.functions.invoke('set-deepl-key', {
        body: { key: data.deeplKey }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setSubmitStatus('success');
      toast({
        title: "Configurare reușită",
        description: "Cheia API DeepL a fost salvată cu succes",
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorDetails(error instanceof Error ? error.message : 'Eroare necunoscută');
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva cheia API DeepL",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitDeepseek = async (data: APIConfigData) => {
    setLoading(true);
    setSubmitStatus('idle');
    setErrorDetails('');
    
    try {
      const response = await supabase.functions.invoke('set-deepseek-key', {
        body: { key: data.deepseekKey }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setSubmitStatus('success');
      toast({
        title: "Configurare reușită",
        description: "Cheia API Deepseek a fost salvată cu succes",
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorDetails(error instanceof Error ? error.message : 'Eroare necunoscută');
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva cheia API Deepseek",
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
              <p className="text-muted-foreground mt-1 space-y-2">
                <span className="block">
                  Integrare cu DeepL API și Deepseek API pentru traducerea automată a conținutului
                </span>
                <span className="block text-sm bg-muted p-2 rounded-md">
                  Notă: Interfața de administrare va rămâne întotdeauna în limba română, 
                  iar conținutul frontend-ului va fi tradus automat în funcție de IP-ul utilizatorului.
                </span>
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <ApiKeyForm
                  title="Integrare DeepL API"
                  description="Conectați-vă contul DeepL pentru traducere automată"
                  fieldName="deeplKey"
                  onSubmit={onSubmitDeepL}
                  loading={loading}
                  submitStatus={submitStatus}
                  errorDetails={errorDetails}
                />
              </Card>

              <Card className="p-6">
                <ApiKeyForm
                  title="Integrare Deepseek API"
                  description="Conectați-vă contul Deepseek pentru funcționalități avansate"
                  fieldName="deepseekKey"
                  onSubmit={onSubmitDeepseek}
                  loading={loading}
                  submitStatus={submitStatus}
                  errorDetails={errorDetails}
                />
              </Card>
            </div>

            <SupportedLanguages />
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Translations;
