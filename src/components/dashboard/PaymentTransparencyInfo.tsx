
import { Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const PaymentTransparencyInfo = () => {
  return (
    <Card className="border-blue-100 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Info className="h-5 w-5 text-blue-600" />
          Monitorizare Etică a Tranzacțiilor
        </CardTitle>
        <CardDescription className="text-blue-700">
          Urmărim doar aspecte care îți îmbunătățesc experiența, 
          fără a compromite confidențialitatea.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-blue-800">
        <ul className="space-y-2 list-disc list-inside">
          <li>Înregistrăm doar statusul general al plăților</li>
          <li>Nu avem acces la detalii bancare</li>
          <li>Fiecare tranzacție este complet izolată</li>
        </ul>
      </CardContent>
    </Card>
  );
};
