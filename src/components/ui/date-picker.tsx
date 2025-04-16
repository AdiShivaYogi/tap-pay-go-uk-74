
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | undefined;
  onSelect?: (date: Date | undefined) => void;
  defaultDate?: Date;
  showTodayButton?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DatePicker({
  className,
  mode = "single",
  selected,
  onSelect,
  defaultDate,
  showTodayButton = false,
  open,
  onOpenChange,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selected instanceof Date ? selected : undefined
  );

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onSelect) {
      onSelect(selectedDate);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setDate(today);
    if (onSelect) {
      onSelect(today);
    }
  };

  // Componente de control interne
  const DateDisplay = React.useCallback(() => {
    if (!date) {
      return <span>Selectează o dată</span>;
    }
    return <span>{format(date, "PPP")}</span>;
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <DateDisplay />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode={mode as "single"}
            selected={selected}
            onSelect={(selectedDate) => handleSelect(selectedDate)}
            defaultMonth={defaultDate || date}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            initialFocus
          />

          {showTodayButton && (
            <div className="p-2 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-center"
                onClick={handleToday}
              >
                Azi
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
