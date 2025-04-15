
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pointer, Palette, Type, Layout } from "lucide-react";
import { ElementControls } from "./tabs/ElementControls";
import { ColorsTab } from "./tabs/ColorsTab";
import { TypographyTab } from "./tabs/TypographyTab";
import { LayoutTab } from "./tabs/LayoutTab";

interface StyleManagerTabsProps {
  selectedElementPath: string | null;
  activeStyles: { [key: string]: string };
  onStyleChange: (property: string, value: string) => void;
}

export function StyleManagerTabs({
  selectedElementPath,
  activeStyles,
  onStyleChange
}: StyleManagerTabsProps) {
  return (
    <Tabs defaultValue={selectedElementPath ? "element" : "colors"} className="space-y-4">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="element" className="flex items-center gap-2" disabled={!selectedElementPath}>
          <Pointer className="h-4 w-4" />
          <span>Element</span>
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span>Culori</span>
        </TabsTrigger>
        <TabsTrigger value="typography" className="flex items-center gap-2">
          <Type className="h-4 w-4" />
          <span>Tipografie</span>
        </TabsTrigger>
        <TabsTrigger value="layout" className="flex items-center gap-2">
          <Layout className="h-4 w-4" />
          <span>Layout</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="element">
        {selectedElementPath && (
          <ElementControls 
            activeStyles={activeStyles}
            onStyleChange={onStyleChange}
          />
        )}
      </TabsContent>

      <TabsContent value="colors">
        <ColorsTab onStyleChange={onStyleChange} />
      </TabsContent>

      <TabsContent value="typography">
        <TypographyTab onStyleChange={onStyleChange} />
      </TabsContent>

      <TabsContent value="layout">
        <LayoutTab onStyleChange={onStyleChange} />
      </TabsContent>
    </Tabs>
  );
}
