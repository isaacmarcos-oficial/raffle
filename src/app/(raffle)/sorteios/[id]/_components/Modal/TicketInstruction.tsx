import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface TicketInstructionProps {
  pixKey: string;
  contactPhone: string;
  paymentType?: 'PIX_MANUAL' | 'CASH'
}

export default function TicketInstruction({ pixKey, contactPhone, paymentType }: TicketInstructionProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      toast.success("Texto copiado para a área de transferência");
    } catch (err) {
      toast.error("Falha ao copiar o texto");
      console.error(err);
    }
  };

  {/* Instruções para pagamento em Dinheiro */ }
  if (paymentType === "CASH") {
    return (
      <Card className="my-4">
        <CardContent>
          <CardTitle className="font-semibold">Próximos Passos:</CardTitle>
          <div className="text-muted-foreground text-sm">
            <ul className="list-disc ml-6 mt-2 leading-6">
              <li>
                Entre em contato via{" "}
                <Link
                  className="text-green-500 font-bold underline"
                  href={`https://wa.me/${contactPhone}`}
                  target="_blank"
                >
                  WhatsApp
                </Link>{" "}
                para combinar o pagamento.
              </li>
              <li>Confirme a reserva do número.</li>
              <li>Após verificado o pagamento, o organizador irá confirmar o seu número.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  {/* Instruções para pagamento em PIX*/ }
  if (paymentType === "PIX_MANUAL") {
    return (
      <Card className="my-4">
        <CardContent>
          <CardTitle className="font-semibold">Pagamento via Pix</CardTitle>
          <div className="text-muted-foreground text-sm">
            <ul className="list-disc ml-6 mt-2">
              <li>Efetue o pagamento através do Pix:</li>
            </ul>
            <Card
              className="p-3 my-2 flex items-center justify-center cursor-pointer text-green-500 font-bold"
              onClick={copyToClipboard}
            >
              {pixKey}
              <Copy className="ml-1 h-3 w-3" />
            </Card>
            <ul className="list-disc ml-6 mt-2 leading-6">
              <li>
                Envie o comprovante via{" "}
                <Link
                  className="text-green-500 font-bold underline"
                  href={`https://wa.me/${contactPhone}`}
                  target="_blank"
                >
                  WhatsApp
                </Link>
                .
              </li>
              <li>Confirme a reserva do número.</li>
              <li>Após verificado o pagamento, o organizador irá confirmar o seu número.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null
}
