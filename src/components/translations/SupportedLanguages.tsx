
import { Card } from "@/components/ui/card";

const languages = [
  { code: "EN", name: "Engleză" },
  { code: "FR", name: "Franceză" },
  { code: "DE", name: "Germană" },
  { code: "ES", name: "Spaniolă" },
  { code: "IT", name: "Italiană" },
  { code: "PT", name: "Portugheză" },
  { code: "NL", name: "Olandeză" },
  { code: "PL", name: "Poloneză" },
  { code: "RU", name: "Rusă" }
];

export function SupportedLanguages() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Limbi suportate</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <div 
            key={lang.code}
            className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
          >
            <span className="text-sm font-medium">{lang.code}</span>
            <span className="text-sm text-muted-foreground">
              {lang.name}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
