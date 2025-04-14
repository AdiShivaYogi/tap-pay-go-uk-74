
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, ClockIcon, Circle } from "lucide-react";

export const RoadmapLegend = () => {
  return (
    <Alert className="mb-4">
      <AlertTitle>Legendă Status</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-green-500" />
          <span>Completat</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="text-blue-500" />
          <span>În Lucru</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="text-gray-400" />
          <span>În Așteptare</span>
        </div>
      </AlertDescription>
    </Alert>
  );
};
