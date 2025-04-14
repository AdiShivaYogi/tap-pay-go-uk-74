
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DateRangeSelectorProps {
  period: "week" | "month" | "all";
  onPeriodChange: (value: "week" | "month" | "all") => void;
}

export const DateRangeSelector = ({
  period,
  onPeriodChange
}: DateRangeSelectorProps) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue="week" value={period} onValueChange={(v) => onPeriodChange(v as "week" | "month" | "all")}>
        <TabsList className="mb-4">
          <TabsTrigger value="week">Ultima săptămână</TabsTrigger>
          <TabsTrigger value="month">Luna curentă</TabsTrigger>
          <TabsTrigger value="all">Toate tranzacțiile</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
