
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, CalendarDays } from "lucide-react";

interface DateRangeSelectorProps {
  period: "week" | "month" | "all";
  onPeriodChange: (value: "week" | "month" | "all") => void;
}

export const DateRangeSelector = ({
  period,
  onPeriodChange
}: DateRangeSelectorProps) => {
  const options = [
    { value: "week", label: "Ultima săptămână", icon: Clock },
    { value: "month", label: "Luna curentă", icon: Calendar },
    { value: "all", label: "Toate tranzacțiile", icon: CalendarDays }
  ];

  return (
    <Card>
      <CardContent className="py-3">
        <Tabs 
          defaultValue="week" 
          value={period} 
          onValueChange={(v) => onPeriodChange(v as "week" | "month" | "all")}
          className="w-full"
        >
          <TabsList className="w-full justify-start gap-2">
            {options.map(({ value, label, icon: Icon }) => (
              <TabsTrigger 
                key={value} 
                value={value}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};
