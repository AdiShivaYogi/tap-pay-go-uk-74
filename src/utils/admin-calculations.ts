
import { Transaction } from "@/types/transactions";

export const calculateMonitoringStats = (transactions: Transaction[]) => {
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  return {
    totalTransactions: transactions.length,
    averageAmount: successfulTransactions.length > 0 
      ? successfulTransactions.reduce((sum, t) => sum + t.amount, 0) / successfulTransactions.length 
      : 0,
    activeUsers: [...new Set(transactions.map(t => t.user_id))].length,
    successRate: transactions.length > 0 
      ? (successfulTransactions.length / transactions.length) * 100 
      : 0
  };
};

export const calculateFinancialStats = (transactions: Transaction[], commissionRate: number) => {
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const totalTransactions = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = totalTransactions * commissionRate;
  const successfulAmount = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
  const successfulCommission = successfulAmount * commissionRate;

  return {
    totalTransactions: transactions.length,
    totalAmount: totalTransactions,
    totalCommission,
    successfulCommission,
  };
};

export const calculatePieChartData = (transactions: Transaction[]) => {
  const successfulTransactions = transactions.filter(t => t.status === 'completed');
  const successfulAmount = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);

  return [
    { 
      name: "Plăți reușite", 
      value: successfulAmount, 
      count: successfulTransactions.length 
    },
    { 
      name: "Plăți eșuate", 
      value: transactions.filter(t => t.status === 'failed').reduce((sum, t) => sum + t.amount, 0),
      count: transactions.filter(t => t.status === 'failed').length
    },
    { 
      name: "În așteptare", 
      value: transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0),
      count: transactions.filter(t => t.status === 'pending').length
    }
  ];
};
