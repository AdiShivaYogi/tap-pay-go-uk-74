
import { User } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

export const handleStripeConnection = async (
  user: User | null,
  accountId: string,
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    if (!user) throw new Error('Utilizatorul nu este autentificat');
    
    setUser({
      ...user,
      stripeConnected: true,
      stripeAccountId: accountId
    });
    
    toast({
      title: "Cont Stripe conectat",
      description: "Contul Stripe a fost conectat cu succes.",
    });
  } catch (error) {
    console.error('Eroare la conectarea Stripe:', error);
    toast({
      title: "Eroare la conectare",
      description: "Nu s-a putut conecta contul Stripe.",
      variant: "destructive"
    });
    throw error;
  } finally {
    setLoading(false);
  }
};

export const handleStripeDisconnection = async (
  user: User | null,
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    if (!user) throw new Error('Utilizatorul nu este autentificat');
    
    setUser({
      ...user,
      stripeConnected: false,
      stripeAccountId: undefined
    });
    
    toast({
      title: "Cont Stripe deconectat",
      description: "Contul Stripe a fost deconectat cu succes.",
    });
  } catch (error) {
    console.error('Eroare la deconectarea Stripe:', error);
    toast({
      title: "Eroare la deconectare",
      description: "Nu s-a putut deconecta contul Stripe.",
      variant: "destructive"
    });
    throw error;
  } finally {
    setLoading(false);
  }
};
