import React from 'react';
import { StyledCard } from "@/components/ui/cards";
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const ApiFeaturesList = () => {
  const apiFeatures = [
    {
      name: "Procesare plăți",
      description: "Endpoint pentru crearea și procesarea plăților contactless.",
      endpoints: ["/payment/create", "/payment/status"],
      available: true,
    },
    {
      name: "Istoric tranzacții",
      description: "Acces la istoricul tranzacțiilor procesate prin API.",
      endpoints: ["/transactions/list", "/transactions/details"],
      available: true,
    },
    {
      name: "Rapoarte și analitice",
      description: "Generare de rapoarte personalizate pentru perioada specificată.",
      endpoints: ["/reports/generate", "/analytics/summary"],
      available: true,
    },
    {
      name: "Gestionare cont",
      description: "Endpoints pentru gestionarea detaliilor contului și setărilor.",
      endpoints: ["/account/settings", "/account/update"],
      available: true,
    },
    {
      name: "Webhook-uri pentru evenimente",
      description: "Notificări în timp real pentru diverse evenimente de plată.",
      endpoints: ["/webhooks/register", "/webhooks/events"],
      available: false,
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Funcționalități API disponibile</h2>
      <div className="grid grid-cols-1 gap-4">
        {apiFeatures.map((feature, index) => (
          <StyledCard key={index} className="p-4">
            <div className="flex items-start gap-3">
              {feature.available ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 shrink-0" />
              )}
              <div>
                <h3 className="font-medium mb-1 flex items-center gap-2">
                  {feature.name}
                  {!feature.available && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      În curând
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.endpoints.map((endpoint, i) => (
                    <code key={i} className="text-xs bg-muted px-2 py-1 rounded">
                      {endpoint}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </StyledCard>
        ))}
      </div>
    </div>
  );
};
