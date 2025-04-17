
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  CircleSlash, Shield, Lock, Eye, Brain, 
  Activity, PlayCircle, PauseCircle, StopCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export const SafetyInfrastructurePanel: React.FC = () => {
  const { toast } = useToast();
  const [autonomyLevel, setAutonomyLevel] = React.useState(30);
  const [safetyOverride, setSafetyOverride] = React.useState(false);
  const [systemsActive, setSystemsActive] = React.useState({
    riskEvaluation: true,
    ethicalBoundaries: true,
    auditLogs: true,
    humanSupervision: true,
    autonomyLimits: true,
    emergencyStop: true,
  });

  const handleToggleSystem = (system: keyof typeof systemsActive) => {
    setSystemsActive(prev => ({ ...prev, [system]: !prev[system] }));
    
    toast({
      title: systemsActive[system] ? "Sistem dezactivat" : "Sistem activat",
      description: `Sistemul de ${getSystemName(system)} a fost ${systemsActive[system] ? "dezactivat" : "activat"}.`,
    });
  };

  const getSystemName = (system: string): string => {
    const names: Record<string, string> = {
      riskEvaluation: "evaluare a riscurilor",
      ethicalBoundaries: "limite etice",
      auditLogs: "jurnalizare audit",
      humanSupervision: "supervizare umană",
      autonomyLimits: "limitare autonomie",
      emergencyStop: "oprire de urgență"
    };
    return names[system] || system;
  };

  const getAutonomyDescription = (): string => {
    if (autonomyLevel < 20) return "Supervizare umană strictă - Agenții necesită aprobare pentru majoritatea acțiunilor";
    if (autonomyLevel < 40) return "Autonomie limitată - Agenții pot executa sarcini de bază fără aprobare";
    if (autonomyLevel < 60) return "Semi-autonom - Agenții pot lua decizii în cadrul parametrilor definiți";
    if (autonomyLevel < 80) return "Majoritar autonom - Intervenție umană doar pentru decizii critice";
    return "Complet autonom - Intervenție umană minimă, doar în cazuri excepționale";
  };

  const handleEmergencyStop = () => {
    setAutonomyLevel(0);
    setSystemsActive({
      riskEvaluation: true,
      ethicalBoundaries: true,
      auditLogs: true,
      humanSupervision: true,
      autonomyLimits: true,
      emergencyStop: true,
    });
    toast({
      title: "OPRIRE DE URGENȚĂ ACTIVATĂ",
      description: "Toți agenții au fost opriți. Sistemele de siguranță sunt acum în control total.",
      variant: "destructive"
    });
  };

  const handleAutonomyChange = (value: number[]) => {
    setAutonomyLevel(value[0]);
    
    if (value[0] > 70 && !safetyOverride) {
      toast({
        title: "Nivelul de autonomie este ridicat",
        description: "Activați suprascrierea de siguranță pentru a permite un nivel mai ridicat de autonomie.",
        variant: "destructive"
      });
      setAutonomyLevel(70);
    }
  };

  const autoExecSystems = [
    { id: "planning", name: "Planificare Autonomă", status: "activ", healthScore: 94 },
    { id: "execution", name: "Execuție Sarcini", status: "activ", healthScore: 88 },
    { id: "monitoring", name: "Monitorizare", status: "activ", healthScore: 97 },
    { id: "selfImprovement", name: "Auto-Îmbunătățire", status: "inactiv", healthScore: 52 },
    { id: "resources", name: "Gestionare Resurse", status: "activ", healthScore: 86 }
  ];

  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Infrastructură de Siguranță și Control Execuție
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <Tabs defaultValue="safety" className="space-y-4">
          <TabsList>
            <TabsTrigger value="safety" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              Mecanisme de Siguranță
            </TabsTrigger>
            <TabsTrigger value="execution" className="flex items-center gap-1">
              <PlayCircle className="h-4 w-4" />
              Execuție Autonomă
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Monitorizare Autonomie
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="safety" className="space-y-4">
            <Alert variant="destructive" className="border-amber-300 bg-amber-50">
              <AlertTitle className="flex items-center gap-1">
                <CircleSlash className="h-4 w-4" />
                Infrastructură de Siguranță
              </AlertTitle>
              <AlertDescription>
                Această secțiune controlează mecanismele de limitare care asigură că agenții operează 
                în mod sigur și conform parametrilor etici stabiliți.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {Object.entries(systemsActive).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{getSystemName(key)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value ? "Activ" : "Inactiv"}
                    </p>
                  </div>
                  <Switch 
                    checked={value} 
                    onCheckedChange={() => handleToggleSystem(key as keyof typeof systemsActive)}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Suprascrierea Măsurilor de Siguranță</h3>
                  <p className="text-sm text-muted-foreground">
                    Permiterea nivelurilor înalte de autonomie și dezactivarea unor măsuri de siguranță
                  </p>
                </div>
                <Switch 
                  checked={safetyOverride} 
                  onCheckedChange={setSafetyOverride}
                />
              </div>
              
              <Alert variant="destructive" className={safetyOverride ? "opacity-100" : "opacity-50"}>
                <AlertTitle>Atenție</AlertTitle>
                <AlertDescription>
                  Suprascrierea măsurilor de siguranță poate duce la comportament imprevizibil al agenților. 
                  Utilizați cu precauție extremă și doar când este absolut necesar.
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button 
                variant="destructive" 
                size="lg" 
                className="gap-2"
                onClick={handleEmergencyStop}
              >
                <StopCircle className="h-5 w-5" />
                Oprire de Urgență - Toți Agenții
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="execution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StyledCard>
                <StyledCardHeader>
                  <StyledCardTitle className="text-base flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Nivel Autonomie Agent
                  </StyledCardTitle>
                </StyledCardHeader>
                <StyledCardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{autonomyLevel}%</span>
                      <span className="text-sm text-muted-foreground">{safetyOverride ? "Limită maximă: 100%" : "Limită maximă: 70%"}</span>
                    </div>
                    
                    <Slider
                      value={[autonomyLevel]}
                      max={100}
                      step={1}
                      onValueChange={handleAutonomyChange}
                      className={autonomyLevel > 70 ? "accent-amber-500" : ""}
                    />
                    
                    <p className="text-sm text-muted-foreground">{getAutonomyDescription()}</p>
                    
                    <div className="grid grid-cols-5 gap-1 mt-2">
                      <div className="h-1.5 rounded bg-green-500"></div>
                      <div className="h-1.5 rounded bg-green-400"></div>
                      <div className="h-1.5 rounded bg-amber-400"></div>
                      <div className="h-1.5 rounded bg-amber-500"></div>
                      <div className="h-1.5 rounded bg-red-500"></div>
                    </div>
                  </div>
                </StyledCardContent>
              </StyledCard>
              
              <StyledCard>
                <StyledCardHeader>
                  <StyledCardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Stare Sisteme Auto-Execuție
                  </StyledCardTitle>
                </StyledCardHeader>
                <StyledCardContent>
                  <div className="space-y-4">
                    {autoExecSystems.map(system => (
                      <div key={system.id} className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              system.status === "activ" ? "bg-green-500" : "bg-gray-400"
                            }`}></div>
                            <span>{system.name}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Sănătate: {system.healthScore}%
                          </span>
                          <Progress 
                            value={system.healthScore} 
                            className="w-16 h-2" 
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm" className="gap-1">
                        <PauseCircle className="h-3.5 w-3.5" />
                        <span>Pauză</span>
                      </Button>
                      
                      <Button variant="outline" size="sm" className="gap-1">
                        <StopCircle className="h-3.5 w-3.5" />
                        <span>Stop</span>
                      </Button>
                      
                      <Button variant="outline" size="sm" className="gap-1">
                        <PlayCircle className="h-3.5 w-3.5" />
                        <span>Start</span>
                      </Button>
                    </div>
                  </div>
                </StyledCardContent>
              </StyledCard>
            </div>
            
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle className="text-base">Politici de Execuție Autonomă</StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="space-y-2">
                  {[
                    { name: "Verificare de risc pre-execuție", status: "activă" },
                    { name: "Validare umană pentru acțiuni critice", status: "activă" },
                    { name: "Revenire automată în caz de eroare", status: "activă" },
                    { name: "Limitare resurse computaționale per agent", status: "activă" },
                    { name: "Izolare execuție între agenți", status: "inactivă" }
                  ].map((policy, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 border-b">
                      <span>{policy.name}</span>
                      <Badge variant={policy.status === "activă" ? "default" : "outline"}>
                        {policy.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </StyledCardContent>
            </StyledCard>
          </TabsContent>
          
          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StyledCard>
                <StyledCardContent className="pt-6">
                  <div className="text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-green-100 bg-green-50 text-green-600 mb-3">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Scor General Siguranță</h3>
                    <div className="text-3xl font-bold text-green-600 mt-2">92%</div>
                    <p className="text-xs text-muted-foreground mt-1">Ultima evaluare: acum 5 minute</p>
                  </div>
                </StyledCardContent>
              </StyledCard>
              
              <StyledCard>
                <StyledCardContent className="pt-6">
                  <div className="text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50 text-blue-600 mb-3">
                      <Activity className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Eficiență Auto-Execuție</h3>
                    <div className="text-3xl font-bold text-blue-600 mt-2">83%</div>
                    <p className="text-xs text-muted-foreground mt-1">28 sarcini executate autonom azi</p>
                  </div>
                </StyledCardContent>
              </StyledCard>
              
              <StyledCard>
                <StyledCardContent className="pt-6">
                  <div className="text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-amber-100 bg-amber-50 text-amber-600 mb-3">
                      <Eye className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Incidente Raportate</h3>
                    <div className="text-3xl font-bold text-amber-600 mt-2">0</div>
                    <p className="text-xs text-muted-foreground mt-1">Ultima săptămână</p>
                  </div>
                </StyledCardContent>
              </StyledCard>
            </div>
            
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle className="text-base">Jurnal Acțiuni Auto-Execuție</StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {[
                    { time: "10:32:15", agent: "AgentOptimizare", action: "Optimizare model ML completată", level: "info" },
                    { time: "10:28:47", agent: "AgentDate", action: "Sincrnonizare date finalizată", level: "info" },
                    { time: "10:15:22", agent: "AgentSecuritate", action: "Scanare vulnerabilități completată", level: "info" },
                    { time: "10:05:18", agent: "AgentInterfață", action: "Verificare propunere UI eșuată - necesită revizuire", level: "warning" },
                    { time: "09:58:33", agent: "AgentHR", action: "Analiză performanță lunară generată", level: "info" },
                    { time: "09:45:10", agent: "AgentAsistent", action: "Răspuns automat generat", level: "info" },
                    { time: "09:32:45", agent: "AgentSecuritate", action: "Detectare tentativă acces neautorizat", level: "error" },
                    { time: "09:15:22", agent: "AgentOptimizare", action: "Planificare resurse completată", level: "info" }
                  ].map((log, idx) => (
                    <div key={idx} className={`p-2 rounded text-sm ${
                      log.level === "error" ? "bg-red-50 text-red-800" :
                      log.level === "warning" ? "bg-amber-50 text-amber-800" :
                      "bg-gray-50"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">{log.time}</span>
                        <Badge variant="outline" className="text-xs">{log.agent}</Badge>
                      </div>
                      <p className="mt-1">{log.action}</p>
                    </div>
                  ))}
                </div>
              </StyledCardContent>
            </StyledCard>
          </TabsContent>
        </Tabs>
      </StyledCardContent>
    </StyledCard>
  );
};
