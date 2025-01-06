"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CampaignType } from "@/types/campaign";
import { useState } from "react";

export interface CampaignProps {
  campaign: CampaignType;
}

export default function CampaignSetting({campaign}: CampaignProps) {
  
  const [formData, setFormData] = useState({
    title: campaign.title || "",
    description: campaign.description || "",
    raffleType: campaign.type || "fixed",
    quantity: campaign.quote || "",
    minQuantity: campaign.minQuotes ? Number(campaign.minQuotes) : 1,
    price: campaign.price || 0,
    drawDate: campaign.drawDate || "",
    pixKey: campaign.pixCode || "",
    phone: campaign.contactPhone || "",
  });


  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string, key: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      drawDate: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Implementar lógica de envio aqui
    console.log("Dados enviados:", formData);
    setLoading(false);
  };

  return (
    <div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="title">Nome da Rifa</Label>
          <Input id="title" value={formData.title} onChange={handleChange}/>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição da Rifa</Label>
          <Textarea id="description" value={formData.description} onChange={handleChange}/>
        </div>


        <div className="flex flex-col md:flex-row gap-4 w-full items-center">
          {formData.raffleType === 'fixed' && (
            <div className="space-y-2 w-full">
              <Label htmlFor="quantity">Quantidade de números</Label>
              <Select
                onValueChange={(value) => handleSelectChange(value, 'quantity')}
              >
                <SelectTrigger>
                  <SelectValue defaultValue={formData.quantity}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((val) => (
                      <SelectItem key={val} value={val.toString()}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {formData.raffleType === 'aleatory' && (
            <div className="space-y-2 w-full">
              <Label htmlFor="minQuantity">Quantidade mínima de números</Label>
              <Input
                id="minQuantity"
                type="number"
                min="1"
                value={formData.minQuantity}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="space-y-2 w-full">
            <Label htmlFor="price">Preço do número</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="drawDate">Data do sorteio</Label>
            <DatePicker
              id="drawDate"
              value={formData.drawDate ? new Date(formData.drawDate).toISOString().split('T')[0] : ''} // Converte para string no formato correto
              onChange={() => handleDateChange} // Atualiza o estado
              required
            />
          </div>
        </div>

        <div className="w-full flex gap-4 flex-col md:flex-row">
          <div className="space-y-2 w-full">
            <Label htmlFor="pixKey">Chave Pix para pagamento</Label>
            <Input id="pixKey" value={formData.pixKey} onChange={handleChange} required />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="phone">Telefone para envio do comprovante</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Atualizando...' : 'Atualizar Campanha'}
        </Button>
      </form>
    </div>
  )
}