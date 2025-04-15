
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AllowedIP {
  id: string;
  ip_address: string;
  description: string;
  created_at: string;
}

export function IPWhitelist() {
  const { data: allowedIPs, isLoading } = useQuery({
    queryKey: ['allowed-ips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('allowed_ips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching allowed IPs:', error);
        throw error;
      }

      return data as AllowedIP[];
    }
  });

  return (
    <Card className="p-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>IP Whitelist Active</AlertTitle>
        <AlertDescription>
          Accesul la aplicație este restricționat doar pentru IP-urile din listă
        </AlertDescription>
      </Alert>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IP Address</TableHead>
              <TableHead>Descriere</TableHead>
              <TableHead>Data adăugării</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allowedIPs?.map((ip) => (
              <TableRow key={ip.id}>
                <TableCell>{ip.ip_address}</TableCell>
                <TableCell>{ip.description}</TableCell>
                <TableCell>
                  {new Date(ip.created_at).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
