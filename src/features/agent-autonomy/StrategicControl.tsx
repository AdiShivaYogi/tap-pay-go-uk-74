
import React, { useState, useEffect } from 'react';
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from '@/components/ui/cards';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Compass, Target, TrendingUp, ShieldCheck, CpuChip } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logAgentActivity } from "@/components/agents/monitoring/hooks/utils/activity-processing";

interface StrategicDirection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const StrategicControl = () => {
  const { toast } = useToast();
  const [selectedDirection, setSelectedDirection] = useState<string>("optimization");
  const [progress, setProgress] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Definim direcțiile strategice disponibile
  const strategicDirections: StrategicDirection[] = [
    {
      id: "optimization",
      name: "Optimizare Sisteme",
      description: "Concentrează agenții pe îmbunătățirea și optimizarea sistemelor existente",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      id: "innovation",
      name: "Inovație & Dezvoltare",
      description: "Direcționează agenții către crearea de noi funcționalități și concepte",
      icon: <Compass className="h-5 w-5" />,
      color: "bg-purple-500"
    },
    {
      id: "integration",
      name: "Integrare Ecosisteme",
      description: "Focusează pe conectarea cu sisteme externe și APIs",
      icon: <Target className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      id: "security",
      name: "Securitate & Protecție",
      description: "Prioritizează îmbunătățirea aspectelor de securitate și protecție a datelor",
      icon: <ShieldCheck className="h-5 w-5" />,
      color: "bg-amber-500"
    },
    {
      id: "autonomy",
      name: "Autonomie Avansată",
      description: "Îndreaptă agenții către dezvoltarea unui grad mai mare de autonomie",
      icon: <CpuChip className="h-5 w-5" />,
      color: "bg-red-500"
    }
  ];
  
  // Găsim direcția curentă din lista de direcții
  const currentDirection = strategicDirections.find(dir => dir.id === selectedDirection) || strategicDirections[0];
  
  // Efect pentru simularea progresului atunci când se schimbă direcția
  useEffect(() => {
    if (selectedDirection) {
      setProgress(0);
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + Math.random() * 2;
          if (newValue >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newValue;
        });
      }, 2000);
      
      return () => clearInterval(progressInterval);
    }
  }, [selectedDirection]);
  
  // Funcția pentru actualizarea direcției strategice
  const updateStrategicDirection = async () => {
    try {
      setIsUpdating(true);
      
      // Actualizăm direcția strategică
      const { error } = await supabase.functions.invoke('monitor-agent-proposals', {
        body: { 
          action: 'updateStrategy',
          direction: selectedDirection
        }
      });
      
      if (error) {
        console.error('Eroare la actualizarea direcției:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut actualiza direcția strategică",
          variant: "destructive",
        });
        setIsUpdating(false);
        return;
      }
      
      // Generăm propuneri aliniate cu noua direcție
      const { data: proposalsData, error: proposalsError } = await supabase.functions.invoke('generate-agent-proposals', {
        body: { 
          action: 'generate',
          count: 3,
          vitalCount: 1,
          strategicDirection: selectedDirection,
          priority: 'high'
        }
      });
      
      if (proposalsError) {
        console.error('Eroare la generarea propunerilor:', proposalsError);
      } else if (proposalsData?.count > 0) {
        toast({
          title: "Direcție actualizată cu succes",
          description: `${proposalsData.count} propuneri generate în direcția ${currentDirection.name}`,
        });
      }
      
      // Înregistrăm activitatea
      logAgentActivity(
        'strategy-director',
        `Direcție strategică actualizată manual: ${currentDirection.name}`,
        'strategy-control'
      );
      
      setLastUpdated(new Date());
      setIsUpdating(false);
    } catch (error) {
      console.error('Excepție la actualizarea direcției:', error);
      setIsUpdating(false);
    }
  };
  
  return (
    <StyledCard>
      <StyledCardHeader className="flex flex-row items-center justify-between pb-2">
        <StyledCardTitle className="text-md font-bold">Control Strategic Agenți</StyledCardTitle>
        <Badge 
          variant="outline" 
          className={`${selectedDirection ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-gray-100'}`}
        >
          {lastUpdated 
            ? `Actualizat: ${lastUpdated.toLocaleTimeString()}`
            : 'Nicio actualizare recentă'}
        </Badge>
      </StyledCardHeader>
      
      <StyledCardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Direcție strategică curentă:</label>
              <div className="flex items-center gap-1">
                {currentDirection.icon}
                <span className="font-medium">{currentDirection.name}</span>
              </div>
            </div>
            
            <Select
              value={selectedDirection}
              onValueChange={setSelectedDirection}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selectează direcția" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {strategicDirections.map((direction) => (
                    <SelectItem 
                      key={direction.id} 
                      value={direction.id}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-full ${direction.color} text-white`}>
                          {direction.icon}
                        </div>
                        {direction.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <p className="text-xs text-muted-foreground mt-2">
              {currentDirection.description}
            </p>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progres Implementare</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={updateStrategicDirection} 
              className="w-full"
              disabled={isUpdating}
            >
              {isUpdating ? "Se actualizează..." : "Actualizează direcția strategică"}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Agenții autonomi vor începe să genereze propuneri aliniate cu noua direcție strategică
            </p>
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
