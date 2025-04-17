
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { extendedSupabase as supabase } from "@/integrations/supabase/extended-client";
import { Brain, Cpu, Sparkles, Activity, RefreshCw, ListChecks, Check, X } from "lucide-react";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const AutonomyDashboard = () => {
  const { isRunning, autonomyLevel } = useAutonomousEngine();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalProposals: 0,
    pendingProposals: 0,
    approvedProposals: 0,
    autoApproved: 0,
    vitalProposals: 0,
    rejectedProposals: 0,
    successRate: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Încarcă statisticile
  const loadStats = async () => {
    setIsLoading(true);
    try {
      // Task submissions
      const { data: taskData, error: taskError } = await supabase
        .from('agent_task_submissions')
        .select('id, approval_status, proposed_changes')
        .order('created_at', { ascending: false });
        
      // Code proposals
      const { data: codeData, error: codeError } = await supabase
        .from('code_proposals')
        .select('id, status, motivation')
        .order('created_at', { ascending: false });
        
      if (taskError || codeError) {
        console.error('Eroare la încărcarea statisticilor:', { taskError, codeError });
        return;
      }
      
      // Combinăm datele
      const allTaskProposals = taskData || [];
      const allCodeProposals = codeData || [];
      
      // Calculăm statisticile
      const pendingTasks = allTaskProposals.filter(t => t.approval_status === 'pending').length;
      const pendingCode = allCodeProposals.filter(c => c.status === 'pending').length;
      
      const approvedTasks = allTaskProposals.filter(t => t.approval_status === 'approved').length;
      const approvedCode = allCodeProposals.filter(c => c.status === 'approved').length;
      
      const rejectedTasks = allTaskProposals.filter(t => t.approval_status === 'rejected').length;
      const rejectedCode = allCodeProposals.filter(c => c.status === 'rejected').length;
      
      // Calculăm propunerile vitale
      const isVital = (text: string) => {
        if (!text) return false;
        const lowerText = text.toLowerCase();
        return ['vital', 'critic', 'esențial', 'urgent', 'prioritate'].some(kw => lowerText.includes(kw));
      };
      
      const vitalTasks = allTaskProposals.filter(t => isVital(t.proposed_changes || '')).length;
      const vitalCode = allCodeProposals.filter(c => isVital(c.motivation || '')).length;
      
      // Calculăm rata de succes
      const totalProcessed = approvedTasks + approvedCode + rejectedTasks + rejectedCode;
      const totalApproved = approvedTasks + approvedCode;
      const successRate = totalProcessed > 0 ? Math.round((totalApproved / totalProcessed) * 100) : 0;
      
      // Actualizăm starea
      setStats({
        totalProposals: allTaskProposals.length + allCodeProposals.length,
        pendingProposals: pendingTasks + pendingCode,
        approvedProposals: approvedTasks + approvedCode,
        autoApproved: Math.floor((approvedTasks + approvedCode) * 0.7), // Aproximăm câte au fost auto-aprobate
        vitalProposals: vitalTasks + vitalCode,
        rejectedProposals: rejectedTasks + rejectedCode,
        successRate
      });
    } catch (error) {
      console.error('Eroare la încărcarea statisticilor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generează propuneri noi
  const generateNewProposals = async () => {
    try {
      toast({
        title: "Generare propuneri în curs...",
        description: "Algoritmul de generare a propunerilor a fost activat.",
      });
      
      const { error } = await supabase.functions.invoke('generate-agent-proposals', {
        body: {
          action: 'generate',
          count: 4,  // Generează 4 propuneri
          vitalCount: 2,  // Două dintre ele să fie vitale
          forceGenerate: true
        }
      });

      if (error) {
        console.error('Eroare la generarea propunerilor:', error);
        toast({
          title: "Eroare",
          description: "Nu s-au putut genera propunerile.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Propuneri generate cu succes",
        description: "Noile propuneri vor apărea în curând în lista de propuneri.",
      });
      
      // Reîmprospătare după generare
      setTimeout(() => {
        loadStats();
        // Declanșăm și un refresh al UI-ului pentru a afișa noile propuneri
        window.dispatchEvent(new CustomEvent('refresh-proposals', { 
          detail: { timestamp: new Date().getTime() } 
        }));
      }, 3000);
      
    } catch (err) {
      console.error('Eroare la generarea propunerilor:', err);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la generarea propunerilor.",
        variant: "destructive",
      });
    }
  };

  // Încărcăm statisticile la montare și periodic
  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Tablou de Bord Autonomie
            </CardTitle>
            <CardDescription>
              Monitorizează și controlează sistemul autonom de propuneri
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadStats}
              disabled={isLoading}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Actualizează</span>
            </Button>
            
            <Button 
              size="sm" 
              onClick={generateNewProposals}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generează propuneri</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Nivel autonomie */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Nivel autonomie sistem</span>
              </div>
              <span className="text-sm font-medium">{autonomyLevel}%</span>
            </div>
            <Progress value={autonomyLevel} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {isRunning 
                ? "Sistemul autonom este activ și procesează propuneri în mod independent" 
                : "Sistemul autonom este în prezent oprit"}
            </p>
          </div>
          
          {/* Statistici */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-800">Total propuneri</span>
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-900">{stats.totalProposals}</p>
              <p className="text-xs text-blue-700 mt-1">
                {stats.pendingProposals} în așteptare
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-800">Propuneri aprobate</span>
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-900">{stats.approvedProposals}</p>
              <p className="text-xs text-green-700 mt-1">
                {stats.autoApproved} aprobate automat
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-amber-800">Propuneri vitale</span>
                <Sparkles className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-amber-900">{stats.vitalProposals}</p>
              <p className="text-xs text-amber-700 mt-1">
                Prioritate maximă de procesare
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-lg border border-red-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-red-800">Propuneri respinse</span>
                <X className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-900">{stats.rejectedProposals}</p>
              <p className="text-xs text-red-700 mt-1">
                Rată de succes: {stats.successRate}%
              </p>
            </div>
          </div>
          
          {/* Tabs pentru statistici detaliate */}
          <Tabs defaultValue="pending" className="mt-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="pending" className="text-xs">
                În așteptare ({stats.pendingProposals})
              </TabsTrigger>
              <TabsTrigger value="vital" className="text-xs">
                Vitale ({stats.vitalProposals})
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">
                Performanță
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Propuneri în așteptare</h4>
                  <ListChecks className="h-4 w-4 text-slate-500" />
                </div>
                
                <div className="text-sm text-slate-700">
                  <p>
                    Sunt <span className="font-medium">{stats.pendingProposals}</span> propuneri în așteptarea evaluării. 
                    Sistemul autonom va procesa aceste propuneri în funcție de importanța lor.
                  </p>
                  <div className="mt-3 text-xs text-slate-600">
                    <p>Propunerile vitale sunt procesate primele și au cele mai mari șanse de aprobare automată.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="vital">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-amber-900">Propuneri vitale pentru ecosistem</h4>
                  <Sparkles className="h-4 w-4 text-amber-600" />
                </div>
                
                <div className="text-sm text-amber-800">
                  <p>
                    Sunt <span className="font-medium">{stats.vitalProposals}</span> propuneri marcate ca vitale în sistem.
                    Acestea au prioritate maximă și de obicei sunt aprobate automat.
                  </p>
                  <div className="mt-3 text-xs text-amber-700">
                    <p>O propunere este considerată vitală dacă conține cuvinte cheie precum: vital, critic, esențial, etc.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Performanță sistem autonom</h4>
                  <Activity className="h-4 w-4 text-slate-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Rată de aprobare</span>
                      <span className="font-medium">{stats.successRate}%</span>
                    </div>
                    <Progress value={stats.successRate} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Autonomie decizională</span>
                      <span className="font-medium">{autonomyLevel}%</span>
                    </div>
                    <Progress value={autonomyLevel} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Rata de procesare automată</span>
                      <span className="font-medium">
                        {stats.autoApproved > 0 && stats.approvedProposals > 0 
                          ? Math.round((stats.autoApproved / stats.approvedProposals) * 100) 
                          : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={
                        stats.autoApproved > 0 && stats.approvedProposals > 0 
                          ? Math.round((stats.autoApproved / stats.approvedProposals) * 100) 
                          : 0
                      } 
                      className="h-1.5" 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
