
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ChevronDown, ChevronUp, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { mvpRoadmapData, RoadmapSection } from '../data/mvp-roadmap';

export const MVPRoadmap = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>(
    mvpRoadmapData.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
  );

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderSectionItems = (section: RoadmapSection) => {
    return section.items.map((item, itemIndex) => (
      <div 
        key={itemIndex} 
        className="flex items-start gap-2 my-1"
      >
        <span className={cn(
          "mt-1.5 w-1.5 h-1.5 rounded-full",
          section.completed ? "bg-green-500" : "bg-primary/50"
        )} />
        <span>{item}</span>
        {section.completed && <CheckIcon className="ml-2 h-4 w-4 text-green-500" />}
      </div>
    ));
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      {mvpRoadmapData.map((section, index) => (
        <div key={index}>
          <CardHeader 
            className="flex flex-row items-center justify-between cursor-pointer"
            onClick={() => toggleSection(index)}
          >
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>{section.title}</span>
            </CardTitle>
            {expandedSections[index] ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </CardHeader>
          
          <CardContent 
            className={cn(
              "transition-all duration-300 overflow-hidden",
              expandedSections[index] ? "max-h-[600px]" : "max-h-0"
            )}
          >
            <ScrollArea className="h-[300px] w-full pr-4">
              <div className="prose prose-sm dark:prose-invert">
                {renderSectionItems(section)}
              </div>
            </ScrollArea>
          </CardContent>
        </div>
      ))}
    </Card>
  );
};
