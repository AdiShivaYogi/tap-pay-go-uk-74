
import React, { useState, useEffect } from "react";
import { StyledCard } from "@/components/ui/card-variants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Palette, Sliders, Type, Layout, Pointer, Wand2, X, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { theme } from "@/config/theme";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

export function GlobalCssManager({ isSheet = false }) {
  const [customCss, setCustomCss] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [selectedElementPath, setSelectedElementPath] = useState<string>("");
  const [activeStyles, setActiveStyles] = useState<{[key: string]: string}>({});
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  
  const handleApplyChanges = () => {
    // Crează un ID unic pentru stylesheet
    const styleId = "global-css-custom-styles";
    
    // Verifică dacă stylesheet-ul există deja și îl elimină
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
    
    // Crează un nou stylesheet și adaugă CSS-ul
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = customCss;
    document.head.appendChild(style);
  };

  const getElementPath = (element: HTMLElement): string => {
    if (!element || element === document.body) {
      return '';
    }
    
    let selector = element.tagName.toLowerCase();
    
    if (element.id) {
      selector += '#' + element.id;
    } else if (element.className) {
      const classes = Array.from(element.classList).join('.');
      if (classes) {
        selector += '.' + classes;
      }
    }
    
    const parent = element.parentElement;
    if (parent && parent !== document.body) {
      return `${getElementPath(parent)} > ${selector}`;
    }
    
    return selector;
  };

  const handleElementClick = (e: MouseEvent) => {
    if (!isSelecting) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target as HTMLElement;
    if (target === selectedElement) return;
    
    // Reset border for previously selected element
    if (selectedElement) {
      selectedElement.style.outline = '';
    }
    
    // Set border for new selected element
    target.style.outline = '2px solid #9b87f5';
    target.style.outlineOffset = '2px';
    
    setSelectedElement(target);
    const path = getElementPath(target);
    setSelectedElementPath(path);
    
    // Get computed styles
    const computedStyle = window.getComputedStyle(target);
    const styles = {
      'color': computedStyle.color,
      'backgroundColor': computedStyle.backgroundColor,
      'fontSize': computedStyle.fontSize,
      'fontWeight': computedStyle.fontWeight,
      'padding': computedStyle.padding,
      'margin': computedStyle.margin,
      'borderRadius': computedStyle.borderRadius
    };
    
    setActiveStyles(styles);
    
    // Create CSS for the element
    const css = `${path} {\n  color: ${styles.color};\n  background-color: ${styles.backgroundColor};\n  font-size: ${styles.fontSize};\n  font-weight: ${styles.fontWeight};\n}\n`;
    setCustomCss(css);
  };

  const toggleSelectionMode = () => {
    const newSelectingState = !isSelecting;
    setIsSelecting(newSelectingState);
    
    if (newSelectingState) {
      document.body.style.cursor = 'pointer';
      document.addEventListener('click', handleElementClick);
    } else {
      document.body.style.cursor = '';
      document.removeEventListener('click', handleElementClick);
      
      // Reset border for selected element
      if (selectedElement) {
        selectedElement.style.outline = '';
        setSelectedElement(null);
      }
    }
  };
  
  const handleUpdateStyle = (property: string, value: string) => {
    if (!selectedElement) return;
    
    const newStyles = { ...activeStyles, [property]: value };
    setActiveStyles(newStyles);
    
    // Update the selected element style directly
    selectedElement.style[property as any] = value;
    
    // Update CSS
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

  // Adaugă și elimină handler-ul de click când se schimbă starea de selecție
  useEffect(() => {
    if (isSelecting) {
      document.addEventListener('click', handleElementClick);
      document.body.style.cursor = 'pointer';
    } else {
      document.removeEventListener('click', handleElementClick);
      document.body.style.cursor = '';
      
      // Reset outline for selected element when exiting selection mode
      if (selectedElement) {
        selectedElement.style.outline = '';
      }
    }
    
    // Cleanup on component unmount
    return () => {
      document.removeEventListener('click', handleElementClick);
      document.body.style.cursor = '';
      
      // Reset ui when component unmounts
      if (selectedElement) {
        selectedElement.style.outline = '';
      }
    };
  }, [isSelecting]);

  // Cleanup any event handlers when component unmounts
  useEffect(() => {
    return () => {
      document.removeEventListener('click', handleElementClick);
      document.removeEventListener('mousemove', handleDragMove as any);
      document.removeEventListener('mouseup', handleDragEnd as any);
      document.body.style.cursor = '';
    };
  }, []);

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

        {selectedElementPath && (
          <TabsContent value="element" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Culoare Text</Label>
                <Input 
                  type="color" 
                  value={activeStyles.color || "#000000"}
                  onChange={(e) => handleUpdateStyle('color', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Culoare Fundal</Label>
                <Input 
                  type="color" 
                  value={activeStyles.backgroundColor || "#ffffff"}
                  onChange={(e) => handleUpdateStyle('backgroundColor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Dimensiune Font ({activeStyles.fontSize})</Label>
                <Input 
                  type="range" 
                  min="8" 
                  max="32" 
                  value={parseInt(activeStyles.fontSize) || 16}
                  onChange={(e) => handleUpdateStyle('fontSize', `${e.target.value}px`)}
                />
              </div>
              <div className="space-y-2">
                <Label>Grosime Font ({activeStyles.fontWeight})</Label>
                <Input 
                  type="range" 
                  min="100" 
                  max="900" 
                  step="100"
                  value={activeStyles.fontWeight || 400}
                  onChange={(e) => handleUpdateStyle('fontWeight', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        )}

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
          className="font-mono text-sm h-32"
        />
        <Button onClick={handleApplyChanges} className="w-full">
          Aplică Modificările
        </Button>
      </div>
    </div>
  );

  // Dacă este folosit ca panou lateral, returnează Sheet
  if (isSheet) {
    return renderContent();
  }
  
  // Dacă este folosit ca card normal, returnează StyledCard
  return (
    <>
      {/* Buton flotant pentru activare CSS Manager */}
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
