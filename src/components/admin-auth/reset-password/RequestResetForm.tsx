
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "../LoadingIndicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

// Schema pentru email (solicitare link resetare)
const requestResetSchema = z.object({
  email: z.string().email("Adresa de email invalidă"),
});

export type RequestResetValues = z.infer<typeof requestResetSchema>;

interface RequestResetFormProps {
  onSubmit: (values: RequestResetValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  errorMessage?: string;
}

export const RequestResetForm = ({ 
  onSubmit, 
  onCancel, 
  isLoading,
  errorMessage 
}: RequestResetFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: "",
    }
  });

  const handleSubmit = async (values: RequestResetValues) => {
    await onSubmit(values);
    setSubmitted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {submitted && (
          <Alert className="bg-blue-50 border-blue-200 mb-4">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              Dacă adresa de email există în sistem, veți primi un link pentru resetarea parolei.
              Verificați și folderul de spam dacă nu vedeți emailul în Inbox.
            </AlertDescription>
          </Alert>
        )}
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți adresa de email" {...field} />
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                Vă vom trimite un link pentru resetarea parolei.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Înapoi
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingIndicator /> : "Trimite email de resetare"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
