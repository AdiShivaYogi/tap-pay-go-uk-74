
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Hammer, Lock, HandCoins, CheckCircle2, Zap } from "lucide-react";

interface ValueProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CoreValues: ValueProps[] = [
  {
    title: "Simplicity",
    description: "Generate professional payment links with minimal friction.",
    icon: HandCoins
  },
  {
    title: "Security",
    description: "Maximum protection through Stripe's infrastructure.",
    icon: Shield
  },
  {
    title: "Complete Privacy",
    description: "Your data stays strictly confidential, always.",
    icon: Lock
  },
  {
    title: "Efficiency",
    description: "Fast, precise solution for processing payments.",
    icon: Zap
  },
  {
    title: "Transparency",
    description: "No hidden fees, no data tracking, no complications.",
    icon: CheckCircle2
  },
  {
    title: "Business Focused",
    description: "Building tools that amplify your productivity.",
    icon: Hammer
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-muted-foreground">
              Simplifying financial processes for UK freelancers, creators and small businesses.
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section className="bg-primary/5 p-8 rounded-lg">
              <p className="text-lg mb-6">
                We're building for freelancers, creators, and small businesses who want to focus on their work — 
                not invoices, Stripe setup, or tax confusion.
              </p>
              <p className="text-lg mb-6">
                Our app gives you one clean interface: create a payment link, send it to your client, 
                and the money lands straight in your account. No tech headaches. No data storage worries. 
                No unnecessary complexity.
              </p>
              <p className="text-lg">
                We don't store sensitive data. We don't process payments. We don't get in your way.
                Stripe handles everything secure and compliant. We just give you the interface to move faster.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold mb-8">Our Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CoreValues.map((value, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg border hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-muted/30 p-8 rounded-lg mt-12 text-center">
              <h2 className="text-3xl font-semibold mb-6">Join Our Community</h2>
              <p className="text-lg mb-6">
                We're not trying to be a platform. We're building a tool: lightweight, trustworthy, 
                invisible when it should be. If it sounds like something for you — use it. 
                If you want to help — reach out. If you want to see what's next — check the roadmap.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/roadmap">
                  <Button variant="outline" size="lg">View Roadmap</Button>
                </Link>
                <Link to="/onboarding">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
