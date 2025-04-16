
import { LucideIcon, CreditCard, Headphones, BarChart3, Shield, Brain } from "lucide-react";

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: "online" | "offline" | "busy";
}

export const DEMO_RESPONSES: Record<string, string[]> = {
  "payment-agent": [
    "Pentru conectarea cu Stripe, primul pas este crearea unui cont pe platforma lor. Dorești să te ghidez prin acest proces?",
    "Comisioanele standard Stripe sunt de 1.4% + 0.25€ pentru carduri europene și 2.9% + 0.25€ pentru carduri non-europene.",
    "Putem implementa plăți recurente pentru abonamentele tale, acest lucru necesită să configurezi un produs și un preț în panoul Stripe.",
    "TapPayGo se integrează complet cu API-urile Stripe, inclusiv cu Events și Webhooks pentru notificări în timp real."
  ],
  "support-agent": [
    "Bună! Cu ce te pot ajuta astăzi referitor la contul tău TapPayGo?",
    "Pentru a reseta parola, te rog să accesezi pagina de autentificare și să folosești opțiunea 'Am uitat parola'.",
    "Integrarea cu sistemul tău de contabilitate se poate face prin API-ul nostru. Ai nevoie de cheile API disponibile în setările contului.",
    "Platforma noastră este conformă cu standardele PCI DSS nivel 1, ceea ce înseamnă cel mai înalt nivel de securitate pentru datele cardurilor."
  ],
  "analytics-agent": [
    "Pe baza analizei tranzacțiilor tale, observ un vârf de activitate în zilele de luni și vineri, între 10:00 și 14:00.",
    "Rata de conversie pentru pagina ta de plată este de 78%, cu 5% peste media industriei.",
    "Recomand să analizezi segmentul de clienți care folosesc dispozitive mobile - reprezintă 65% din tranzacții dar au o rată de abandon cu 8% mai mare.",
    "Pot genera un raport detaliat despre comportamentul clienților după prima tranzacție. Acest lucru te poate ajuta să optimizezi strategiile de fidelizare."
  ],
  "security-agent": [
    "Toate datele sensibile sunt criptate folosind AES-256 atât în tranzit, cât și în repaus.",
    "Recomandăm să activezi autentificarea în doi factori pentru toți utilizatorii cu acces la panoul de administrare.",
    "În ultimele 30 de zile, sistemele noastre au blocat 47 de tentative de tranzacții frauduloase pentru contul tău.",
    "Implementăm monitorizare continuă și analiză comportamentală pentru a detecta activități neobișnuite în contul tău."
  ],
  "ai-assistant": [
    "Pot să te ajut cu orice întrebare despre platforma TapPayGo. Cu ce te pot asista?",
    "API-ul nostru este documentat complet la adresa docs.tappaygo.com/api și include exemple pentru cele mai populare limbaje de programare.",
    "Procesul de onboarding pentru comercianți noi durează în general 1-3 zile lucrătoare, incluzând verificările de conformitate.",
    "Platforma noastră suportă peste 135 de monede și operează în 42 de țări din Uniunea Europeană și din afara ei."
  ]
};

export const agents: Agent[] = [
  {
    id: "payment-agent",
    name: "Expert Plăți",
    description: "Specialist în procesarea plăților și integrare Stripe",
    icon: CreditCard,
    color: "text-green-500",
    status: "online" as const
  },
  {
    id: "support-agent",
    name: "Asistență Clienți",
    description: "Agenți pentru suport tehnic și întrebări frecvente",
    icon: Headphones,
    color: "text-blue-500",
    status: "online" as const
  },
  {
    id: "analytics-agent",
    name: "Expert Analiză Date",
    description: "Analist pentru interpretarea datelor și rapoartelor",
    icon: BarChart3,
    color: "text-purple-500",
    status: "online" as const
  },
  {
    id: "security-agent",
    name: "Consultant Securitate",
    description: "Specialist în securitate cibernetică și protecția datelor",
    icon: Shield,
    color: "text-red-500",
    status: "online" as const
  },
  {
    id: "ai-assistant",
    name: "Asistent AI General",
    description: "Asistent general pentru diverse întrebări despre platformă",
    icon: Brain,
    color: "text-amber-500",
    status: "online" as const
  }
];
