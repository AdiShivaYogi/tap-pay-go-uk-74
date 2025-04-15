
import { Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { calculateSecurityScore, getSecurityCriteria, getSecurityDetails } from "@/utils/security-score";

export const HeaderSecurityScore = () => {
  const securityCriteria = getSecurityCriteria();
  const securityScore = calculateSecurityScore(securityCriteria);
  const securityDetails = getSecurityDetails();

  return (
    <div className="space-y-4">
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
  );
};
