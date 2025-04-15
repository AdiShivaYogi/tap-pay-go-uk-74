
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import mvpContent from '../data/mvp-roadmap.md?raw';
import { cn } from "@/lib/utils";

export const MVPRoadmap = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardHeader className="flex flex-row items-center justify-between cursor-pointer"
                 onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>MVP Roadmap</span>
        </CardTitle>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>
      
      <CardContent className={cn(
        "transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-[600px]" : "max-h-0"
      )}>
        <ScrollArea className="h-[500px] w-full pr-4">
          <div className="prose prose-sm dark:prose-invert">
            {mvpContent.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mt-6 mb-3 text-primary">{line.replace('## ', '')}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-medium mt-4 mb-2">{line.replace('### ', '')}</h3>;
              } else if (line.startsWith('- ')) {
                return (
                  <div key={index} className="flex items-start gap-2 my-1">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span>{line.replace('- ', '')}</span>
                  </div>
                );
              } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) {
                return <div key={index} className="ml-4 my-2">{line}</div>;
              } else if (line.includes('**')) {
                return <div key={index} className="font-semibold my-2">{line.split('**').join('')}</div>;
              } else {
                return <p key={index} className="my-2">{line}</p>;
              }
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
