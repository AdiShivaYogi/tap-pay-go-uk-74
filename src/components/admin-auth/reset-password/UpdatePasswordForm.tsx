
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "../LoadingIndicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, EyeIcon, EyeOffIcon } from "lucide-react";

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

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

interface UpdatePasswordFormProps {
  onSubmit: (values: UpdatePasswordValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  errorMessage?: string;
}

export const UpdatePasswordForm = ({ 
  onSubmit, 
  onCancel, 
  isLoading,
  errorMessage 
}: UpdatePasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Alert className="bg-green-50 border-green-200 mb-4">
          <InfoIcon className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            Linkul de resetare a parolei a fost validat. Setați acum noua parolă pentru contul dvs.
          </AlertDescription>
        </Alert>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
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
          control={form.control}
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
