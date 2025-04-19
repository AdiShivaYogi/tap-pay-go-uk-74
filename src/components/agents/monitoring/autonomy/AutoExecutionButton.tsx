
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles, Zap } from "lucide-react";
import { useAutonomousEngine } from "@/components/agents/autonomous-engine/AutonomousEngineProvider";

export const AutoExecutionButton = () => {
  const { isRunning, enableFullAutonomy, boostAutonomy, autonomyLevel } = useAutonomousEngine();
  const [isEnabling, setIsEnabling] = useState(false);

  // Activare completă cu efect vizual
  const handleEnableFullAutonomy = () => {
    setIsEnabling(true);
    
    // Adăugăm delay pentru efect vizual
    setTimeout(() => {
      enableFullAutonomy();
      setIsEnabling(false);
    }, 800);
  };

  // Boost rapid al autonomiei
  const handleBoostAutonomy = () => {
    boostAutonomy();
  };
  
  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white"
              onClick={handleEnableFullAutonomy}
              disabled={isEnabling || (isRunning && autonomyLevel >= 100)}
            >
              <Sparkles className={`mr-2 h-4 w-4 ${isEnabling ? 'animate-pulse' : ''}`} />
              {isEnabling ? "Inițiere autonomie completă..." : "Lansare totală autonomie"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activează autonomia completă (100%) pentru toți agenții, permițând auto-evoluția și adaptarea în timp real</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full border-amber-300 hover:bg-amber-50 text-amber-700"
              onClick={handleBoostAutonomy}
              disabled={!isRunning || autonomyLevel >= 100}
            >
              <Zap className="mr-2 h-4 w-4" />
              Accelerare autonomie (+15%)
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Crește nivelul de autonomie curent cu 15%, permițând agenților să ia mai multe decizii independent</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
