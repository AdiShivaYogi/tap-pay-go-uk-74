
import { Compass, ChevronRight, Star, BarChart2, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { roadmapItems } from "../data/roadmap-data";
import { calculateSecurityScore, getSecurityDetails, getSecurityCriteria } from "@/utils/security-score";
import { cn } from "@/lib/utils";

export const RoadmapHeader = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);
  
  // Calculate security score
  const securityCriteria = getSecurityCriteria();
  const securityScore = calculateSecurityScore(securityCriteria);
  const securityDetails = getSecurityDetails();
  
  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-8 space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Compass className="h-4 w-4" />
        <span>Roadmap</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Development Progress</span>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-4">
            Development Roadmap
            <Star className="text-yellow-500 h-6 w-6" />
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Track our progress and commitment to security, transparency, and user experience
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{completionPercentage}%</span>
          </div>
          <p className="text-sm text-muted-foreground">Overall Progress</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Progress value={completionPercentage} className="h-2 bg-primary/20" />
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-medium">Security & Transparency Score</span>
          </div>
          <span className="text-lg font-bold text-green-600">{securityScore}%</span>
        </div>
        
        <Progress 
          value={securityScore} 
          className={cn("h-2 bg-green-100", "data-[value]:bg-green-600")}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-sm">
          {securityDetails.map((detail, index) => (
            <div 
              key={index}
              className={`px-3 py-1 rounded-full text-center ${
                detail.isActive 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {detail.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
