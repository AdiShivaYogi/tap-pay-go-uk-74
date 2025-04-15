
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, Database, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const BackupProgress = () => {
  const backupProgress: number = 95; // Explicitly typed as number
  const isBackupComplete: boolean = backupProgress >= 100; // Use >= to handle cases near 100%

  return (
    <Card className="border-2 border-primary/10 mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Status Backup Incremental
          {isBackupComplete ? (
            <CircleCheck className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progres backup</span>
            <span className="font-medium">{backupProgress}%</span>
          </div>
          <Progress 
            value={backupProgress} 
            className={cn(
              "h-2",
              isBackupComplete ? "bg-green-100" : "bg-yellow-100",
              isBackupComplete ? "[&>[role=progressbar]]:bg-green-500" : "[&>[role=progressbar]]:bg-yellow-500"
            )} 
          />
          <p className="text-sm text-muted-foreground">
            {isBackupComplete 
              ? "Backup complet și validat" 
              : "Backup în progres - Documentație și proceduri finale"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

