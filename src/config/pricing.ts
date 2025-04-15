
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
    description: "For occasional use",
    price: "Free",
    features: [
      "No monthly fee",
      "1.5% + £0.20 per transaction",
      "Unlimited payments",
      "24/7 Support"
    ],
    cta: "Start Free",
    popular: false,
    icon: CreditCard
  },
  {
    name: "Monthly",
    id: "monthly",
    description: "For regular merchants",
    price: "£14.99",
    period: "per month",
    features: [
      "No commissions (only Stripe fees apply)",
      "Priority support",
      "Transaction history",
      "Analytics dashboard"
    ],
    cta: "Subscribe Now",
    popular: true,
    icon: Wallet
  },
  {
    name: "Lifetime",
    id: "lifetime",
    description: "Best value for serious businesses",
    price: "£149.99",
    period: "one-time payment",
    features: [
      "All features from Monthly plan",
      "No recurring payments",
      "Free lifetime updates",
      "Priority customer service"
    ],
    cta: "Get Lifetime Access",
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
