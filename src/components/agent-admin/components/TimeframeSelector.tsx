
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeframeSelectorProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  timeframe, 
  setTimeframe 
}) => {
  return (
    <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="1d">Zi</TabsTrigger>
        <TabsTrigger value="7d">7 zile</TabsTrigger>
        <TabsTrigger value="30d">30 zile</TabsTrigger>
        <TabsTrigger value="all">Toate</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
