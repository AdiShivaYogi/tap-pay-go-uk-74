
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LoadingIndicator } from "./LoadingIndicator";
import { formSchema } from "./auth-validation";

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  isLoginMode: boolean;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
  formSchema?: z.ZodType;
}

export const AuthForm = ({ 
  isLoginMode, 
  onSubmit, 
  isLoading, 
  formSchema: customSchema = formSchema 
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(customSchema),
    defaultValues: {
      email: "",
      password: "",
      inviteCode: isLoginMode ? undefined : ""
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parolă</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Parolă" 
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isLoginMode && (
          <FormField
            control={form.control}
            name="inviteCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cod de invitație</FormLabel>
                <FormControl>
                  <Input placeholder="Cod de invitație" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            isLoginMode ? "Autentificare" : "Înregistrare"
          )}
        </Button>
      </form>
    </Form>
  );
};
