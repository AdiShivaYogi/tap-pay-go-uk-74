
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "./LoadingIndicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, EyeIcon, EyeOffIcon } from "lucide-react";

// Schema pentru email (solicitare link resetare)
const requestResetSchema = z.object({
  email: z.string().email("Adresa de email invalidă"),
});

// Schema pentru setarea noii parole
const updatePasswordSchema = z.object({
  password: z.string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
    .regex(/[A-Z]/, "Parola trebuie să conțină cel puțin o literă mare")
    .regex(/[0-9]/, "Parola trebuie să conțină cel puțin o cifră")
    .regex(/[^A-Za-z0-9]/, "Parola trebuie să conțină cel puțin un caracter special"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Parolele nu coincid",
  path: ["confirmPassword"],
});

type RequestResetValues = z.infer<typeof requestResetSchema>;
type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

interface ResetPasswordFormProps {
  mode: 'request' | 'update';
  accessToken?: string;
  onSubmit: (values: RequestResetValues | UpdatePasswordValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export const ResetPasswordForm = ({ mode, accessToken, onSubmit, onCancel, isLoading }: ResetPasswordFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const requestForm = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: "",
    }
  });

  const updateForm = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const handleRequestSubmit = async (values: RequestResetValues) => {
    await onSubmit(values);
    setSubmitted(true);
  };

  const handleUpdateSubmit = async (values: UpdatePasswordValues) => {
    await onSubmit(values);
  };

  if (mode === 'request') {
    return (
      <Form {...requestForm}>
        <form onSubmit={requestForm.handleSubmit(handleRequestSubmit)} className="space-y-4">
          {submitted && (
            <Alert className="bg-blue-50 border-blue-200 mb-4">
              <InfoIcon className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                Dacă adresa de email există în sistem, veți primi un link pentru resetarea parolei.
                Verificați și folderul de spam dacă nu vedeți emailul în Inbox.
              </AlertDescription>
            </Alert>
          )}
          
          <FormField
            control={requestForm.control}
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
  }

  return (
    <Form {...updateForm}>
      <form onSubmit={updateForm.handleSubmit(handleUpdateSubmit)} className="space-y-4">
        <Alert className="bg-green-50 border-green-200 mb-4">
          <InfoIcon className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            Linkul de resetare a parolei a fost validat. Setați acum noua parolă pentru contul dvs.
          </AlertDescription>
        </Alert>
        
        <FormField
          control={updateForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parolă nouă</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Introduceți parola nouă" 
                    type={showPassword ? "text" : "password"} 
                    {...field} 
                  />
                  <Button 
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" /> : 
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    }
                  </Button>
                </div>
              </FormControl>
              <FormDescription className="text-xs text-muted-foreground">
                Parola trebuie să conțină minim 8 caractere, o literă mare, o cifră și un caracter special.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={updateForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmare parolă</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Confirmați parola nouă" 
                    type={showConfirmPassword ? "text" : "password"} 
                    {...field} 
                  />
                  <Button 
                    type="button"
                    variant="ghost"
                    size="sm" 
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" /> : 
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    }
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Anulare
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingIndicator /> : "Salvează noua parolă"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
