
import { format } from "date-fns";
import { ro } from "date-fns/locale";

export const prepareMonthlyData = (transactions: any[], commissionRate: number) => {
  const monthMap = new Map();
  
  transactions.forEach(t => {
    const date = new Date(t.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const monthName = format(date, 'MMM yyyy', { locale: ro });
    
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, { 
        date: monthName, 
        total: 0, 
        completed: 0, 
        failed: 0, 
        pending: 0 
      });
    }
    
    const entry = monthMap.get(monthKey);
    entry.total += t.amount;
    
    if (t.status === 'completed') {
      entry.completed += t.amount;
    } else if (t.status === 'failed') {
      entry.failed += t.amount;
    } else {
      entry.pending += t.amount;
    }
  });
  
  return Array.from(monthMap.values());
};
