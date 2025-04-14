
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Transaction } from "@/types/transactions";
import { startOfWeek, endOfWeek, format, parseISO } from "date-fns";
import { ro } from "date-fns/locale";

interface ReportingStats {
  volumeData: {
    date: string;
    amount: number;
  }[];
  revenueData: {
    period: string;
    amount: number;
  }[];
  patternsData: {
    hour: number;
    count: number;
    amount: number;
  }[];
}

export const useReportingData = () => {
  return useQuery({
    queryKey: ['reporting-data'],
    queryFn: async () => {
      const now = new Date();
      const weekStart = startOfWeek(now);
      const weekEnd = endOfWeek(now);

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .gte('created_at', weekStart.toISOString())
        .lte('created_at', weekEnd.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Process transactions for volume trends
      const volumeData = transactions.reduce((acc: any[], transaction: Transaction) => {
        const date = format(parseISO(transaction.created_at), 'dd MMM', { locale: ro });
        const existing = acc.find(item => item.date === date);
        if (existing) {
          existing.amount += transaction.amount;
        } else {
          acc.push({ date, amount: transaction.amount });
        }
        return acc;
      }, []);

      // Process transactions for revenue summary
      const revenueData = transactions
        .filter((t: Transaction) => t.status === 'completed')
        .reduce((acc: any[], transaction: Transaction) => {
          const period = format(parseISO(transaction.created_at), 'dd MMM', { locale: ro });
          const existing = acc.find(item => item.period === period);
          if (existing) {
            existing.amount += transaction.amount;
          } else {
            acc.push({ period, amount: transaction.amount });
          }
          return acc;
        }, []);

      // Process transactions for patterns analysis
      const patternsData = transactions.reduce((acc: any[], transaction: Transaction) => {
        const hour = parseISO(transaction.created_at).getHours();
        const existing = acc.find(item => item.hour === hour);
        if (existing) {
          existing.count += 1;
          existing.amount += transaction.amount;
        } else {
          acc.push({ hour, count: 1, amount: transaction.amount });
        }
        return acc;
      }, []);

      return {
        volumeData,
        revenueData,
        patternsData
      } as ReportingStats;
    }
  });
};
