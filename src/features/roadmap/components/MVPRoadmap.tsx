import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { StyledCard } from "@/components/ui/cards";
import { ChevronRight, Download, FileText } from "lucide-react";
import { mvpRoadmapText } from "../data/mvp-roadmap";
import { StatusBadges } from "./StatusBadges";

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'planned' | 'inProgress' | 'completed';
  progress: number;
}

export const MVPRoadmap = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard className="border-primary/10">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Roadmap MVP</h2>
          </div>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Descarcă PDF
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Progres general</p>
            <p className="text-sm font-medium">75%</p>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <Separator />

        <div className="space-y-4">
          {mvpRoadmapText.slice(0, expanded ? mvpRoadmapText.length : 3).map((item, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-md font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <StatusBadges status={item.status} />
              </div>
              <div className="mt-3">
                <Progress value={item.progress} className="h-2" />
              </div>
            </div>
          ))}

          {mvpRoadmapText.length > 3 && (
            <Button variant="link" className="w-full justify-start" onClick={toggleExpanded}>
              {expanded ? (
                <>
                  Arată mai puțin <ChevronRight className="h-4 w-4 ml-1 rotate-180" />
                </>
              ) : (
                <>
                  Arată tot <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </StyledCard>
  );
};
