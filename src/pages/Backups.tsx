import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StyledCard } from "@/components/ui/cards";
import { Database, Download, HardDrive, RotateCcw, Calendar } from "lucide-react";

const Backups = () => {
  const [backupProgress, setBackupProgress] = React.useState(0);
  const [restoreProgress, setRestoreProgress] = React.useState(0);
  const [isBackingUp, setIsBackingUp] = React.useState(false);
  const [isRestoring, setIsRestoring] = React.useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupProgress(0);

    // Simulate backup process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setBackupProgress(i);
    }

    setIsBackingUp(false);
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    setRestoreProgress(0);

    // Simulate restore process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setRestoreProgress(i);
    }

    setIsRestoring(false);
  };

  return (
    <Layout>
      <Section>
        <PageHeader
          icon={Database}
          title="Backup & Restore"
          description="Manage your application data backups and restore points"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backup Card */}
          <StyledCard>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Create Backup</h3>
                <HardDrive className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Create a new backup of your application data.
              </p>
              <Button onClick={handleBackup} disabled={isBackingUp}>
                {isBackingUp ? (
                  <>
                    Backing Up...
                    <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Create Backup
                    <Download className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              {isBackingUp && (
                <Progress value={backupProgress} className="mt-2" />
              )}
            </div>
          </StyledCard>

          {/* Restore Card */}
          <StyledCard>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Restore Backup</h3>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Restore your application data from a previous backup.
              </p>
              <Button onClick={handleRestore} disabled={isRestoring}>
                {isRestoring ? (
                  <>
                    Restoring...
                    <RotateCcw className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Restore Backup
                    <RotateCcw className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              {isRestoring && (
                <Progress value={restoreProgress} className="mt-2" />
              )}
            </div>
          </StyledCard>
        </div>
      </Section>
    </Layout>
  );
};

export default Backups;
