
import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/layout";
import { Section } from "@/components/ui/layout/section";
import { PageHeader } from "@/components/ui/layout/page-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StyledCard } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Backups = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateBackup = () => {
    setIsLoading(true);
    setTimeout(() => {
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
            icon={() => <span>🔄</span>}
            title="Backup și Restaurare"
            description="Gestionează backup-urile și recuperarea datelor"
          />

          <StyledCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Backup-uri Disponibile</h2>
              <Button onClick={handleCreateBackup} disabled={isLoading}>
                {isLoading ? "Se creează..." : "Creează Backup Nou"}
              </Button>
            </div>
          </StyledCard>
        </Section>
      </ScrollArea>
    </Layout>
  );
};

export default Backups;
