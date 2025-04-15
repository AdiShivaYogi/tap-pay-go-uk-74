
import { CurrencyInput } from "@/components/ui/currency-input";
import { Textarea } from "@/components/ui/textarea";

interface PaymentInputsProps {
  amount: string;
  setAmount: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export const PaymentInputs = ({
  amount,
  setAmount,
  description,
  setDescription
}: PaymentInputsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-2 text-foreground/90">
          Sumă de încasat (£)
        </label>
        <CurrencyInput
          id="amount"
          placeholder="0.00"
          value={amount}
          onValueChange={setAmount}
          prefix="£"
          decimalScale={2}
          className="h-14 text-xl font-medium"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground/90">
          Descriere plată (opțional)
        </label>
        <Textarea
          id="description"
          placeholder="Ex: Plată servicii"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none min-h-[80px]"
        />
      </div>
    </div>
  );
};
