
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { KeyRound } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ApiKeyFormProps {
  title: string;
  description: string;
  fieldName: "deeplKey" | "deepseekKey";
  onSubmit: (data: { [key: string]: string }) => Promise<void>;
  loading: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorDetails: string;
}

export function ApiKeyForm({
  title,
  description,
  fieldName,
  onSubmit,
  loading,
  submitStatus,
  errorDetails
}: ApiKeyFormProps) {
  const form = useForm({
    defaultValues: {
      [fieldName]: "",
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cheie API</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Introduceți cheia API"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Puteți găsi cheia API în panoul de control al serviciului
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="gap-2" disabled={loading}>
            <KeyRound className="h-4 w-4" />
            {loading ? "Se salvează..." : "Salvează cheia API"}
          </Button>
        </form>
      </Form>

      {submitStatus === 'success' && (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Cheie API salvată cu succes</AlertTitle>
          <AlertDescription className="text-green-700">
            Configurarea este acum completă și puteți folosi funcționalitățile de traducere.
          </AlertDescription>
        </Alert>
      )}
      
      {submitStatus === 'error' && (
        <Alert variant="destructive">
          <AlertTitle>Eroare la salvarea cheii API</AlertTitle>
          <AlertDescription>
            {errorDetails || "A apărut o eroare la salvarea cheii. Vă rugăm să încercați din nou."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
