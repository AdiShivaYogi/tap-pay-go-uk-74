
import React, { useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { useAuth } from "@/hooks/use-auth";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Crown, Activity, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/use-user-role";

const Dashboard = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Dashboard încărcat",
      description: "Bine ai venit în dashboard-ul TapToGo",
    });
  }, [toast]);

  if (!user) {
    return (
      <Layout>
        <Section>
          <AccessRestrictionAlert role="utilizator autentificat" />
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Agenți TapToGo
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Conectează-te cu agenții autonomi specializați pentru suport și taskuri.
              </p>
              <Link 
                to="/agents" 
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 inline-block"
              >
                Accesează Agenți
              </Link>
            </CardContent>
          </Card>
          
          {isAdmin && (
            <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-amber-50">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-500" />
                  Centru de Comandă Agenți
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Administrează, monitorizează și controlează ecosistemul de agenți autonomi.
                </p>
                <Link 
                  to="/agent-central-command" 
                  className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 inline-block"
                >
                  Accesează Centrul de Comandă
                </Link>
              </CardContent>
            </Card>
          )}
          
          {/* Alte carduri pentru dashboard pot fi adăugate aici */}
        </div>
        
        {isAdmin && (
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-amber-200 p-2 rounded-full">
                <Activity className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Centru de Comandă și Monitorizare Agenți</h3>
                <p className="text-amber-700 text-sm mb-3">
                  Ai acces la toate funcțiile avansate pentru administrarea și monitorizarea sistemului de agenți autonomi.
                </p>
                <div className="flex gap-3">
                  <Link 
                    to="/agent-central-command" 
                    className="bg-white border border-amber-300 text-amber-700 px-3 py-1.5 rounded-md text-sm hover:bg-amber-50"
                  >
                    Centru de Comandă
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Restul conținutului dashboard-ului */}
      </Section>
    </Layout>
  );
};

export default Dashboard;
