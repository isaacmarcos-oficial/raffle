"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { type Ticket } from '../../../../types/campaign';

interface TicketFormProps {
  selectedNumber: string;
  onSubmit: (ticket: Ticket) => void;
  onClose: () => void;
}

export function TicketForm({ selectedNumber, onSubmit, onClose }: TicketFormProps) {
  const [buyer, setBuyer] = useState('');
  const [phone, setPhone] = useState('');
  const [paid, setPaid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const ticket: Ticket = {
      number: selectedNumber,
      buyer,
      phone,
      paid,
      purchaseDate: new Date(),
    };

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });
  
      if (response.ok) {
        const savedTicket = await response.json();
        onSubmit(savedTicket); // Atualiza o estado local com o ticket salvo
        onClose();
      } else {
        console.error("Failed to save ticket");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comprar Número {selectedNumber}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="buyer" className="block text-sm font-medium text-gray-100">
              Nome do Comprador
            </label>
            <input
              type="text"
              id="buyer"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
              required
              className="mt-1 p-2 text-gray-800 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-100">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 text-gray-800 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="paid"
              checked={paid}
              onChange={(e) => setPaid(e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="paid" className="ml-2 block text-sm text-gray-100">
              Pagamento Confirmado
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Confirmar Compra
          </button>
        </form>
      </div>
    </div>
  );
}