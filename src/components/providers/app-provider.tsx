import React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SupabaseProvider } from "@/integrations/supabase/supabase-provider";
import { ToastProvider } from "@/components/ui/use-toast";
import { AutonomousEngineProvider } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";
import { AutoExecution } from "@/features/agent-autonomy/AutoExecution";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseProvider>
        <AutonomousEngineProvider>
          <ToastProvider>
            <AutoExecution />
            {children}
          </ToastProvider>
        </AutonomousEngineProvider>
      </SupabaseProvider>
    </ThemeProvider>
  );
};
