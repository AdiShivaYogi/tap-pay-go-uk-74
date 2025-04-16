import React from 'react';
import { Flame } from "lucide-react";
import { 
  StyledCard, 
  StyledCardHeader, 
  StyledCardTitle, 
  StyledCardContent 
} from "@/components/ui/cards";
import { RecentAchievements } from "./focus/RecentAchievements";
import { CurrentTasks } from "./focus/CurrentTasks";
import { UpcomingPriorities } from "./focus/UpcomingPriorities";
import { useFocusData } from "../hooks/useFocusData";

export const CurrentRoadmapFocus = () => {
  const { recentAchievements, currentTasks, upcomingFocus } = useFocusData();

  return (
    <StyledCard className="border-primary/10 bg-gradient-to-br from-primary/5 to-accent/10">
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Focus Curent și Priorități
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent className="space-y-6">
        {/* Recent Achievements */}
        <RecentAchievements achievements={recentAchievements} />
      
        {/* Current Focus */}
        <CurrentTasks tasks={currentTasks} />
        
        {/* Upcoming Priorities */}
        <UpcomingPriorities items={upcomingFocus} />
      </StyledCardContent>
    </StyledCard>
  );
};
