
import { BadgeDollarSign, CreditCard, Wallet } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface PricingPlan {
  name: string;
  id: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular: boolean;
  icon: LucideIcon;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Pay-as-you-go",
    id: "pay-as-you-go",
    description: "Pentru utilizare ocazională",
    price: "Gratuit",
    features: [
      "Fără taxă lunară",
      "1.5% + 0.20 lei per tranzacție",
      "Plăți nelimitate",
      "Suport 24/7"
    ],
    cta: "Începe Gratuit",
    popular: false,
    icon: CreditCard
  },
  {
    name: "Lunar",
    id: "monthly",
    description: "Pentru comercianți regulați",
    price: "14.99 lei",
    period: "per lună",
    features: [
      "Fără comisioane (se aplică doar taxele Stripe)",
      "Suport prioritar",
      "Istoric tranzacții",
      "Panou de analiză"
    ],
    cta: "Abonează-te Acum",
    popular: true,
    icon: Wallet
  },
  {
    name: "Lifetime",
    id: "lifetime",
    description: "Cea mai bună valoare pentru afaceri serioase",
    price: "149.99 lei",
    period: "plată unică",
    features: [
      "Toate funcționalitățile din planul Lunar",
      "Fără plăți recurente",
      "Actualizări gratuite pe viață",
      "Serviciu clienți prioritar"
    ],
    cta: "Obține Acces Lifetime",
    popular: false,
    icon: BadgeDollarSign
  }
];

export const pricingFAQs: FAQItem[] = [
  {
    question: "Ce metode de plată acceptați?",
    answer: "Acceptăm toate cardurile majore de credit și debit, inclusiv Visa, Mastercard și American Express. Plățile sunt procesate în siguranță prin Stripe."
  },
  {
    question: "Pot să schimb planul mai târziu?",
    answer: "Da, puteți upgrada sau downgrade planul în orice moment. Ajustările de facturare vor fi făcute proporțional."
  },
  {
    question: "Există o perioadă de probă?",
    answer: "Da, oferim o perioadă de probă de 14 zile pentru planul Lunar, fără obligații. Puteți anula oricând în această perioadă."
  },
  {
    question: "Ce se întâmplă după ce mă abonez?",
    answer: "Veți primi acces imediat la toate funcționalitățile incluse în planul ales. Veți primi și un email de confirmare cu detaliile contului."
  }
];
