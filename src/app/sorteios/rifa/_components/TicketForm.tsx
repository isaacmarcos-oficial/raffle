"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';

interface TicketFormProps {
  selectedNumbers: string[];
  price: number;
  handlePurchase: (buyerName: string, phone: string) => void;
  onClose: () => void;
}

export function TicketForm({ selectedNumbers, price, onClose, handlePurchase }: TicketFormProps) {
  const [buyer, setBuyer] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handlePurchase(buyer, phone);
  };

  return (
    <div className="rounded-lg w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="buyer" className="block text-sm font-medium">
            Seu nome
          </Label>
          <Input
            type="text"
            id="buyer"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm font-medium">
            Seu telefone Whatsapp
          </Label>
          <PhoneInput
            id="phone"
            value={phone}
            onChange={setPhone}
            defaultCountry='BR'
            required
            className="mt-1"
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Voltar
          </Button>
          <Button type="submit" className="">
            Finalizar {(price * selectedNumbers.length).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Button>
        </div>
      </form>
    </div>
  );
}