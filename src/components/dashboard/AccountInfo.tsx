
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";
import { Settings, SmartphoneNfc, CreditCard, ChevronRight, UserCircle2, BellRing, LogOut } from "lucide-react";

interface AccountInfoProps {
  deviceCompatibility: DeviceCompatibility;
}

export const AccountInfo = ({ deviceCompatibility }: AccountInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informații cont</CardTitle>
        <CardDescription>
          Gestionează setările contului tău și preferințele de plată
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Cont Stripe</p>
              <p className="text-sm text-muted-foreground">Conectat și securizat</p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Activ
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Plan curent</p>
              <p className="text-sm text-muted-foreground">Pay-as-you-go</p>
            </div>
            <Button variant="outline" size="sm">
              Upgrade
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dispozitiv</p>
              <p className="text-sm text-muted-foreground">
                {deviceCompatibility.deviceType === 'iphone' 
                  ? `iPhone (${deviceCompatibility.isCompatible === 'compatible' ? 'Compatibil' : 'Incompatibil'})` 
                  : deviceCompatibility.deviceType === 'android' 
                  ? 'Android (Incompatibil)' 
                  : 'Desktop (Incompatibil)'}
              </p>
            </div>
            <SmartphoneNfc className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-between" asChild>
            <Sheet>
              <SheetTrigger className="w-full">
                <span className="flex items-center">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Profil și setări
                </span>
                <ChevronRight className="h-4 w-4" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Setări cont</SheetTitle>
                  <SheetDescription>
                    Gestionează setările contului tău TapPayGo
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Metode de plată
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BellRing className="mr-2 h-4 w-4" />
                    Preferințe notificări
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Setări avansate
                  </Button>
                </div>
                <SheetFooter className="flex flex-col space-y-2">
                  <Button variant="default" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Deconectare
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
