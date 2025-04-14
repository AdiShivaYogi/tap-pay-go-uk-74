
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

interface AdminTransactionsTableProps {
  isLoading: boolean;
  transactions: Transaction[];
  commissionRate: number;
}

export const AdminTransactionsTable = ({ isLoading, transactions, commissionRate }: AdminTransactionsTableProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Comisioane pe tranzacții</CardTitle>
        <CardDescription>Detalii despre comisioanele generate din fiecare tranzacție</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>ID Tranzacție</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Suma</TableHead>
                <TableHead>Comision (2.5%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {transaction.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'failed' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>£{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>£{(transaction.amount * commissionRate).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
