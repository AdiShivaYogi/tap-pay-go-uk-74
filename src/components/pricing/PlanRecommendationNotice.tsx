
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PlanRecommendationNoticeProps {
  currentPlan: string;
  recommendedPlan: string;
  savingsAmount: number;
  monthlyTransactions: number;
}

export const PlanRecommendationNotice = ({
  currentPlan,
  recommendedPlan,
  savingsAmount,
  monthlyTransactions,
}: PlanRecommendationNoticeProps) => {
  const navigate = useNavigate();

  if (currentPlan === recommendedPlan) {
    return null;
  }

  return (
    <Alert className="mb-6 border-primary/20 bg-primary/5 max-w-3xl mx-auto">
      <BarChart className="h-4 w-4 text-primary" />
      <AlertTitle>Economisește bani cu un plan superior</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm">
          Bazat pe volumul tău actual de <strong>{monthlyTransactions}</strong> tranzacții lunare, 
          ai putea economisi aproximativ <strong>£{savingsAmount}</strong> pe lună prin trecerea la planul <strong>{recommendedPlan}</strong>.
        </div>
        <Button 
          variant="outline" 
          className="shrink-0" 
          onClick={() => navigate("/pricing")}
        >
          Vezi detalii
        </Button>
      </AlertDescription>
    </Alert>
  );
};
