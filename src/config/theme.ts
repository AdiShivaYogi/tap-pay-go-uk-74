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
  
  // Spațiere
  spacing: {
    section: "py-12 px-4 md:py-16 md:px-6",
    container: "container mx-auto px-4",
    pageHeader: "mb-8 md:mb-12",
  },
  
  // Tipografie actualizată pentru a reflecta stilul din Dashboard
  typography: {
    // Titluri
    h1: "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
    h2: "text-2xl font-semibold tracking-tight md:text-3xl",
    h3: "text-xl font-semibold tracking-tight md:text-2xl",
    h4: "text-lg font-medium md:text-xl",
    
    // Text
    lead: "text-lg md:text-xl text-muted-foreground",
    paragraph: "text-base leading-7",
    muted: "text-sm text-muted-foreground",
    small: "text-sm font-medium leading-none",
    subtle: "text-sm text-muted-foreground",
    
    // Card specific
    cardTitle: "text-xl font-semibold leading-none tracking-tight",
    cardDescription: "text-sm text-muted-foreground",
    
    // Stats & Numbers
    stats: "text-2xl font-semibold md:text-3xl",
    statsLabel: "text-sm font-medium text-muted-foreground",
  },
  
  // Efecte și decorațiuni
  effects: {
    gradient: {
      primary: "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
      subtle: "bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent",
      accent: "bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent",
    },
    card: {
      hover: "transition-shadow hover:shadow-md duration-300",
      animation: "animate-fade-in",
    },
  },
  
  // Layouturi comune
  layouts: {
    grid2Cols: "grid grid-cols-1 md:grid-cols-2 gap-6",
    grid3Cols: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    grid4Cols: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
  },
  
  // Stiluri de componente
  components: {
    card: {
      base: "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
      interactive: "rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all hover:shadow-md cursor-pointer",
      highlight: "rounded-lg border-2 border-primary/10 bg-card text-card-foreground shadow-sm p-6",
    },
    button: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    },
    section: {
      default: "py-12 px-4",
      alt: "py-12 px-4 bg-muted/50",
    }
  }
}
