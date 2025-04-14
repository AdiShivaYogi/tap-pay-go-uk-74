
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Transaction } from "@/types/transactions";

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const TransactionsList = ({ transactions, isLoading, onRefresh }: TransactionsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tranzacții recente</CardTitle>
        <CardDescription>
          Istoric tranzacții procesat prin Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-muted-foreground text-center py-6">
            Se încarcă...
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-2">
              Nu există tranzacții recente
            </p>
            <p className="text-sm text-muted-foreground">
              Tranzacțiile vor apărea aici după ce procesezi prima plată prin Stripe
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Suma</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.created_at), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>£{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                      {transaction.status === 'completed' ? 'Finalizată' : 'În așteptare'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onRefresh}
          disabled={isLoading}
        >
          Reîmprospătează
        </Button>
      </CardFooter>
    </Card>
  );
};
