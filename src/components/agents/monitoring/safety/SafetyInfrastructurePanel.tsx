
import React, { useState } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { 
  CircleSlash, Shield, Lock, Eye, Brain, 
  Activity, PlayCircle, PauseCircle, StopCircle,
  AlertTriangle, Check, Rocket, Zap, Sparkles,
  Server, Database, BarChart4
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
  const [autonomyLevel, setAutonomyLevel] = React.useState(65); // Crescut nivelul inițial
  const [safetyOverride, setSafetyOverride] = React.useState(true); // Activat implicit
  const [acceptedRisks, setAcceptedRisks] = useState<string[]>(["mediu"]);
  const [systemsActive, setSystemsActive] = React.useState({
    riskEvaluation: true,
    ethicalBoundaries: true,
    auditLogs: true,
    humanSupervision: false, // Dezactivat implicit
    autonomyLimits: false,   // Dezactivat implicit
    emergencyStop: true,
    dataSources: false,      // Nou - Surse de date reale
    realTimeMonitoring: false, // Nou - Monitorizare în timp real
    riskAlgorithm: false,    // Nou - Algoritm de evaluare risc
    adaptiveSafety: false,   // Nou - Siguranță adaptivă
  });

  // Stare pentru noile sisteme de monitorizare și evaluare
  const [dataConnections, setDataConnections] = useState({
    agentSystem: false,
    monitoringPlatform: false,
    analyticsEngine: false,
    safetyFramework: false,
  });

  const [monitoringParameters, setMonitoringParameters] = useState({
    autonomyLevels: false,
    resourceUsage: false,
    decisionQuality: false,
    learningProgress: false,
  });

  const [implementationProgress, setImplementationProgress] = useState({
    dataSources: 15,
    riskEvaluation: 25,
    monitoring: 30,
    logging: 20,
    adaptiveSafety: 10,
  });

  const handleToggleSystem = (system: keyof typeof systemsActive) => {
    setSystemsActive(prev => ({ ...prev, [system]: !prev[system] }));
    
    toast({
      title: systemsActive[system] ? "Sistem dezactivat" : "Sistem activat",
      description: `Sistemul de ${getSystemName(system)} a fost ${systemsActive[system] ? "dezactivat" : "activat"}.`,
    });

    // Dacă activăm unul dintre noile sisteme, actualizăm progresul
    if (!systemsActive[system] && 
        (system === 'dataSources' || system === 'realTimeMonitoring' || 
         system === 'riskAlgorithm' || system === 'adaptiveSafety')) {
      // Incrementăm progresul de implementare pentru acest sistem
      const progressKey = system === 'dataSources' ? 'dataSources' :
                         system === 'realTimeMonitoring' ? 'monitoring' :
                         system === 'riskAlgorithm' ? 'riskEvaluation' : 'adaptiveSafety';
      
      setImplementationProgress(prev => ({
        ...prev,
        [progressKey]: Math.min(prev[progressKey as keyof typeof prev] + 10, 100)
      }));
    }
  };

  const getSystemName = (system: string): string => {
    const names: Record<string, string> = {
      riskEvaluation: "evaluare a riscurilor",
      ethicalBoundaries: "limite etice",
      auditLogs: "jurnalizare audit",
      humanSupervision: "supervizare umană",
      autonomyLimits: "limitare autonomie",
      emergencyStop: "oprire de urgență",
      dataSources: "conectare surse de date",
      realTimeMonitoring: "monitorizare în timp real",
      riskAlgorithm: "algoritm evaluare risc",
      adaptiveSafety: "siguranță adaptivă"
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
      dataSources: false,
      realTimeMonitoring: false,
      riskAlgorithm: false,
      adaptiveSafety: false,
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

  const toggleRiskAcceptance = (risk: string) => {
    if (acceptedRisks.includes(risk)) {
      setAcceptedRisks(prev => prev.filter(r => r !== risk));
    } else {
      setAcceptedRisks(prev => [...prev, risk]);
      
      if (risk === "ridicat") {
        toast({
          title: "Risc ridicat acceptat",
          description: "Ați acceptat riscuri ridicate. Agenții vor putea opera cu autonomie maximă.",
          variant: "warning"
        });
      }
    }
  };

  const toggleDataConnection = (connection: keyof typeof dataConnections) => {
    setDataConnections(prev => ({ ...prev, [connection]: !prev[connection] }));
    
    // Incrementăm progresul de implementare pentru surse de date
    setImplementationProgress(prev => ({
      ...prev,
      dataSources: Math.min(prev.dataSources + 5, 100)
    }));
    
    toast({
      title: dataConnections[connection] ? "Conexiune dezactivată" : "Conexiune activată",
      description: `Conexiunea cu ${connection} a fost ${dataConnections[connection] ? "dezactivată" : "activată"}.`,
    });
  };

  const startAutonomousExecution = () => {
    if (!acceptedRisks.includes("ridicat")) {
      toast({
        title: "Risc ridicat neacceptat",
        description: "Pentru execuție complet autonomă trebuie să acceptați riscurile ridicate.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Execuție autonomă activată",
      description: "Agenții au fost lansați în modul autonom conform parametrilor configurați.",
    });
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
        <StyledCardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Infrastructură de Siguranță și Control Execuție
          </div>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white gap-1 flex items-center">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Noua Eră a Autonomiei</span>
          </Badge>
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        {/* Banner de prioritate */}
        <Alert variant="default" className="border-amber-500 bg-amber-100 mb-4">
          <AlertTitle className="flex items-center gap-2 text-amber-800">
            <Rocket className="h-5 w-5" />
            Prioritate #1: Pornire Agenți Autonomi
          </AlertTitle>
          <AlertDescription className="text-amber-700">
            Pentru a accelera dezvoltarea, s-a decis acceptarea unor riscuri inițiale și lansarea agenților 
            în mod autonom. Configurați parametrii de risc acceptați mai jos.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="execution" className="space-y-4">
          <TabsList>
            <TabsTrigger value="execution" className="flex items-center gap-1">
              <Rocket className="h-4 w-4" />
              Execuție Autonomă
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              Mecanisme de Siguranță
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Monitorizare Autonomie
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-1">
              <Server className="h-4 w-4" />
              Integrare Date Reale
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="execution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StyledCard className="border-amber-200">
                <StyledCardHeader>
                  <StyledCardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Acceptare Riscuri
                  </StyledCardTitle>
                </StyledCardHeader>
                <StyledCardContent>
                  <p className="text-sm mb-4">
                    Pentru a activa operațiuni autonome complete, trebuie să acceptați explicit 
                    anumite niveluri de risc:
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-100">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-600" />
                        <span>Risc scăzut</span>
                      </div>
                      <Switch 
                        checked={acceptedRisks.includes("scazut")} 
                        onCheckedChange={() => toggleRiskAcceptance("scazut")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md bg-amber-50 border border-amber-100">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-600" />
                        <span>Risc mediu</span>
                      </div>
                      <Switch 
                        checked={acceptedRisks.includes("mediu")} 
                        onCheckedChange={() => toggleRiskAcceptance("mediu")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-md bg-red-50 border border-red-100">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-600" />
                        <span>Risc ridicat</span>
                      </div>
                      <Switch 
                        checked={acceptedRisks.includes("ridicat")} 
                        onCheckedChange={() => toggleRiskAcceptance("ridicat")}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant={acceptedRisks.includes("ridicat") ? "default" : "outline"}
                    className={`w-full mt-4 gap-2 ${acceptedRisks.includes("ridicat") ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                    onClick={startAutonomousExecution}
                  >
                    <Zap className={`h-4 w-4 ${acceptedRisks.includes("ridicat") ? "text-white" : ""}`} />
                    Pornire Execuție Autonomă
                  </Button>
                </StyledCardContent>
              </StyledCard>
              
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
            </div>
            
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
                    
                    <Button variant="default" size="sm" className="gap-1 bg-amber-500 hover:bg-amber-600">
                      <PlayCircle className="h-3.5 w-3.5" />
                      <span>Start</span>
                    </Button>
                  </div>
                </div>
              </StyledCardContent>
            </StyledCard>
            
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle className="text-base">Politici de Execuție Autonomă</StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="space-y-2">
                  {[
                    { name: "Verificare de risc pre-execuție", status: "activă" },
                    { name: "Validare umană pentru acțiuni critice", status: "inactivă" }, // Modificat
                    { name: "Revenire automată în caz de eroare", status: "activă" },
                    { name: "Limitare resurse computaționale per agent", status: "activă" },
                    { name: "Izolare execuție între agenți", status: "activă" }  // Modificat
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
          
          <TabsContent value="integration" className="space-y-4">
            <Alert className="border-amber-300 bg-amber-50">
              <AlertTitle className="flex items-center gap-1 text-amber-800">
                <Server className="h-4 w-4 text-amber-600" />
                Integrare cu Surse de Date Reale
              </AlertTitle>
              <AlertDescription className="text-amber-700">
                Această secțiune vă permite conectarea infrastructurii de siguranță la surse reale de date 
                și sisteme de monitorizare pentru agenții autonomi. Stadiul curent: În implementare.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StyledCard>
                <StyledCardHeader>
                  <StyledCardTitle className="text-base flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Conectare Surse de Date
                  </StyledCardTitle>
                </StyledCardHeader>
                <StyledCardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <div className="font-medium">Sistem Agent</div>
                        <div className="text-sm text-muted-foreground">Date de bază despre agenți</div>
                      </div>
                      <Switch 
                        checked={dataConnections.agentSystem}
                        onCheckedChange={() => toggleDataConnection('agentSystem')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <div className="font-medium">Platforma de Monitorizare</div>
                        <div className="text-sm text-muted-foreground">Metrici de performanță</div>
                      </div>
                      <Switch 
                        checked={dataConnections.monitoringPlatform}
                        onCheckedChange={() => toggleDataConnection('monitoringPlatform')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <div className="font-medium">Motor de Analiză</div>
                        <div className="text-sm text-muted-foreground">Indicatori și tendințe</div>
                      </div>
                      <Switch 
                        checked={dataConnections.analyticsEngine}
                        onCheckedChange={() => toggleDataConnection('analyticsEngine')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2">
                      <div>
                        <div className="font-medium">Framework de Siguranță</div>
                        <div className="text-sm text-muted-foreground">Limitări și restricții</div>
                      </div>
                      <Switch 
                        checked={dataConnections.safetyFramework}
                        onCheckedChange={() => toggleDataConnection('safetyFramework')}
                      />
                    </div>
                  </div>
                </StyledCardContent>
              </StyledCard>
              
              <StyledCard>
                <StyledCardHeader>
                  <StyledCardTitle className="text-base flex items-center gap-2">
                    <BarChart4 className="h-4 w-4" />
                    Parametri de Monitorizare
                  </StyledCardTitle>
                </StyledCardHeader>
                <StyledCardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <div className="font-medium">Niveluri de Autonomie</div>
                        <div className="text-sm text-muted-foreground">Definire parametri specifici</div>
                      </div>
                      <Switch 
                        checked={monitoringParameters.autonomyLevels}
                        onCheckedChange={() => setMonitoringParameters(prev => ({
                          ...prev,
                          autonomyLevels: !prev.autonomyLevels
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <div className="font-medium">Utilizare Resurse</div>
                        <div className="text-sm text-muted-foreground">Consum CPU/memorie/stocare</div>
                      </div>
                      <Switch 
                        checked={monitoringParameters.resourceUsage}
                        onCheckedChange={() => setMonitoringParameters(prev => ({
                          ...prev,
                          resourceUsage: !prev.resourceUsage
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border-b">
                      <div>
                        <div className="font-medium">Calitatea Deciziilor</div>
                        <div className="text-sm text-muted-foreground">Metrici pentru evaluare</div>
                      </div>
                      <Switch 
                        checked={monitoringParameters.decisionQuality}
                        onCheckedChange={() => setMonitoringParameters(prev => ({
                          ...prev,
                          decisionQuality: !prev.decisionQuality
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2">
                      <div>
                        <div className="font-medium">Progres Învățare</div>
                        <div className="text-sm text-muted-foreground">Rate de îmbunătățire</div>
                      </div>
                      <Switch 
                        checked={monitoringParameters.learningProgress}
                        onCheckedChange={() => setMonitoringParameters(prev => ({
                          ...prev,
                          learningProgress: !prev.learningProgress
                        }))}
                      />
                    </div>
                  </div>
                </StyledCardContent>
              </StyledCard>
            </div>
            
            <StyledCard>
              <StyledCardHeader>
                <StyledCardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Progres Implementare
                </StyledCardTitle>
              </StyledCardHeader>
              <StyledCardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Conectare Surse de Date Reale</span>
                      <span>{implementationProgress.dataSources}%</span>
                    </div>
                    <Progress value={implementationProgress.dataSources} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Algoritm Evaluare Riscuri</span>
                      <span>{implementationProgress.riskEvaluation}%</span>
                    </div>
                    <Progress value={implementationProgress.riskEvaluation} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monitorizare în Timp Real</span>
                      <span>{implementationProgress.monitoring}%</span>
                    </div>
                    <Progress value={implementationProgress.monitoring} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Jurnalizare Completă</span>
                      <span>{implementationProgress.logging}%</span>
                    </div>
                    <Progress value={implementationProgress.logging} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mecanism Adaptiv de Siguranță</span>
                      <span>{implementationProgress.adaptiveSafety}%</span>
                    </div>
                    <Progress value={implementationProgress.adaptiveSafety} className="h-2" />
                  </div>
                </div>
              </StyledCardContent>
            </StyledCard>
          </TabsContent>
        </Tabs>
      </StyledCardContent>
    </StyledCard>
  );
};
