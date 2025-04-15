
import { useState, useEffect } from 'react';

export const useElementSelector = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [selectedElementPath, setSelectedElementPath] = useState<string>("");
  const [activeStyles, setActiveStyles] = useState<{[key: string]: string}>({});

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
    
    if (selectedElement) {
      selectedElement.style.outline = '';
    }
    
    target.style.outline = '2px solid #9b87f5';
    target.style.outlineOffset = '2px';
    
    setSelectedElement(target);
    const path = getElementPath(target);
    setSelectedElementPath(path);
    
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
      
      if (selectedElement) {
        selectedElement.style.outline = '';
        setSelectedElement(null);
      }
    }
  };

  useEffect(() => {
    if (isSelecting) {
      document.addEventListener('click', handleElementClick);
      document.body.style.cursor = 'pointer';
    } else {
      document.removeEventListener('click', handleElementClick);
      document.body.style.cursor = '';
      
      if (selectedElement) {
        selectedElement.style.outline = '';
      }
    }
    
    return () => {
      document.removeEventListener('click', handleElementClick);
      document.body.style.cursor = '';
      if (selectedElement) {
        selectedElement.style.outline = '';
      }
    };
  }, [isSelecting]);

  return {
    isSelecting,
    selectedElement,
    selectedElementPath,
    activeStyles,
    toggleSelectionMode,
    setActiveStyles
  };
};
