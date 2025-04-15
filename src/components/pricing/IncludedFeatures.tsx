
import { Card } from "@/components/ui/card";

export const IncludedFeatures = () => {
  return (
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
  );
};
