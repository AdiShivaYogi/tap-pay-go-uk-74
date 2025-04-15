
/**
 * Configurația de temă centralizată a aplicației
 * Acest fișier funcționează ca un "design system" simplu
 */

export const theme = {
  // Culori principale
  colors: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    accent: "hsl(var(--accent))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    border: "hsl(var(--border))",
  },
  
  // Spațiere ajustată pentru consistență cu Dashboard
  spacing: {
    section: "py-8 md:py-12 px-4 md:px-6",
    container: "container mx-auto px-4 md:px-6",
    pageHeader: "mb-6 md:mb-8",
  },
  
  // Tipografie actualizată în stilul Dashboard
  typography: {
    // Titluri
    h1: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
    h2: "text-xl md:text-2xl font-semibold tracking-tight",
    h3: "text-lg md:text-xl font-semibold tracking-tight",
    h4: "text-base md:text-lg font-medium",
    
    // Text
    lead: "text-base md:text-lg text-muted-foreground",
    paragraph: "text-sm md:text-base leading-relaxed",
    muted: "text-sm text-muted-foreground",
    small: "text-xs md:text-sm font-medium leading-none",
    subtle: "text-xs md:text-sm text-muted-foreground",
    
    // Card specific
    cardTitle: "text-lg font-semibold leading-none tracking-tight",
    cardDescription: "text-sm text-muted-foreground",
    
    // Stats & Numbers
    stats: "text-xl md:text-2xl font-semibold",
    statsLabel: "text-sm font-medium text-muted-foreground",
  },
  
  // Efecte și decorațiuni adaptate pentru Dashboard
  effects: {
    gradient: {
      primary: "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
      subtle: "bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent",
      accent: "bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent",
    },
    card: {
      hover: "transition-all hover:shadow-md duration-200",
      animation: "animate-fade-in",
    },
  },
  
  // Layouturi comune actualizate pentru mai multă consistență
  layouts: {
    grid2Cols: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
    grid3Cols: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
    grid4Cols: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  },
  
  // Stiluri de componente actualizate pentru Dashboard
  components: {
    card: {
      base: "rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6",
      interactive: "rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 transition-all hover:shadow-md cursor-pointer",
      highlight: "rounded-lg border-2 border-primary/10 bg-card text-card-foreground shadow-sm p-4 md:p-6",
    },
    button: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
    },
    section: {
      default: "py-8 md:py-12 px-4 md:px-6",
      alt: "py-8 md:py-12 px-4 md:px-6 bg-muted/50",
    }
  }
}
