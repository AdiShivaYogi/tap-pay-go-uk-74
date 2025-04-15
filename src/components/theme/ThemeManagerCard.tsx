
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorSection } from "./sections/ColorSection";
import { TypographySection } from "./sections/TypographySection";
import { SpacingSection } from "./sections/SpacingSection";
import { LayoutSection } from "./sections/LayoutSection";
import { Palette, Type, Layout, Space } from "lucide-react";
import { theme } from "@/config/theme";

export function ThemeManagerCard() {
  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Manager Teme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Culori</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span>Tipografie</span>
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex items-center gap-2">
              <Space className="h-4 w-4" />
              <span>Spațiere</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span>Layout</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <ColorSection />
          </TabsContent>
          
          <TabsContent value="typography">
            <TypographySection />
          </TabsContent>
          
          <TabsContent value="spacing">
            <SpacingSection />
          </TabsContent>
          
          <TabsContent value="layout">
            <LayoutSection />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
