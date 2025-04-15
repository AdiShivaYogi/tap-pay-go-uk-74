
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LoadingIndicator } from "./LoadingIndicator";
import { formSchema } from "./auth-validation";

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  isLoginMode: boolean;
  onSubmit: (values: FormValues) => Promise<void>;
  isLoading: boolean;
}

export const AuthForm = ({ isLoginMode, onSubmit, isLoading }: AuthFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      inviteCode: ""
    }
  });

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
                <Input placeholder="Email administrator" {...field} />
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
                <Input 
                  type="password" 
                  placeholder="Parolă" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cod de invitație</FormLabel>
              <FormControl>
                <Input placeholder="Cod de invitație administrator" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            isLoginMode ? "Autentificare" : "Creare cont administrator"
          )}
        </Button>
      </form>
    </Form>
  );
};
