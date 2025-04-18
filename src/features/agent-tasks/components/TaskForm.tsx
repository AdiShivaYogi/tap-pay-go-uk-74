
import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  agent_id: string;
}

export const TaskForm = ({ onTaskCreated }: { onTaskCreated: () => void }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const form = useForm<TaskFormData>();

  const onSubmit = async (data: TaskFormData) => {
    try {
      const { error } = await supabase.from('agent_tasks').insert({
        ...data,
        created_by: user?.id,
        assigned_by: user?.id
      });

      if (error) throw error;

      toast({
        title: "Sarcină creată",
        description: "Sarcina a fost atribuită cu succes agentului.",
      });
      
      form.reset();
      onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut crea sarcina. Încercați din nou.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titlu</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți titlul sarcinii" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriere</FormLabel>
              <FormControl>
                <Input placeholder="Descrieți sarcina" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioritate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați prioritatea" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Scăzută</SelectItem>
                  <SelectItem value="medium">Medie</SelectItem>
                  <SelectItem value="high">Ridicată</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Termen limită</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Agent</FormLabel>
              <FormControl>
                <Input placeholder="Introduceți ID-ul agentului" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Creează sarcina</Button>
      </form>
    </Form>
  );
};
