import { Ticket } from "@/types/campaign";
import { Card } from "../../../../components/ui/card";
import { Ban, CheckCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface SoldTicketsListProps {
  tickets: Ticket[];
  onTogglePayment: (ticketNumber: string) => void;
  onReleaseNumber: (ticketNumber: string) => void;
}

export function SoldTicketsList({ tickets, onTogglePayment, onReleaseNumber }: SoldTicketsListProps) {
  return (
    <Card className="">
      <h2 className="text-xl font-semibold mb-4">Números Vendidos</h2>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li
            key={ticket.number}
            className={`p-4 rounded-md ${ticket.paid ? "bg-green-100" : "bg-yellow-100"
              }`}
          >
            <div className="flex text-sm justify-between items-center text-gray-800">
              <div className="flex gap-2">
                <p> <strong>{ticket.number}</strong></p>
                <p> {ticket.buyer}</p>
              </div>
              <div className="flex gap-2 items-center">
                {ticket.paid ? null :
                  <Button
                    size="icon"
                    className={"bg-green-600 hover:bg-green-800 text-white h-7 w-7  text-xs"}
                    onClick={() => onTogglePayment(ticket.number)}
                  >
                    {ticket.paid ? null : <button
                      onClick={() => onReleaseNumber(ticket.number)}>
                      <CheckCircle className="h-4 w-4" />
                    </button>}
                  </Button>
                }

                {ticket.paid ? null :
                  <Button
                    size="icon"
                    onClick={() => onReleaseNumber(ticket.number)}
                    className="bg-red-600 hover:bg-red-700 text-white h-7 w-7 text-xs"
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                }

              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}