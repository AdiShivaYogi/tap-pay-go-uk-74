
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Transaction } from "@/types/transactions";

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const TransactionsList = ({ transactions, isLoading, onRefresh }: TransactionsListProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      case 'pending': return 'secondary';
      case 'expired': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'completed': 'Finalizată',
      'failed': 'Eșuată',
      'pending': 'În așteptare',
      'expired': 'Expirată'
    };
    return labels[status] || 'Necunoscut';
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Istoric Tranzacții</CardTitle>
            <CardDescription>
              Ultimele {transactions.length} tranzacții procesate
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={onRefresh}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCcw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Se încarcă tranzacțiile...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">
              Nu există tranzacții recente
            </p>
            <p className="text-sm text-muted-foreground">
              Tranzacțiile vor apărea după procesarea primei plăți
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data și ora</TableHead>
                  <TableHead>ID Tranzacție</TableHead>
                  <TableHead>Sumă</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="group hover:bg-muted/50">
                    <TableCell>
                      {format(new Date(transaction.created_at), 'dd MMM yyyy, HH:mm', { locale: ro })}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {transaction.stripe_payment_intent_id ? 
                        transaction.stripe_payment_intent_id.substring(0, 8) + '...' : 
                        transaction.id.substring(0, 8) + '...'}
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
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reîmprospătează
        </Button>
      </CardFooter>
    </Card>
  );
};
