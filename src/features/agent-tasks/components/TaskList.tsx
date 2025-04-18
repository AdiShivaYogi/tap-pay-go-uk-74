
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  deadline: string;
  agent_id: string;
}

const priorityIcons = {
  low: <ArrowDown className="h-4 w-4 text-blue-500" />,
  medium: <ArrowRight className="h-4 w-4 text-yellow-500" />,
  high: <ArrowUp className="h-4 w-4 text-red-500" />
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

export const TaskList = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['agent-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Task[];
    }
  });

  if (isLoading) {
    return <div>Se încarcă sarcinile...</div>;
  }

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{task.title}</h3>
                {priorityIcons[task.priority]}
              </div>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
            <Badge variant="secondary" className={statusColors[task.status]}>
              {task.status}
            </Badge>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(task.deadline).toLocaleDateString()}
            </div>
            <div>Agent ID: {task.agent_id}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
