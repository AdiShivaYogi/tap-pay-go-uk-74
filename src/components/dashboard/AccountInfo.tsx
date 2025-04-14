
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";

interface AccountInfoProps {
  deviceCompatibility: DeviceCompatibility;
}

export const AccountInfo = ({ deviceCompatibility }: AccountInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informații cont</CardTitle>
        <CardDescription>
          Contul tău este conectat direct la Stripe pentru procesarea plăților
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Cont Stripe</p>
            <p className="text-sm text-muted-foreground">Conectat și securizat</p>
          </div>
          <div>
            <p className="text-sm font-medium">Plan curent</p>
            <p className="text-sm text-muted-foreground">Pay-as-you-go</p>
          </div>
          <div>
            <p className="text-sm font-medium">Dispozitiv</p>
            <p className="text-sm text-muted-foreground">
              {deviceCompatibility.deviceType === 'iphone' 
                ? `iPhone (${deviceCompatibility.isCompatible === 'compatible' ? 'Compatibil' : 'Incompatibil'} cu Tap to Pay)` 
                : deviceCompatibility.deviceType === 'android' 
                ? 'Android (Incompatibil cu Tap to Pay)' 
                : 'Desktop (Incompatibil cu Tap to Pay)'}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">Gestionează contul</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Setări cont</SheetTitle>
              <SheetDescription>
                Gestionează setările contului tău TapPayGo
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-4">
              <Button variant="outline" className="w-full">Deconectare de la Stripe</Button>
              <Button variant="outline" className="w-full">Schimbă planul tarifar</Button>
              <Button variant="outline" className="w-full">Preferințe notificări</Button>
            </div>
            <SheetFooter>
              <Button variant="outline" className="w-full">Închide</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
};
