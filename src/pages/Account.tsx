
import React from 'react';
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, ShieldCheck } from "lucide-react";

const Account = () => {
  return (
    <Layout>
      <div className="container max-w-7xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Account</h1>
          <p className="text-muted-foreground text-lg">
            Manage your TapPayGo settings and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Glasgow, Scotland, UK</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stripe Connection</p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Active</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Update Personal Information
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Two-Factor Authentication
                  </p>
                  <Button variant="destructive" className="w-full">
                    Enable 2FA
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Reset Password
                  </p>
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            ❤️ Crafted with care in Glasgow, supporting UK freelancers and creators
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Account;

