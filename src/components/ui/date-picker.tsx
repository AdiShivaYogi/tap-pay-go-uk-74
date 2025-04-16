
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface DatePickerProps {
  date?: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | undefined;
  onSelect?: (date: Date | undefined) => void;
  defaultDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTodayButton?: boolean;
}

export function DatePicker({
  date,
  setDate,
  className,
  mode = "single",
  selected,
  onSelect,
  defaultDate,
  open,
  onOpenChange,
  showTodayButton = false,
}: DatePickerProps) {
  const handleSelect = React.useCallback(
    (selectedDate: Date | undefined) => {
      if (onSelect) {
        onSelect(selectedDate);
      } else if (setDate) {
        setDate(selectedDate);
      }
    },
    [onSelect, setDate]
  );

  const handleToday = () => {
    handleSelect(new Date());
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? (
            format(selected as Date, "PPP")
          ) : (
            <span>Alege o dată</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode}
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={defaultDate}
          initialFocus
        />
        {showTodayButton && (
          <div className="p-3 border-t">
            <Button variant="outline" size="sm" onClick={handleToday} className="w-full">
              Astăzi
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
