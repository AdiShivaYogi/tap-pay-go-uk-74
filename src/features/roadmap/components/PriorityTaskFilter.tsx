
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, AlertTriangle, ArrowUpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PriorityTaskFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const PriorityTaskFilter = ({ 
  activeCategory, 
  onCategoryChange,
  categoryCounts 
}: PriorityTaskFilterProps) => (
  <Card className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50/50 to-amber-100/30">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-medium flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <span>Prioritizare și Filtrare Task-uri</span>
        <Badge variant="outline" className="ml-2 bg-amber-500/10 text-amber-700">
          x3 Prioritate
        </Badge>
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <ArrowUpCircle className="h-4 w-4 text-amber-500" />
        <span>Selectați categoria pentru a vedea task-urile prioritare</span>
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
        <Button 
          variant={activeCategory === "product" ? "default" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange("product")}
          className={`${activeCategory === "product" ? "bg-blue-500 hover:bg-blue-600" : "border-blue-200 text-blue-700"}`}
        >
          Product ({categoryCounts.product || 0})
        </Button>
        <Button 
          variant={activeCategory === "development" ? "default" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange("development")}
          className={`${activeCategory === "development" ? "bg-indigo-500 hover:bg-indigo-600" : "border-indigo-200 text-indigo-700"}`}
        >
          Development ({categoryCounts.development || 0})
        </Button>
        <Button 
          variant={activeCategory === "infrastructure" ? "default" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange("infrastructure")}
          className={`${activeCategory === "infrastructure" ? "bg-purple-500 hover:bg-purple-600" : "border-purple-200 text-purple-700"}`}
        >
          Infrastructure ({categoryCounts.infrastructure || 0})
        </Button>
        <Button 
          variant={activeCategory === "security" ? "default" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange("security")}
          className={`${activeCategory === "security" ? "bg-green-500 hover:bg-green-600" : "border-green-200 text-green-700"}`}
        >
          Security ({categoryCounts.security || 0})
        </Button>
        <Button 
          variant={activeCategory === "devops" ? "default" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange("devops")}
          className={`${activeCategory === "devops" ? "bg-orange-500 hover:bg-orange-600" : "border-orange-200 text-orange-700"}`}
        >
          DevOps ({categoryCounts.devops || 0})
        </Button>
      </div>
    </CardContent>
  </Card>
);
