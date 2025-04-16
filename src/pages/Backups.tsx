
import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StyledCard } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, RefreshCw } from "lucide-react";

const Backups = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [backups, setBackups] = useState<{ id: string; date: string; size: string }[]>([
    { id: "1", date: "2025-04-14 10:30", size: "4.2 MB" },
    { id: "2", date: "2025-04-07 14:15", size: "4.1 MB" }
  ]);
  
  const handleCreateBackup = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newBackup = {
        id: `${backups.length + 1}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        size: "4.3 MB"
      };
      setBackups([newBackup, ...backups]);
      setIsLoading(false);
      toast({
        title: "Backup creat",
        description: "Backup-ul a fost creat cu succes.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <Section>
          <PageHeader
            icon={RefreshCw}
            title="Backup și Restaurare"
            description="Gestionează backup-urile și recuperarea datelor"
          />

          <StyledCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Backup-uri Disponibile</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Backup-urile sunt salvate automat săptămânal și pot fi descărcate oricând
                  </p>
                  <Button onClick={handleCreateBackup} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Se creează...
                      </>
                    ) : (
                      <>Creează Backup Nou</>
                    )}
                  </Button>
                </div>
                
                {backups.length > 0 ? (
                  <div className="border rounded-md">
                    <div className="grid grid-cols-3 font-medium p-3 bg-muted text-muted-foreground text-sm">
                      <div>Data</div>
                      <div>Mărime</div>
                      <div className="text-right">Acțiuni</div>
                    </div>
                    {backups.map((backup) => (
                      <div 
                        key={backup.id} 
                        className="grid grid-cols-3 p-3 border-t items-center text-sm"
                      >
                        <div>{backup.date}</div>
                        <div>{backup.size}</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="mr-2 h-4 w-4" /> 
                            Descarcă
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center p-4 border border-dashed rounded-md">
                    Nu există backup-uri disponibile
                  </p>
                )}
              </div>
            </div>
          </StyledCard>
        </Section>
      </ScrollArea>
    </Layout>
  );
};

export default Backups;
