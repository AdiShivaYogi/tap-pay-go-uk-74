
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { 
  ShieldCheck, 
  Bot, 
  Command, 
  Server,
  Sparkles,
  BrainCircuit,
  Activity,
  ListTodo,
  BarChart,
  Settings
} from "lucide-react";

const sidebarItems = [
  {
    title: "Monitorizare & Control",
    icon: Activity,
    value: "monitoring",
    highlight: true
  },
  {
    title: "Administrare & Propuneri",
    icon: Bot,
    value: "admin"
  },
  {
    title: "Control Unificat",
    icon: Command,
    value: "unified"
  },
  {
    title: "Configurări API",
    icon: Server,
    value: "api-config"
  }
];

interface AgentCentralCommandSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AgentCentralCommandSidebar({ 
  activeTab, 
  onTabChange 
}: AgentCentralCommandSidebarProps) {
  return (
    <Sidebar className="bg-white border-r border-slate-200">
      <SidebarContent>
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Centru Comandă</h2>
          </div>
          <p className="text-xs text-slate-500">Sistem unificat de monitorizare & control</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-slate-500">Meniu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem 
                  key={item.value}
                  className={activeTab === item.value ? 
                    "bg-gradient-to-r from-purple-50 to-purple-100 border-l-2 border-purple-500" : 
                    "hover:bg-slate-100 transition-colors"}
                >
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.value)}
                    className={`flex items-center gap-2.5 px-2 ${
                      activeTab === item.value 
                        ? "text-purple-700 font-medium" 
                        : "text-slate-700"}`}
                  >
                    <item.icon className={`h-4.5 w-4.5 ${
                      activeTab === item.value 
                        ? "text-purple-600" 
                        : "text-slate-500"}`} 
                    />
                    <span>{item.title}</span>
                    {item.highlight && (
                      <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                        <Sparkles className="mr-1 h-3 w-3 text-purple-500" />
                        Activ
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-sm font-medium text-slate-500">Funcționalități</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center gap-2.5 px-2 text-slate-700"
                  onClick={() => onTabChange("tasks")}
                >
                  <ListTodo className="h-4.5 w-4.5 text-slate-500" />
                  <span>Gestionare Sarcini</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center gap-2.5 px-2 text-slate-700"
                  onClick={() => onTabChange("reports")}
                >
                  <BarChart className="h-4.5 w-4.5 text-slate-500" />
                  <span>Rapoarte & Analize</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center gap-2.5 px-2 text-slate-700"
                  onClick={() => onTabChange("settings")}
                >
                  <Settings className="h-4.5 w-4.5 text-slate-500" />
                  <span>Setări Avansate</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center gap-2.5 px-2 text-slate-700"
                  onClick={() => onTabChange("security")}
                >
                  <ShieldCheck className="h-4.5 w-4.5 text-slate-500" />
                  <span>Securitate & Control</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="px-4 py-6 mt-auto">
          <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white shadow-lg">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Autonomie Sistem
            </h3>
            <p className="text-xs mt-1.5 text-white/90">
              Sistemul de agenți autonomi este activ și funcționează la parametri optimi
            </p>
            <div className="mt-3 bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-white/80 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-white/70">
              <span>Nivel autonomie</span>
              <span>65%</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
