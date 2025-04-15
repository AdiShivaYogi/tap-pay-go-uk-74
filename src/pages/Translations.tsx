
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Languages, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeepLConfigForm {
  apiKey: string;
}

const Translations = () => {
  const { isAdmin, role } = useUserRole();
  const { toast } = useToast();
  const form = useForm<DeepLConfigForm>({
    defaultValues: {
      apiKey: "",
    },
  });

  const onSubmit = async (data: DeepLConfigForm) => {
    try {
      const { error } = await supabase.functions.invoke('set-deepl-key', {
        body: { key: data.apiKey }
      });

      if (error) throw error;

      toast({
        title: "Configurare reușită",
        description: "Cheia API DeepL a fost salvată cu succes",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error saving DeepL API key:', error);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva cheia API",
      });
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
                      <Button type="submit" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Salvează cheia API
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
