import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Check, 
  CreditCard, 
  Wallet, 
  BadgeDollarSign,
  HelpCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingPage = () => {
  const navigate = useNavigate();
  
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

  const handleSelectPlan = (planId: string) => {
    navigate(`/onboarding?plan=${planId}`);
  };

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
            <Card 
              key={plan.name} 
              className={`flex flex-col transform transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'border-primary shadow-lg relative overflow-hidden' : ''
              }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
                    Popular
                  </div>
                  <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-20 blur-lg -z-10" />
                </>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <plan.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground"> {plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Întrebări Frecvente</h2>
            <p className="text-muted-foreground">
              Aici găsiți răspunsuri la cele mai comune întrebări
            </p>
          </div>
          
          <Card className="bg-card/50">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        {faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-muted/50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">All Plans Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">End-to-end encryption for all transactions</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="font-medium mb-1">Fast Payouts</h3>
              <p className="text-sm text-muted-foreground">Get paid directly to your bank account</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
