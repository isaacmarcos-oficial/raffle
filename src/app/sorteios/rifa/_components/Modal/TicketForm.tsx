"use client"
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';

interface TicketFormProps {
  buyer: string;
  phone: string;
  setBuyer: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export function TicketForm({ buyer, phone, setBuyer, setPhone }: TicketFormProps) {

  return (
    <div className="rounded-lg w-full max-w-md">
      <form className="space-y-4">
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
            className="mt-1 capitalize"
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
      </form>
    </div>
  );
}