import { Transaction } from "@/types/transactions";

export const calculateMonitoringStats = (transactions: Transaction[]) => {
  const totalTransactions = transactions.length;
  const completedTransactions = transactions.filter(t => t.status === 'completed');
  const successRate = totalTransactions ? 
    (completedTransactions.length / totalTransactions) * 100 : 0;
  
  // Identifică tranzacții suspecte (exemple de criterii)
  const suspiciousTransactions = transactions.filter(t => {
    const amount = Number(t.amount);
    const isLargeAmount = amount > 1000; // Sumă mare
    const hasFailedAttempts = transactions.filter(
      ot => ot.status === 'failed' && 
      new Date(ot.created_at).getTime() > new Date(t.created_at).getTime() - 3600000
    ).length > 2; // Mai mult de 2 încercări eșuate într-o oră

    return isLargeAmount || hasFailedAttempts;
  });

  // Calculează valoarea medie a tranzacțiilor
  const averageAmount = transactions.length ? 
    transactions.reduce((sum, t) => sum + Number(t.amount), 0) / transactions.length : 0;

  // Generează alerte bazate pe analiză
  const recentAlerts = transactions
    .filter(t => {
      const amount = Number(t.amount);
      return amount > 1000 || t.status === 'failed';
    })
    .slice(0, 5)
    .map(t => ({
      id: t.id,
      type: t.status === 'failed' ? 'error' as const : 
            Number(t.amount) > 1000 ? 'warning' as const : 
            'success' as const,
      message: t.status === 'failed' ? 
        'Tranzacție eșuată - verificare necesară' :
        `Tranzacție de valoare mare: £${Number(t.amount).toFixed(2)}`,
      timestamp: t.created_at
    }));

  return {
    totalTransactions,
    suspiciousTransactions: suspiciousTransactions.length,
    successRate: Number(successRate.toFixed(1)),
    averageAmount,
    recentAlerts
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
