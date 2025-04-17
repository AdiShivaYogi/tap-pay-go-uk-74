
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivitySquare, BookOpen, Brain, Bug, CheckCircle, Code, Flag, Gauge, RotateCw, Settings, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Task-urile pe care sistemul le abordează
const agentTasks = [
  { 
    id: 'task-1',
    title: 'Optimizarea algoritmilor de procesare paralelă',
    status: 'completed',
    complexity: 89,
    approach: 'Analiză de complexitate și restructurare recursivă pentru paralelizare optimă',
    learningInsights: ['Multiplicare eficiență cu 3.2x', 'Reducere overhead cu 64%', 'Model hibrid de execuție adaptat']
  },
  { 
    id: 'task-2',
    title: 'Implementarea sistemului de auto-învățare distribuită',
    status: 'in-progress',
    complexity: 95,
    approach: 'Arhitectură federată cu noduri de sincronizare și propagare de cunoștințe',
    learningInsights: ['Transfer bidirectional de expertiză', 'Mecanism de evitare a erorilor cascade']
  },
  { 
    id: 'task-3',
    title: 'Reducerea erorilor în analiza de sentiment',
    status: 'in-progress',
    complexity: 78,
    approach: 'Calibrare contextuală cu feedback diferențiat și adaptare la nuanțe',
    learningInsights: ['Identificare patternuri complexe de sarcasm și ironie', 'Adaptare la specificul lingvistic regional']
  },
  { 
    id: 'task-4',
    title: 'Dezvoltarea sistemului de raționament cauzal',
    status: 'debugging',
    complexity: 92,
    approach: 'Integrare model bayesian cu învățare prin recompensă și ierarhizare conceptuală',
    learningInsights: ['Reprezentări cauzale complexe', 'Analiză contrafactuală avansată', 'Reducere ambiguitate în inferențe']
  },
  { 
    id: 'task-5',
    title: 'Optimizarea consumului energetic în procesare',
    status: 'planned',
    complexity: 83,
    approach: 'Profiling dinamic și adaptare în timp real a resurselor alocate',
    learningInsights: []
  }
];

// Buguri identificate și rezolvate
const debugEvents = [
  {
    id: 'debug-1',
    title: 'Redundanță în caching-ul ierarhic',
    severity: 'medium',
    status: 'resolved',
    approach: 'Implementare mecanisme de invalidare inteligentă și prioritizare a persistenței',
    timeToResolve: '2.3 ore',
    impact: 'Reducere cu 34% a memoriei utilizate'
  },
  {
    id: 'debug-2',
    title: 'Inconsistență în propagarea schimbărilor de stare',
    severity: 'high',
    status: 'resolved',
    approach: 'Refactorizare la model de observability cu canale dedicate pentru sincronizare',
    timeToResolve: '4.1 ore',
    impact: 'Eliminare completă a stărilor inconsistente'
  },
  {
    id: 'debug-3',
    title: 'Erori în predicțiile pentru scenarii edge-case',
    severity: 'low',
    status: 'in-progress',
    approach: 'Augmentare set de date și calibrare sensitivitate pentru cazuri extreme',
    timeToResolve: 'estimat 1.8 ore',
    impact: 'Îmbunătățire precizie cu 8-12% pentru scenarii rare'
  },
  {
    id: 'debug-4',
    title: 'Regresie în performanța inferențelor distribuite',
    severity: 'critical',
    status: 'resolved',
    approach: 'Rebalansare workload și optimizare pipeline de transmisie date',
    timeToResolve: '5.2 ore',
    impact: 'Restabilire performanță și îmbunătățire adițională de 12%'
  }
];

// Strategii de abordare
const approachStrategies = [
  {
    id: 'strategy-1',
    name: 'Divide și cucerește',
    complexity: 'Medie',
    description: 'Descompunerea problemelor complexe în subprobleme independente care pot fi rezolvate eficient și paralel',
    applicability: 'Optimă pentru probleme cu structură ierarhică sau recursivă',
    performanceGains: 'Creștere eficiență 2.5-3.8x pentru probleme mari'
  },
  {
    id: 'strategy-2',
    name: 'Învățare incrementală cu verificare',
    complexity: 'Ridicată',
    description: 'Actualizare progresivă a modelelor cu validare și retenție selectivă a cunoștințelor',
    applicability: 'Scenarii cu date în continuă evoluție și necesitate de stabilitate',
    performanceGains: 'Reducere rată de eroare cu 24-47% în medii dinamice'
  },
  {
    id: 'strategy-3',
    name: 'Optimizare bayesiană multi-obiectiv',
    complexity: 'Foarte ridicată',
    description: 'Explorare eficientă a spațiului de soluții cu balansare automată a multiplelor criterii de optimizare',
    applicability: 'Probleme cu compromisuri inerente între performanță, resurse și acuratețe',
    performanceGains: 'Soluții superioare cu 18-32% față de metodele tradiționale'
  }
];

export const AutoDebugPanel = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [systemHealth, setSystemHealth] = useState(87);
  const [optimizationProgress, setOptimizationProgress] = useState(62);
  const { toast } = useToast();
  
  // Simulăm progresul continuu al sistemului
  useEffect(() => {
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        const newValue = Math.min(prev + Math.random() * 0.8, 100);
        return parseFloat(newValue.toFixed(1));
      });
      
      setSystemHealth(prev => {
        // Fluctuații mici în sănătatea sistemului pentru realism
        const change = (Math.random() * 1.5) - 0.5; // -0.5 to +1
        const newValue = Math.max(50, Math.min(100, prev + change));
        return parseFloat(newValue.toFixed(1));
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Funcție pentru simularea accelerării auto-debugging-ului
  const handleAccelerateDebugging = () => {
    toast({
      title: "Auto-Debugging Accelerat",
      description: "Sistemul a alocat resurse suplimentare pentru accelerarea proceselor de debug și optimizare.",
      duration: 4000,
    });
    
    // Simulăm o îmbunătățire rapidă
    setSystemHealth(prev => Math.min(100, prev + 3.7));
  };
  
  return (
    <Card className="bg-gradient-to-b from-background to-gray-50/30 dark:from-background dark:to-gray-900/10 border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 font-semibold">
            <ActivitySquare className="h-5 w-5 text-amber-500" />
            Auto-Debugging și Evoluție Sistem
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 border-green-200">
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
              <span className="text-green-700">Sănătate: {systemHealth}%</span>
            </Badge>
            
            <Badge variant="outline" className="bg-amber-50 border-amber-200">
              <Gauge className="h-3.5 w-3.5 mr-1 text-amber-500" />
              <span className="text-amber-700">Optimizare: {optimizationProgress}%</span>
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Monitorizare în timp real a evoluției sistemului cu abordări și strategii adaptive
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="tasks" className="flex items-center gap-1.5">
              <Flag className="h-3.5 w-3.5" />
              <span>Sarcini Curente</span>
            </TabsTrigger>
            <TabsTrigger value="debug" className="flex items-center gap-1.5">
              <Bug className="h-3.5 w-3.5" />
              <span>Debugging</span>
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5" />
              <span>Abordări</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="mt-0">
            <ScrollArea className="h-[320px] pr-3">
              <div className="space-y-3">
                {agentTasks.map(task => (
                  <div key={task.id} className="border rounded-md p-3 bg-white dark:bg-slate-900/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{task.title}</div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          task.status === 'completed' ? 'bg-green-50 border-green-200' :
                          task.status === 'in-progress' ? 'bg-amber-50 border-amber-200' :
                          task.status === 'debugging' ? 'bg-red-50 border-red-200' :
                          'bg-blue-50 border-blue-200'
                        }`}
                      >
                        {task.status === 'completed' ? 'Finalizat' :
                         task.status === 'in-progress' ? 'În progres' :
                         task.status === 'debugging' ? 'Debugging' : 'Planificat'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Code className="h-3.5 w-3.5" />
                      <span>Complexitate: {task.complexity}/100</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Abordare:</span> {task.approach}
                    </div>
                    
                    {task.learningInsights.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs font-medium mb-1">Insights de învățare:</div>
                        <div className="flex flex-wrap gap-1">
                          {task.learningInsights.map((insight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {insight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="debug" className="mt-0">
            <ScrollArea className="h-[320px] pr-3">
              <div className="space-y-3">
                {debugEvents.map(event => (
                  <div key={event.id} className="border rounded-md p-3 bg-white dark:bg-slate-900/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{event.title}</div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${
                            event.severity === 'critical' ? 'bg-red-50 border-red-200 text-red-700' :
                            event.severity === 'high' ? 'bg-orange-50 border-orange-200 text-orange-700' :
                            event.severity === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                            'bg-blue-50 border-blue-200 text-blue-700'
                          }`}
                        >
                          {event.severity}
                        </Badge>
                        
                        <Badge 
                          variant="outline" 
                          className={`${
                            event.status === 'resolved' ? 'bg-green-50 border-green-200 text-green-700' :
                            'bg-amber-50 border-amber-200 text-amber-700'
                          }`}
                        >
                          {event.status === 'resolved' ? 'Rezolvat' : 'În progres'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium">Abordare:</span> {event.approach}
                      </div>
                      <div>
                        <span className="font-medium">Timp de rezolvare:</span> {event.timeToResolve}
                      </div>
                      <div>
                        <span className="font-medium">Impact:</span> {event.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="strategies" className="mt-0">
            <ScrollArea className="h-[320px] pr-3">
              <div className="space-y-3">
                {approachStrategies.map(strategy => (
                  <div key={strategy.id} className="border rounded-md p-3 bg-white dark:bg-slate-900/60">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{strategy.name}</div>
                      <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                        {strategy.complexity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-2">{strategy.description}</p>
                    
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium">Aplicabilitate:</span> {strategy.applicability}
                      </div>
                      <div>
                        <span className="font-medium">Îmbunătățiri:</span> {strategy.performanceGains}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 mr-1.5" />
            <span>Sistem evoluat cu auto-debugging și învățare continuă</span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 text-sm"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Configurare</span>
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1 text-sm bg-amber-500 hover:bg-amber-600"
              onClick={handleAccelerateDebugging}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Accelerare Auto-Debugging</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 text-sm"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>Reîmprospătare</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
