
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeViewerProps {
  proposedFiles: string[];
  proposedCode: Record<string, string>;
}

export const CodeViewer = ({ proposedFiles, proposedCode }: CodeViewerProps) => {
  return (
    <Tabs defaultValue={proposedFiles[0]} className="w-full">
      <TabsList className="w-full overflow-auto">
        {proposedFiles.map((file, index) => (
          <TabsTrigger key={index} value={file} className="text-xs">
            {file.split('/').pop()}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {proposedFiles.map((file, index) => (
        <TabsContent key={index} value={file}>
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <pre className="p-4 text-xs">
              <code>{proposedCode[file]}</code>
            </pre>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};
