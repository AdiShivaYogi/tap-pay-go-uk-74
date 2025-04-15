
import React from 'react';
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Receipt, 
  History, 
  Bell,
  Store,
  Wallet,
  Settings2 
} from "lucide-react";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Details Card */}
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
                  <p className="text-sm text-muted-foreground">Business Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Glasgow, Scotland, UK</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    <span>Retail</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Update Business Information
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-primary" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Stripe Connection</p>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Active</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Default Currency</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>GBP (£)</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-6 w-6 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Two-Factor Authentication
                  </p>
                  <Button variant="destructive" className="w-full mt-2">
                    Enable 2FA
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Password
                  </p>
                  <Button variant="outline" className="w-full mt-2">
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-6 w-6 text-primary" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Receipt className="h-4 w-4" />
                    <span>238 Transactions</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Full History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email Alerts</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span>Transaction & Security Alerts</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Notifications
                </Button>
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
