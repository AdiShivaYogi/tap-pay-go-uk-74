
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
      "Comision: 1.0% + £0.20 per tranzacție",
      "Comision Stripe aplicabil separat",
      "Plăți nelimitate",
      "Suport 24/7"
    ],
    cta: "Începe Gratuit",
    popular: false,
    icon: CreditCard
  },
  {
    name: "Monthly",
    id: "monthly",
    description: "Pentru comercianți regulați",
    price: "£14.99",
    period: "pe lună",
    features: [
      "Comision: 0.7% + £0.15 per tranzacție", 
      "Comision Stripe aplicabil separat",
      "Suport prioritar",
      "Istoric tranzacții",
      "Panou de analiză"
    ],
    cta: "Abonare Acum",
    popular: true,
    icon: Wallet
  },
  {
    name: "Lifetime",
    id: "lifetime",
    description: "Cea mai bună valoare pentru afaceri serioase",
    price: "£1840",
    period: "plată unică",
    features: [
      "Toate funcțiile din planul Monthly",
      "Fără plăți recurente",
      "Actualizări gratuite pe viață",
      "Serviciu clienți prioritar",
      "Comision: 0.5% + £0.10 per tranzacție",
      "Comision Stripe aplicabil separat"
    ],
    cta: "Obține Acces pe Viață",
    popular: false,
    icon: BadgeDollarSign
  }
];

export const pricingFAQs: FAQItem[] = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, including Visa, Mastercard and American Express. Payments are securely processed through Stripe."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Billing adjustments will be made proportionally."
  },
  {
    question: "Is there a trial period?",
    answer: "Yes, we offer a 14-day trial period for the Monthly plan with no obligations. You can cancel anytime during this period."
  },
  {
    question: "What happens after I subscribe?",
    answer: "You'll get immediate access to all features included in your chosen plan. You'll also receive a confirmation email with your account details."
  }
];
