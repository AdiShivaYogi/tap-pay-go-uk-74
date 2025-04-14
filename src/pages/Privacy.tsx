
import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: April 14, 2025
            </p>
            
            <ScrollArea className="h-[500px] rounded-md border p-6">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p>
                    At TapPayGo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and website (collectively, the "Service").
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. By using our Service, you consent to the collection and use of information in accordance with this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                  <p>
                    We collect minimal information to provide our Service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Stripe Account ID:</strong> When you connect your Stripe account, we store only your Stripe account ID to facilitate the connection between our Service and Stripe.
                    </li>
                    <li>
                      <strong>Device Information:</strong> We collect information about your device, including device model, operating system version, and unique device identifiers.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> We may collect information about how you use our Service, such as the features you access and the time spent on the Service.
                    </li>
                  </ul>
                  <p className="mt-4">
                    <strong>Information We Do NOT Collect:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      We do NOT collect, store, or process any payment card data.
                    </li>
                    <li>
                      We do NOT have access to your Stripe API keys or credentials.
                    </li>
                    <li>
                      We do NOT store customer payment information.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                  <p>
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Provide, maintain, and improve our Service.
                    </li>
                    <li>
                      Process transactions via the Stripe API.
                    </li>
                    <li>
                      Communicate with you about the Service, including updates and support.
                    </li>
                    <li>
                      Monitor usage patterns and analyze trends to improve user experience.
                    </li>
                    <li>
                      Protect against fraudulent or unauthorized transactions.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Stripe Integration and Data Processing</h2>
                  <p>
                    Our Service integrates with Stripe for payment processing. When you use our Service:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      All payment processing occurs directly through Stripe.
                    </li>
                    <li>
                      Payment data is sent directly from your device to Stripe, not through our servers.
                    </li>
                    <li>
                      We never see, store, or have access to payment card details.
                    </li>
                    <li>
                      Stripe's privacy policy governs their collection and use of data. You can view Stripe's privacy policy at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://stripe.com/privacy</a>.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
                  <p>
                    We retain your information only as long as necessary to provide our Service. If you delete your account, we will delete or anonymize your information, except where we are required to maintain certain information for legal or legitimate business purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Security</h2>
                  <p>
                    We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      The right to access your personal information.
                    </li>
                    <li>
                      The right to rectify inaccurate information.
                    </li>
                    <li>
                      The right to erasure or deletion of your information.
                    </li>
                    <li>
                      The right to restrict or object to processing.
                    </li>
                    <li>
                      The right to data portability.
                    </li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes will be effective immediately upon posting. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@tappaygo.com.
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

export default PrivacyPage;
