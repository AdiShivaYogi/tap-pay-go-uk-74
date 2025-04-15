import React, { useState } from "react";
import { StyledCard } from "@/components/ui/card-variants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Sliders, Wand2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { theme } from "@/config/theme";
import { useElementSelector } from "@/hooks/use-element-selector";
import { CssEditor } from "./components/CssEditor";
import { StyleManagerTabs } from "./manager/StyleManagerTabs";

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

      <StyleManagerTabs
        selectedElementPath={selectedElementPath}
        activeStyles={activeStyles}
        onStyleChange={handleUpdateStyle}
      />

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
