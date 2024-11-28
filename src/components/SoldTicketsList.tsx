import { Ticket } from "@/types/raffle";

interface SoldTicketsListProps {
  tickets: Ticket[];
  onTogglePayment: (ticketNumber: string) => void;
}

export function SoldTicketsList({ tickets, onTogglePayment }: SoldTicketsListProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Números Vendidos</h2>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li
            key={ticket.number}
            className={`p-4 rounded-md ${ticket.paid ? "bg-green-100" : "bg-yellow-100"
              }`}
          >
            <div className="flex text-sm justify-between items-center text-gray-800">
              <div>
                <p> Nº: <strong>{ticket.number}</strong></p>
                <p> {ticket.buyer}</p>
                <p> {ticket.phone} </p>
              </div>
              <div>
                <button
                  className={`px-3 py-1 text-sm font-semibold rounded ${ticket.paid ? "bg-green-500 text-white" : "bg-yellow-500 text-gray-800"
                    }`}
                  onClick={() => onTogglePayment(ticket.number)}
                >
                  {ticket.paid ? "Pago" : "Não Pago"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}