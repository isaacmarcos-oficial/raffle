import { Card, CardTitle } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { BanknoteIcon, ScanQrCode } from "lucide-react";

interface PaymentTypeProps {
  paymentType?: 'PIX_MANUAL' | 'CASH';
  setPaymentType: (value: 'PIX_MANUAL' | 'CASH') => void;
}

export default function PaymentType({ setPaymentType, paymentType }:PaymentTypeProps) {

  return (
    <div className="flex flex-col gap-2 items-center">
      <CardTitle>Selecione a forma de pagamento?</CardTitle>
      <RadioGroup
        defaultValue="rifa"
        onValueChange={(value) => {
          setPaymentType(value as 'PIX_MANUAL' | 'CASH');
        }}
        className='flex flex-col md:flex-row items-center justify-center gap-4 w-full'
      >
        <Card
          className={cn(
            'flex gap-4 cursor-pointer border transition-all w-full items-center justify-center',
            paymentType === 'PIX_MANUAL' ? 'border-green-500 bg-green-500/20 shadow-lg text-green-500' : 'border-border'
          )}
          onClick={() => setPaymentType('PIX_MANUAL')}
        >
          <ScanQrCode className="h-8 w-8" />
          <p className="font-bold">PIX</p>
        </Card>
        <Card
          onClick={() => setPaymentType('CASH')}
          className={cn(
            'flex gap-4 cursor-pointer border transition-all w-full items-center justify-center',
            paymentType === 'CASH' ? 'border-green-500 bg-green-500/20 shadow-lg text-green-500' : 'border-border'
          )}
        >
            <BanknoteIcon className="h-8 w-8" />
          <p className="font-bold">Dinheiro</p>
        </Card>
      </RadioGroup>
    </div >
  )
}