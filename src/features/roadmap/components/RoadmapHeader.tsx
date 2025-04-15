
import { Compass, ChevronRight, Star } from "lucide-react";

export const RoadmapHeader = () => (
  <>
    <div className="flex items-center gap-2 text-muted-foreground mb-2">
      <Compass className="h-4 w-4" />
      <span>Roadmap</span>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">Dezvoltare</span>
    </div>
    
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-3 flex items-center gap-4">
        Roadmap Aplicație 
        <Star className="text-primary/70 animate-pulse" />
      </h1>
      <p className="text-muted-foreground text-lg">
        Vizualizează progresul și angajamentul nostru pentru securitate, transparență și experiența utilizator
      </p>
    </div>
  </>
);
