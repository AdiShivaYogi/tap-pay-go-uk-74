
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  currency: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "failed":
        return "destructive";
      case "expired":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Finalizată";
      case "failed":
        return "Eșuată";
      case "expired":
        return "Expirată";
      default:
        return "În așteptare";
    }
  };

  return (
    <div className="relative overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Suma</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Nu există tranzacții pentru perioada selectată
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(parseISO(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {transaction.id.substring(0, 8)}...
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.currency} {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(transaction.status)}>
                    {getStatusLabel(transaction.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
