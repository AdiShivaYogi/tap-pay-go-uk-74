
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
  Settings, 
  Activity,
  Server 
} from "lucide-react";

const sidebarItems = [
  {
    title: "Monitorizare & Control",
    icon: ShieldCheck,
    value: "monitoring"
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Meniu Agenți</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem 
                  key={item.value}
                  active={activeTab === item.value}
                >
                  <SidebarMenuButton 
                    onClick={() => onTabChange(item.value)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
