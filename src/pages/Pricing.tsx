
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const plans = [
    {
      name: "Pay-as-you-go",
      description: "For occasional use",
      price: "Free",
      features: [
        "No monthly fee",
        "1.5% + £0.20 per transaction",
        "Unlimited payments",
        "24/7 support"
      ],
      cta: "Start for Free",
      popular: false
    },
    {
      name: "Monthly",
      description: "For regular merchants",
      price: "£14.99",
      period: "per month",
      features: [
        "No transaction fees (Stripe fees still apply)",
        "Priority support",
        "Transaction history",
        "Analytics dashboard"
      ],
      cta: "Subscribe Now",
      popular: true
    },
    {
      name: "Lifetime",
      description: "Best value for serious businesses",
      price: "£149.99",
      period: "one-time payment",
      features: [
        "All features from Monthly plan",
        "No recurring payments",
        "Free upgrades for life",
        "Priority customer service"
      ],
      cta: "Get Lifetime Access",
      popular: false
    }
  ];

  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                {plan.popular && (
                  <div className="py-1 px-3 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2 w-fit">
                    MOST POPULAR
                  </div>
                )}
                <CardTitle>{plan.name}</CardTitle>
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
                <Link to="/onboarding" className="w-full">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
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
