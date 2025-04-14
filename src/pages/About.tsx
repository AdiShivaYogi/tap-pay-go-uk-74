
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About TapPayGo</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-lg">
                TapPayGo transforms your phone into a contactless payment terminal, allowing freelancers and small businesses to accept payments anywhere, anytime—without extra hardware.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p>
                We believe that accepting payments should be simple, secure, and accessible to everyone. Our mission is to empower freelancers and small businesses by providing them with the tools they need to get paid easily, without the complexity and costs of traditional payment systems.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Security First</h2>
              <p>
                Security is our top priority. TapPayGo is designed with a security-first approach:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  We never store your payment credentials or sensitive financial information.
                </li>
                <li>
                  All payment processing is handled directly through Stripe, a PCI-compliant payment processor.
                </li>
                <li>
                  We only store your Stripe account ID to facilitate the connection between you and Stripe.
                </li>
                <li>
                  No customer payment data is ever stored on your device or our servers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">1</div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Connect</h3>
                  <p className="text-sm">
                    Link your existing Stripe account securely through Stripe Connect.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">2</div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Enter Amount</h3>
                  <p className="text-sm">
                    Simply input the payment amount you want to charge.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">3</div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Get Paid</h3>
                  <p className="text-sm">
                    Your customer taps their card or device, and the payment goes directly to your Stripe account.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">For UK Businesses and Beyond</h2>
              <p>
                While TapPayGo is designed primarily for UK-based freelancers and businesses, our platform is built to scale internationally. As Stripe and contactless payment technologies become available in more regions, TapPayGo will expand to serve businesses worldwide.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-semibold mb-4">Ready to start accepting payments?</h2>
              <p className="mb-6">
                Join thousands of freelancers and small businesses who use TapPayGo to accept payments anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">View Pricing</Button>
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
