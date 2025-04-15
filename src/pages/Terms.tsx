
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
              Last updated: April 15, 2025
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
                  <h2 className="text-xl font-semibold mb-3">4. Subscription and Payment Terms</h2>
                  <p>
                    We offer three payment plans with different fee structures:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Pay-as-you-go:</strong> No monthly fee. Commission rate of 1.0% + £0.20 per transaction.
                    </li>
                    <li>
                      <strong>Monthly Plan (£14.99/month):</strong> Commission rate of 0.7% + £0.15 per transaction, includes advanced features and priority support.
                    </li>
                    <li>
                      <strong>Lifetime Plan (£1,840 one-time payment):</strong> Reduced commission rate of 0.5% + £0.10 per transaction, includes all features, priority support, and lifetime updates.
                    </li>
                  </ul>
                  <p className="mt-4">
                    All transaction fees are calculated and charged at the time of each transaction. Transaction fees include both our commission and standard payment processing fees. Additional fees may apply for currency conversion or international transactions.
                  </p>
                  <p className="mt-4">
                    For Lifetime plans: This is a one-time payment that grants perpetual access to the current and future features of the platform, subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      The reduced transaction fee structure (0.5% + £0.10) is guaranteed for the lifetime of your account.
                    </li>
                    <li>
                      Access to new features and updates is included at no additional cost.
                    </li>
                    <li>
                      While we aim to provide service indefinitely, in extreme circumstances such as company bankruptcy or service termination, we cannot guarantee perpetual access. No refunds will be provided for Lifetime plans.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Device Compatibility</h2>
                  <p>
                    TapPayGo requires compatible hardware to function properly. Not all devices support contactless payment functionality. We do not guarantee compatibility with all devices or in all countries.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Payment Processing and Refunds</h2>
                  <p>
                    All payment processing is handled securely through our payment processor, Stripe. By using our service, you agree to the following:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      All transaction fees are non-refundable unless required by law.
                    </li>
                    <li>
                      Monthly plan subscriptions can be cancelled at any time, effective at the end of the current billing period.
                    </li>
                    <li>
                      Lifetime plan purchases are final and non-refundable.
                    </li>
                    <li>
                      Any disputes regarding transactions must be submitted within 30 days of the transaction date.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
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
                  <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
                  <p>
                    We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Changes will be effective immediately upon posting. Your continued use of the Service after any changes indicates your acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
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
