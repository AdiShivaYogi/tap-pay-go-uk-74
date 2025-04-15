
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "./LoadingIndicator";

const resetPasswordSchema = z.object({
  email: z.string().email("Adresa de email invalidă"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordValues) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export const ResetPasswordForm = ({ onSubmit, onCancel, isLoading }: ResetPasswordFormProps) => {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
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
                <Input placeholder="Email" {...field} />
              </FormControl>
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
