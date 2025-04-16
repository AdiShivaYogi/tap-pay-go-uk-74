
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface DatePickerProps {
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[];
  onSelect?: (selectedDate: Date | undefined | Date[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultDate?: Date;
  showTodayButton?: boolean;
  disabled?: (date: Date) => boolean;
}

export function DatePicker({
  date,
  setDate,
  className,
  mode = "single",
  selected,
  onSelect,
  open,
  onOpenChange,
  defaultDate = new Date(),
  showTodayButton = false,
  disabled = () => false,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

  React.useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
    if (setDate) {
      setDate(selectedDate);
    }
    if (onSelect) {
      onSelect(selectedDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : "Alege o dată"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected as Date}
            onSelect={onSelect as (date: Date | undefined) => void}
            defaultMonth={defaultDate}
            disabled={disabled}
            initialFocus={true}
          />
          {showTodayButton && (
            <div className="p-3 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleSelect(new Date())}
              >
                Astăzi
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
