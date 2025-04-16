
import React from 'react';
import { Award, Calendar } from "lucide-react";

interface Achievement {
  title: string;
  date: string;
  description: string;
}

interface RecentAchievementsProps {
  achievements: Achievement[];
}

export const RecentAchievements = ({ achievements }: RecentAchievementsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Award className="h-4 w-4 text-amber-500" />
        <span>Realizări Recente</span>
      </h3>
      
      <div className="grid gap-4 md:grid-cols-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-green-100/30 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{achievement.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-auto">
              <Calendar className="h-3 w-3" />
              <span>{achievement.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
