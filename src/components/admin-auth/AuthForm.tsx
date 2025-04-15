
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "./LoadingIndicator";
import { loginFormSchema, registerFormSchema, AuthFormValues } from "./auth-validation";

interface AuthFormProps {
  isLoginMode: boolean;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
  errorMessage?: string;
}

export const AuthForm = ({ 
  isLoginMode, 
  onSubmit, 
  isLoading,
  errorMessage
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Use the appropriate schema based on login mode
  const schema = isLoginMode ? loginFormSchema : registerFormSchema;
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      inviteCode: isLoginMode ? undefined : ""
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values: AuthFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
            {errorMessage}
          </div>
        )}
        
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
