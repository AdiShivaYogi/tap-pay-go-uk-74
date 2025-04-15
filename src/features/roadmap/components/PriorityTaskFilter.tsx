
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowUpCircle, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PriorityTaskFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
  totalHighPriority: number;
}

export const PriorityTaskFilter = ({ 
  activeCategory, 
  onCategoryChange,
  categoryCounts,
  totalHighPriority
}: PriorityTaskFilterProps) => (
  <Card className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50/50 to-amber-100/30">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-bold flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <span>Prioritizare și Filtrare Task-uri</span>
        <Badge variant="outline" className="ml-2 bg-amber-500/10 text-amber-700 font-semibold">
          x{totalHighPriority} Prioritate Înaltă
        </Badge>
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-amber-700">
        <Filter className="h-4 w-4 text-amber-500" />
        <span>Filtrează task-urile după categorie pentru vizualizare mai bună</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === "all" ? "default" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange("all")}
          className={activeCategory === "all" ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          Toate ({Object.values(categoryCounts).reduce((a, b) => a + b, 0)})
        </Button>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <Button 
            key={category}
            variant={activeCategory === category ? "default" : "outline"} 
            size="sm" 
            onClick={() => onCategoryChange(category)}
            className={`
              ${activeCategory === category 
                ? getCategoryColor(category).active 
                : getCategoryColor(category).inactive}
            `}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

const getCategoryColor = (category: string) => {
  const colors = {
    product: {
      active: "bg-blue-500 hover:bg-blue-600",
      inactive: "border-blue-200 text-blue-700"
    },
    development: {
      active: "bg-indigo-500 hover:bg-indigo-600",
      inactive: "border-indigo-200 text-indigo-700"
    },
    infrastructure: {
      active: "bg-purple-500 hover:bg-purple-600",
      inactive: "border-purple-200 text-purple-700"
    },
    security: {
      active: "bg-green-500 hover:bg-green-600",
      inactive: "border-green-200 text-green-700"
    },
    devops: {
      active: "bg-orange-500 hover:bg-orange-600",
      inactive: "border-orange-200 text-orange-700"
    }
  };
  return colors[category as keyof typeof colors] || {
    active: "bg-gray-500 hover:bg-gray-600",
    inactive: "border-gray-200 text-gray-700"
  };
};
