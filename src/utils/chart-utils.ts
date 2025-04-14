
import { format, parseISO } from "date-fns";
import { ro } from "date-fns/locale";
import { Transaction } from "@/types/transactions";

export const prepareChartData = (transactions: Transaction[]) => {
  const dateMap = new Map();
  
  transactions.forEach(t => {
    const date = format(parseISO(t.created_at), 'dd MMM', { locale: ro });
    if (!dateMap.has(date)) {
      dateMap.set(date, { date, total: 0, completed: 0, failed: 0, pending: 0 });
    }
    
    const entry = dateMap.get(date);
    entry.total += t.amount;
    
    if (t.status === 'completed') {
      entry.completed += t.amount;
    } else if (t.status === 'failed') {
      entry.failed += t.amount;
    } else {
      entry.pending += t.amount;
    }
  });
  
  return Array.from(dateMap.values());
};

export const preparePieData = (transactions: Transaction[]) => {
  const statusCounts = new Map();
  
  transactions.forEach(t => {
    const status = t.status || 'pending';
    const label = status === 'completed' ? 'Finalizate' : 
                  status === 'failed' ? 'Eșuate' : 
                  status === 'expired' ? 'Expirate' : 'În așteptare';
    
    if (!statusCounts.has(status)) {
      statusCounts.set(status, { name: label, value: 0, count: 0 });
    }
    
    const entry = statusCounts.get(status);
    entry.value += t.amount;
    entry.count += 1;
  });
  
  return Array.from(statusCounts.values());
};
