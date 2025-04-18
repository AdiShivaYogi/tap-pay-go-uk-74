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
  breakEvenInfo?: string;
  isApiPlan?: boolean;
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
    icon: CreditCard,
    breakEvenInfo: "Ideal pentru <300 tranzacții lunare"
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
    icon: Wallet,
    breakEvenInfo: "Ideal pentru 300-1000 tranzacții lunale"
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
    icon: BadgeDollarSign,
    breakEvenInfo: "Se amortizează în ~10 luni la volume mari"
  }
];

export const pricingFAQs: FAQItem[] = [
  {
    question: "Cum știu ce plan mi se potrivește?",
    answer: "Utilizați calculatorul de economii de pe această pagină pentru a vedea care plan este cel mai eficient pentru volumul dvs. de tranzacții. În general, planul Pay-as-you-go este ideal pentru mai puțin de 300 tranzacții lunare, planul Monthly pentru 300-1000 tranzacții, iar planul Lifetime pentru volume mari sau utilizare pe termen lung."
  },
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

export const shouldRecommendPlanUpgrade = (
  currentPlan: string, 
  monthlyTransactions: number, 
  averageTransactionAmount: number = 50
): { 
  shouldUpgrade: boolean, 
  recommendedPlan: string, 
  monthlySavings: number 
} => {
  const payAsYouGoCost = 0.01 * averageTransactionAmount * monthlyTransactions + 0.2 * monthlyTransactions;
  const monthlyCost = 0.007 * averageTransactionAmount * monthlyTransactions + 0.15 * monthlyTransactions + 14.99;
  const lifetimeMonthlyCost = 0.005 * averageTransactionAmount * monthlyTransactions + 0.1 * monthlyTransactions;

  if (currentPlan === 'pay-as-you-go' && payAsYouGoCost > monthlyCost) {
    return {
      shouldUpgrade: true,
      recommendedPlan: 'Monthly',
      monthlySavings: +(payAsYouGoCost - monthlyCost).toFixed(2)
    };
  } else if (currentPlan === 'monthly' && monthlyTransactions > 500 && averageTransactionAmount > 30) {
    const lifetimeBreakEvenMonths = 1840 / (monthlyCost - lifetimeMonthlyCost);
    
    if (lifetimeBreakEvenMonths < 18) {
      return {
        shouldUpgrade: true,
        recommendedPlan: 'Lifetime',
        monthlySavings: +(monthlyCost - lifetimeMonthlyCost).toFixed(2)
      };
    }
  }

  return { shouldUpgrade: false, recommendedPlan: currentPlan, monthlySavings: 0 };
};
