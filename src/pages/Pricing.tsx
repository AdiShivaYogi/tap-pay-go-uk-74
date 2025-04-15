
import { Layout } from "@/components/layout/layout";
import { CreditCard, Wallet, BadgeDollarSign } from "lucide-react";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { IncludedFeatures } from "@/components/pricing/IncludedFeatures";

const PricingPage = () => {
  const plans = [
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

  const faqs = [
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

  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Prețuri Simple și Transparente
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alegeți planul care se potrivește nevoilor afacerii dvs. Fără taxe ascunse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <PricingFAQ faqs={faqs} />
        <IncludedFeatures />
      </div>
    </Layout>
  );
};

export default PricingPage;
