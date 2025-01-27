"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

type TicketsSearchProps = {
  onSearchName: (name: string) => void;
  onSearchNumber: (number: string) => void;
  onSearchPhone: (phone: string) => void;
  onSearchPaymentMethod: (paymentMethod: string) => void;
};

export default function TicketsSearch({ onSearchName, onSearchNumber, onSearchPhone, onSearchPaymentMethod }: TicketsSearchProps) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    onSearchName(value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber(value);
    onSearchNumber(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    onSearchPhone(value);
  }

  return (
    <div className="mb-6 flex gap-2 w-full">
      <Input
        type="text"
        placeholder="Pesquisar por nome"
        value={name}
        onChange={handleNameChange}
        className="p-2 border rounded w-3/4"
      />
      <Select onValueChange={onSearchPaymentMethod}>
        <SelectTrigger className="p-2 border rounded w-1/4">
          <SelectValue placeholder="Forma de pagamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Forma de pagamento</SelectLabel>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="CASH">Dinheiro</SelectItem>
            <SelectItem value="PIX_MANUAL">Pix</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={handlePhoneChange}
        className="p-2 border rounded w-1/4"
      />
      <Input
        type="number"
        placeholder="Número"
        value={number}
        onChange={handleNumberChange}
        className="p-2 border rounded w-1/4"
      />
    </div>
  )
}