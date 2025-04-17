
import React, { useState, useEffect } from 'react';
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from '@/components/ui/cards';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Activity, Code, CheckCircle, Clock, ServerCrash } from 'lucide-react';
import { AutoExecutionButton } from '@/components/agents/monitoring/autonomy/AutoExecutionButton';

export const AutonomyDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    taskStats: { totalCount: 0, pendingCount: 0, approvedCount: 0, rejectedCount: 0 },
    codeStats: { totalCount: 0, pendingCount: 0, approvedCount: 0, rejectedCount: 0 }
  });
  
  // Încărcăm statisticile inițiale
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('monitor-agent-proposals', {
          body: { action: 'getStats' }
        });
        
        if (error) {
          console.error('Eroare la obținerea statisticilor:', error);
          toast({
            title: "Eroare la încărcarea datelor",
            description: "Nu s-au putut obține statisticile propunerilor",
            variant: "destructive",
          });
          return;
        }
        
        if (data?.data) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Excepție la obținerea statisticilor:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
    
    // Actualizăm statisticile la fiecare 30 secunde
    const statsInterval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(statsInterval);
  }, [toast]);
  
  // Pregătim datele pentru grafic
  const chartData = [
    { name: 'Propuneri Task', Total: stats.taskStats.totalCount || 0, Aprobate: stats.taskStats.approvedCount || 0, În Așteptare: stats.taskStats.pendingCount || 0 },
    { name: 'Propuneri Cod', Total: stats.codeStats.totalCount || 0, Aprobate: stats.codeStats.approvedCount || 0, În Așteptare: stats.codeStats.pendingCount || 0 }
  ];
  
  const statCards = [
    {
      title: "Propuneri Task",
      value: stats.taskStats.totalCount || 0,
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      secondaryText: `${stats.taskStats.approvedCount || 0} aprobate`
    },
    {
      title: "Propuneri Cod",
      value: stats.codeStats.totalCount || 0,
      icon: <Code className="h-5 w-5 text-green-500" />,
      secondaryText: `${stats.codeStats.approvedCount || 0} aprobate`
    },
    {
      title: "Total Aprobate",
      value: (stats.taskStats.approvedCount || 0) + (stats.codeStats.approvedCount || 0),
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      secondaryText: "Procese automate"
    },
    {
      title: "În Așteptare",
      value: (stats.taskStats.pendingCount || 0) + (stats.codeStats.pendingCount || 0),
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      secondaryText: "Pentru aprobare"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Panou Control Autonomie</h2>
          <p className="text-muted-foreground">Activitatea sistemului de agenți autonomi care evoluează independent</p>
        </div>
        <AutoExecutionButton variant="header" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <StyledCard key={index} className="relative overflow-hidden">
            <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
              <StyledCardTitle className="text-sm font-medium">{card.title}</StyledCardTitle>
              {card.icon}
            </StyledCardHeader>
            <StyledCardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.secondaryText}</p>
            </StyledCardContent>
          </StyledCard>
        ))}
      </div>
      
      <StyledCard>
        <StyledCardHeader>
          <StyledCardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-amber-500" />
            Evoluția Propunerilor Autonome
          </StyledCardTitle>
        </StyledCardHeader>
        <StyledCardContent>
          <div className="h-[250px] mt-4">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <ServerCrash className="h-8 w-8 text-muted-foreground animate-pulse" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Total" fill="#8884d8" />
                  <Bar dataKey="Aprobate" fill="#82ca9d" />
                  <Bar dataKey="În Așteptare" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </StyledCardContent>
      </StyledCard>
    </div>
  );
};
