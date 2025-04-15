
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

interface PriorityTaskFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const PriorityTaskFilter = ({ activeCategory, onCategoryChange }: PriorityTaskFilterProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
      <LayoutGrid className="h-4 w-4" />
      Filtrare după Categorie
    </h3>
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={activeCategory === "all" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("all")}
      >
        Toate
      </Button>
      <Button 
        variant={activeCategory === "product" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("product")}
        className="bg-primary/10 hover:bg-primary/20 data-[state=active]:bg-primary/20"
      >
        Product
      </Button>
      <Button 
        variant={activeCategory === "development" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("development")}
        className="bg-blue-500/10 hover:bg-blue-500/20 data-[state=active]:bg-blue-500/20"
      >
        Development
      </Button>
      <Button 
        variant={activeCategory === "infrastructure" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("infrastructure")}
        className="bg-purple-500/10 hover:bg-purple-500/20 data-[state=active]:bg-purple-500/20"
      >
        Infrastructure
      </Button>
      <Button 
        variant={activeCategory === "security" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("security")}
        className="bg-green-600/10 hover:bg-green-600/20 data-[state=active]:bg-green-600/20"
      >
        Security
      </Button>
      <Button 
        variant={activeCategory === "devops" ? "default" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("devops")}
        className="bg-amber-600/10 hover:bg-amber-600/20 data-[state=active]:bg-amber-600/20"
      >
        DevOps
      </Button>
    </div>
  </div>
);
