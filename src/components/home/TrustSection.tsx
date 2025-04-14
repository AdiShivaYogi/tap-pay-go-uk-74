
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

export const TrustSection = () => {
  return (
    <section className="py-20 px-4 bg-primary/5">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Shield className="h-4 w-4" /> În Dezvoltare
        </div>
        <h2 className="text-3xl font-bold mb-6">Construim Împreună</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Suntem la începutul unei călătorii. Vrem să construim ceva valoros pentru freelanceri și antreprenori mici.
          Feedback-ul tău ne ajută să creștem.
        </p>
        <Link to="/onboarding">
          <Button size="lg" className="h-12 px-8 group">
            Alătură-te Comunității 
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
