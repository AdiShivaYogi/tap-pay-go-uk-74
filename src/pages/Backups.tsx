
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, HardDrive, CloudUpload, Check } from "lucide-react";
import { BackupProgress } from "@/features/roadmap/components/BackupProgress";

const backupTypes = [
  {
    title: "Backup Incremental Automat",
    description: "Backup incremental realizat la fiecare 24 de ore",
    icon: Database,
    lastBackup: "2025-04-15 02:00",
    status: "success",
    size: "2.3 GB"
  },
  {
    title: "Backup Complet",
    description: "Backup complet săptămânal",
    icon: HardDrive,
    lastBackup: "2025-04-14 00:00",
    status: "success",
    size: "15.7 GB"
  },
  {
    title: "Backup Cloud",
    description: "Sincronizare cu storage-ul cloud",
    icon: CloudUpload,
    lastBackup: "2025-04-15 03:30",
    status: "success",
    size: "18.1 GB"
  }
];

const Backups = () => {
  const { isAdmin, role } = useUserRole();

  if (!isAdmin) {
    return (
      <Layout>
        <AccessRestrictionAlert role={role} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container py-8">
          <div className="space-y-6 max-w-[1400px] mx-auto">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Database className="h-8 w-8 text-primary" />
                Management Backups
              </h1>
              <p className="text-muted-foreground mt-1">
                Status și informații despre backupurile automate
              </p>
            </div>

            <BackupProgress />

            <div className="grid gap-4 md:grid-cols-3">
              {backupTypes.map((backup) => (
                <Card key={backup.title} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <backup.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{backup.title}</h3>
                    </div>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{backup.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ultimul backup</span>
                      <span>{backup.lastBackup}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mărime</span>
                      <span>{backup.size}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default Backups;
