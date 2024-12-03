import { Card } from "./ui/card";

type SummaryCardProps = {
  totalNumbers: number;
  soldTickets: number;
};

export function Summary({ totalNumbers, soldTickets }: SummaryCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-x font-semibold mb-4">Resumo</h2>
      <div className="space-y-2">
        <p>Total de números: {totalNumbers}</p>
        <p>Números vendidos: {soldTickets}</p>
        <p>Números disponíveis: {totalNumbers - soldTickets}</p>
      </div>
    </Card>
  );
}
