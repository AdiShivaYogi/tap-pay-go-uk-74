
import { Layout } from "@/components/layout/layout";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessRestrictionAlert } from "@/features/roadmap/components/AccessRestrictionAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, HardDrive, CloudUpload, Check, Download, FileArchive } from "lucide-react";
import { BackupProgress } from "@/features/roadmap/components/BackupProgress";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";
import { Button } from "@/components/ui/button";

const backupTypes = [
  {
    title: "Backup Incremental Automat",
    description: "Backup incremental realizat la fiecare 12 ore",
    icon: Database,
    lastBackup: "2025-04-15 14:00",
    status: "success",
    size: "2.3 GB",
    archiveUrl: "/backups/incremental-2025-04-15.zip"
  },
  {
    title: "Backup Complet",
    description: "Backup complet săptămânal",
    icon: HardDrive,
    lastBackup: "2025-04-14 00:00",
    status: "success",
    size: "15.7 GB",
    archiveUrl: "/backups/complete-2025-04-14.zip"
  },
  {
    title: "Backup Cloud",
    description: "Sincronizare cu storage-ul cloud",
    icon: CloudUpload,
    lastBackup: "2025-04-15 15:30",
    status: "success",
    size: "18.1 GB",
    archiveUrl: "/backups/cloud-2025-04-15.zip"
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

  const handleDownload = (url: string) => {
    // În implementarea reală, aici ar trebui să fie logica de download
    console.log(`Downloading backup from: ${url}`);
  };

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={Database}
            title="Management Backups"
            description="Status și informații despre backupurile automate"
          />

          <div className="space-y-6 max-w-[1400px] mx-auto">
            <BackupProgress />

            <div className="grid gap-4 md:grid-cols-3">
              {backupTypes.map((backup) => (
                <StyledCard key={backup.title}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <backup.icon className="h-5 w-5 text-primary/80" />
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
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleDownload(backup.archiveUrl)}
                        >
                          <FileArchive className="h-4 w-4 mr-1" />
                          Arhivă ZIP
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => handleDownload(backup.archiveUrl)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </StyledCard>
              ))}
            </div>
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default Backups;
