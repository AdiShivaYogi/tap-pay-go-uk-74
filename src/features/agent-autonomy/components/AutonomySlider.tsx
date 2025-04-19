
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface AutonomySliderProps {
  autonomyLevel: number;
  maxAutonomyAllowed: number;
  isRunning: boolean;
  onValueChange: (value: number) => void;
}

export const AutonomySlider = ({
  autonomyLevel,
  maxAutonomyAllowed,
  isRunning,
  onValueChange
}: AutonomySliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Ajustare nivel autonomie:</label>
        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
          Max: {maxAutonomyAllowed}%
        </span>
      </div>
      <Slider
        value={[autonomyLevel]}
        max={maxAutonomyAllowed}
        step={5}
        onValueChange={(value) => onValueChange(value[0])}
        disabled={!isRunning}
        className="my-4"
      />
    </div>
  );
};
