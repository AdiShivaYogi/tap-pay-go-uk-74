
import { CheckCircle2, Clock, CircleDot, AlertTriangle } from "lucide-react";
import { roadmapItems } from "../types";

export const RoadmapProgress = () => {
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === "completed").length;
  const inProgressItems = roadmapItems.filter(item => item.status === "in-progress").length;
  const pendingItems = roadmapItems.filter(item => item.status === "pending").length;
  const highPriorityItems = roadmapItems.filter(item => item.priority === "high").length;

  // Calculate completion percentage for the Stripe integration
  const stripeIntegration = roadmapItems.find(item => 
    item.title === "Integrare Stripe Complex"
  );
  
  const stripeCompletionPercentage = stripeIntegration 
    ? Math.round((stripeIntegration.timeEstimate.spent / stripeIntegration.timeEstimate.total) * 100) 
    : 0;

  const stats = [
    {
      label: "Completate",
      value: completedItems,
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      label: "În Lucru",
      value: inProgressItems,
      icon: Clock,
      color: "text-blue-500"
    },
    {
      label: "În Așteptare",
      value: pendingItems,
      icon: CircleDot,
      color: "text-gray-400"
    },
    {
      label: "Prioritate Înaltă",
      value: highPriorityItems,
      icon: AlertTriangle,
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="flex items-center gap-4 p-4 rounded-lg border bg-card"
          >
            <div className={`p-2 rounded-full bg-background ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      {stripeIntegration && stripeIntegration.status === "in-progress" && (
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">Integrare Stripe Complex</h3>
            </div>
            <span className="text-sm font-medium">{stripeCompletionPercentage}% completat</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${stripeCompletionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Procesând {stripeIntegration.timeEstimate.spent} din {stripeIntegration.timeEstimate.total} ore estimate
          </p>
        </div>
      )}
    </div>
  );
};
