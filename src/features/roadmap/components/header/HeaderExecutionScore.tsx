
import { Progress } from "@/components/ui/progress";
import { useRoadmapProgress } from "@/features/roadmap/hooks/useRoadmapProgress";
import { StyledCard } from "@/components/ui/cards";

export const HeaderExecutionScore = () => {
  const { 
    totalTasks, 
    completedTasks, 
    completionPercentage, 
    difficultySum, 
    estimatedTimeSum 
  } = useRoadmapProgress();

  // Calculăm scorurile folosind datele disponibile
  const totalItems = totalTasks;
  const completedItems = completedTasks;
  const inProgressItems = 0; // Folosim valoarea default pentru că nu o avem disponibilă
  const pendingItems = totalTasks - completedTasks;
  const executionScore = Math.min(100, Math.round((completedTasks / (totalTasks || 1)) * 100));
  const progressScore = completionPercentage;
  const timeEfficiency = estimatedTimeSum > 0 ? Math.min(100, Math.round((completedTasks / estimatedTimeSum) * 100)) : 0;
  
  // Structură de date pentru scorul pe categorii
  const categoryProgress = [
    { name: "Securitate", completed: 4, total: 5 },
    { name: "Infrastructură", completed: 3, total: 6 },
    { name: "UI/UX", completed: 5, total: 7 }
  ];
  
  return (
    <StyledCard className="p-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Scor Execuție Roadmap</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total items</p>
            <p className="text-2xl font-semibold">{totalItems}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completate</p>
            <p className="text-2xl font-semibold text-green-600">{completedItems}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">În așteptare</p>
            <p className="text-2xl font-semibold text-amber-600">{pendingItems}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Scor execuție</p>
            <p className="text-2xl font-semibold">{executionScore}/100</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Scor progres</p>
            <p className="text-2xl font-semibold">{progressScore}/100</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Eficiență timp</p>
            <p className="text-2xl font-semibold">{timeEfficiency}/100</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Progres pe categorii</h4>
          <div className="space-y-3">
            {categoryProgress.map((category) => (
              <div key={category.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">
                    {category.completed}/{category.total}
                  </span>
                </div>
                <Progress 
                  value={Math.round((category.completed / category.total) * 100)} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledCard>
  );
};
