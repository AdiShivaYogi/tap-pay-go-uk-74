
import { AlertTriangle, Clock } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

export const MorningHeader = () => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span className="text-amber-900">Imediat Necesar</span>
        </CardTitle>
        <Clock className="h-5 w-5 text-amber-500" />
      </div>
      <div className="text-sm text-amber-700 mt-2">
        {new Date().toLocaleDateString('ro-RO', {weekday: 'long'})} - Focus pe sarcinile cu impact prioritar
      </div>
    </CardHeader>
  );
};
