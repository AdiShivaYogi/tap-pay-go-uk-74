
import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: April 14, 2025
            </p>
            
            <ScrollArea className="h-[500px] rounded-md border p-6">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p>
                    Welcome to TapPayGo ("we," "our," or "us"). These Terms and Conditions govern your use of the TapPayGo application and website (collectively, the "Service").
                  </p>
                  <p>
                    By using our Service, you agree to these Terms. Please read them carefully. If you do not agree to these Terms, you must not use our Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Stripe Integration</h2>
                  <p>
                    TapPayGo integrates with Stripe for payment processing. By using our Service, you understand and agree to the following:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      All payment processing is handled directly through Stripe.
                    </li>
                    <li>
                      TapPayGo does not store, process, or have access to your payment credentials, financial data, or sensitive authentication details.
                    </li>
                    <li>
                      You are responsible for complying with Stripe's terms of service and all applicable laws and regulations.
                    </li>
                    <li>
                      TapPayGo only stores your Stripe account ID to facilitate the connection between you and Stripe.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
                  <p>
                    As a user of TapPayGo, you are responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Maintaining the security of your Stripe account.
                    </li>
                    <li>
                      Ensuring that you have the right to accept payments for your goods or services.
                    </li>
                    <li>
                      Complying with all applicable laws and regulations regarding the acceptance of payment cards.
                    </li>
                    <li>
                      Providing proper receipts and transaction documentation to your customers as required by law.
                    </li>
                    <li>
                      Addressing any disputes or chargebacks directly through your Stripe account.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Subscription and Payment Terms</h2>
                  <p>
                    We offer three payment plans: Pay-as-you-go, Monthly, and Lifetime.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Pay-as-you-go:</strong> No monthly fee, but a fee per transaction.
                    </li>
                    <li>
                      <strong>Monthly:</strong> Recurring monthly fee, no additional transaction fees (Stripe fees still apply).
                    </li>
                    <li>
                      <strong>Lifetime:</strong> One-time payment for perpetual use of current features.
                    </li>
                  </ul>
                  <p>
                    For Lifetime plans: while we aim to provide service indefinitely, in extreme circumstances such as company bankruptcy or service termination, we cannot guarantee perpetual access. No refunds will be provided for Lifetime plans.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Device Compatibility</h2>
                  <p>
                    TapPayGo requires compatible hardware to function properly. Not all devices support contactless payment functionality. We do not guarantee compatibility with all devices or in all countries.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, TapPayGo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Your use or inability to use the Service.
                    </li>
                    <li>
                      Any unauthorized access to or use of our servers and/or any personal information stored therein.
                    </li>
                    <li>
                      Any interruption or cessation of transmission to or from the Service.
                    </li>
                    <li>
                      Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
                  <p>
                    We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Changes will be effective immediately upon posting. Your continued use of the Service after any changes indicates your acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
                  <p>
                    If you have any questions about these Terms, please contact us at support@tappaygo.com.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
