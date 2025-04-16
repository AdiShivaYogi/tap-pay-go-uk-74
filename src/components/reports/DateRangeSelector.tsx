import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { StyledCard } from "@/components/ui/cards";
import { Calendar, ArrowRightLeft, CalendarDays } from "lucide-react";

interface DateRangeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  defaultDate?: Date;
}

export function DateRangeSelector({ date, setDate, defaultDate }: DateRangeSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <StyledCard className="w-[300px]">
      <div className="space-y-2 p-4">
        <h4 className="font-medium tracking-tight">Selectează o dată</h4>
        <p className="text-sm text-muted-foreground">
          Alege data pentru care vrei să generezi raportul.
        </p>
      </div>
      <DatePicker
        mode="single"
        open={open}
        onOpenChange={setOpen}
        selected={date}
        defaultDate={defaultDate}
        onSelect={setDate}
        showTodayButton
        className="border-t"
      />
    </StyledCard>
  );
}
