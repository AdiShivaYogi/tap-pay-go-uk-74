import React, { useState } from "react";
import { StyledCard } from "@/components/ui/card-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Palette, Sliders, Type, Layout, Pointer, Wand2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { theme } from "@/config/theme";
import { useElementSelector } from "@/hooks/use-element-selector";
import { ElementStyleControls } from "./components/ElementStyleControls";
import { CssEditor } from "./components/CssEditor";

export function GlobalCssManager({ isSheet = false }) {
  const [customCss, setCustomCss] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  
  const {
    isSelecting,
    selectedElement,
    selectedElementPath,
    activeStyles,
    toggleSelectionMode,
    setActiveStyles
  } = useElementSelector();
  
  const handleApplyChanges = () => {
    const styleId = "global-css-custom-styles";
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = customCss;
    document.head.appendChild(style);
  };

  const handleUpdateStyle = (property: string, value: string) => {
    if (!selectedElement) return;
    
    const newStyles = { ...activeStyles, [property]: value };
    setActiveStyles(newStyles);
    
    selectedElement.style[property as any] = value;
    
    const styleLines = Object.entries(newStyles)
      .map(([key, val]) => `  ${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val};`)
      .join('\n');
    
    const css = `${selectedElementPath} {\n${styleLines}\n}\n`;
    setCustomCss(css);
  };
  
  const handleDragStart = (e: React.MouseEvent) => {
    if (!isDragging) {
      setIsDragging(true);
      document.addEventListener('mousemove', handleDragMove as any);
      document.addEventListener('mouseup', handleDragEnd as any);
    }
  };
  
  const handleDragMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 25,
        y: e.clientY - 25
      });
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragMove as any);
    document.removeEventListener('mouseup', handleDragEnd as any);
  };

  const renderContent = () => (
    <div className="space-y-6">
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
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="selection-mode" 
          checked={isSelecting} 
          onCheckedChange={toggleSelectionMode} 
        />
        <Label htmlFor="selection-mode">Mod selecție elemente</Label>
      </div>
      
      {selectedElementPath && (
        <Alert className="bg-primary/10">
          <Pointer className="h-4 w-4" />
          <AlertDescription>
            Element selectat: <code className="bg-muted p-1 rounded">{selectedElementPath}</code>
          </AlertDescription>
        </Alert>
      )}

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

        <TabsContent value="element" className="space-y-4">
          {selectedElementPath && (
            <ElementStyleControls 
              activeStyles={activeStyles}
              onStyleChange={handleUpdateStyle}
            />
          )}
        </TabsContent>

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

      <CssEditor
        css={customCss}
        onChange={setCustomCss}
        onApply={handleApplyChanges}
      />
    </div>
  );

  if (isSheet) {
    return renderContent();
  }
  
  return (
    <>
      <div 
        className="fixed z-50 flex flex-col gap-2"
        style={{ 
          left: position.x + 'px', 
          top: position.y + 'px' 
        }}
      >
        <Sheet>
          <div 
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg cursor-move"
            onMouseDown={handleDragStart}
          >
            <Wand2 className="h-6 w-6" />
          </div>
          <SheetContent side="right" className="w-full max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Manager CSS Global</SheetTitle>
              <SheetDescription>
                Modificați stilurile elementelor și aplicați schimbări globale.
              </SheetDescription>
            </SheetHeader>
            {renderContent()}
          </SheetContent>
        </Sheet>
      </div>

      <StyledCard className="w-full">
        <div className="p-6">
          {renderContent()}
        </div>
      </StyledCard>
    </>
  );
}
