
import React from "react";
import { StyledCard } from "@/components/ui/card-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Palette, Sliders, Type, Layout } from "lucide-react";
import { Input } from "@/components/ui/input";
import { theme } from "@/config/theme";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function GlobalCssManager() {
  const [customCss, setCustomCss] = React.useState("");
  
  const handleApplyChanges = () => {
    const style = document.createElement('style');
    style.innerHTML = customCss;
    document.head.appendChild(style);
  };

  return (
    <StyledCard className="w-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className={theme.typography.h3}>Manager CSS Global</h3>
          <Sliders className="h-5 w-5 text-muted-foreground" />
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Modificați stilurile CSS la nivel global. Previzualizați schimbările în timp real.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="colors" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
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

          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Culoare Primară</Label>
                <Input 
                  type="color" 
                  value="#9b87f5"
                  onChange={(e) => {
                    const css = `:root { --primary: ${e.target.value}; }`;
                    setCustomCss(css);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Culoare Secundară</Label>
                <Input 
                  type="color" 
                  value="#7E69AB"
                  onChange={(e) => {
                    const css = `:root { --secondary: ${e.target.value}; }`;
                    setCustomCss(css);
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Font Size Base</Label>
                <Input 
                  type="range" 
                  min="12" 
                  max="20" 
                  defaultValue="16"
                  onChange={(e) => {
                    const css = `html { font-size: ${e.target.value}px; }`;
                    setCustomCss(css);
                  }}
                />
              </div>
              <div>
                <Label>Line Height</Label>
                <Input 
                  type="range" 
                  min="1" 
                  max="2" 
                  step="0.1"
                  defaultValue="1.5"
                  onChange={(e) => {
                    const css = `body { line-height: ${e.target.value}; }`;
                    setCustomCss(css);
                  }}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Container Max Width</Label>
                <Input 
                  type="range" 
                  min="768" 
                  max="1920" 
                  step="64"
                  defaultValue="1280"
                  onChange={(e) => {
                    const css = `.container { max-width: ${e.target.value}px; }`;
                    setCustomCss(css);
                  }}
                />
              </div>
              <div>
                <Label>Gap Size</Label>
                <Input 
                  type="range" 
                  min="4" 
                  max="16" 
                  defaultValue="8"
                  onChange={(e) => {
                    const css = `:root { --gap: ${e.target.value}px; }`;
                    setCustomCss(css);
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <Label>CSS Personalizat</Label>
          <Textarea 
            value={customCss}
            onChange={(e) => setCustomCss(e.target.value)}
            placeholder="Introduceți CSS personalizat aici..."
            className="font-mono text-sm"
          />
          <Button onClick={handleApplyChanges} className="w-full">
            Aplică Modificările
          </Button>
        </div>
      </div>
    </StyledCard>
  );
}
