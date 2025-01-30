"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CampaignType } from "@/types/campaign";
import { Check, Pencil, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export interface CampaignProps {
  campaign: CampaignType;
  onUpdateCampaign: (updatedCampaign: Partial<CampaignType>) => Promise<void>; // Callback para salvar as alterações
}

export default function CampaignSetting({ campaign, onUpdateCampaign }: CampaignProps) {
  const [formData, setFormData] = useState({
    title: campaign.title || "",
    description: campaign.description || "",
    raffleType: campaign.type || "fixed",
    quantity: campaign.quote || "",
    minQuantity: campaign.minQuotes ? Number(campaign.minQuotes) : 1,
    price: campaign.price || 0,
    drawDate: campaign.drawDate || "",
    pixKey: campaign.pixCode || "",
    images: campaign.images || [],
    phone: campaign.contactPhone.startsWith("+") // Adiciona "+" se necessário
      ? campaign.contactPhone
      : `+${campaign.contactPhone}`,
  });

  const [editMode, setEditMode] = useState({
    title: false,
    description: false,
    raffleType: false,
    quantity: false,
    minQuantity: false,
    price: false,
    drawDate: false,
    pixKey: false,
    phone: false,
  });

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("Selecione uma imagem para enviar.");
      return;
    }
  
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
  
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        console.error("❌ Erro na resposta do servidor:", await response.json());
        throw new Error("Erro no upload de imagens");
      }
  
      const data = await response.json();
  
      if (data.urls) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...data.urls],
        }));
        toast.success("Imagens enviadas com sucesso!");
      } else {
        console.error("❌ Resposta inesperada do servidor:", data);
        toast.error("Erro ao processar imagens");
      }
    } catch (error) {
      console.error("❌ Erro ao fazer upload:", error);
      toast.error("Erro ao enviar imagens");
    }
  };  

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const toggleEditMode = (field: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePhoneChange = (value: string) => {
    const normalizedPhone = value.startsWith("+") ? value : `+${value}`;
    setFormData((prevData) => ({
      ...prevData,
      phone: normalizedPhone,
    }));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onUpdateCampaign(formData); // Chama o callback para atualizar a campanha
    } catch (error) {
      console.error("Erro ao atualizar a campanha:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* IMAGENS DA RIFA */}
        <div className="flex gap-4 flex-wrap">
          <label className="border-[1px] border-dashed border-primary/20 rounded-lg p-6 flex flex-col items-center justify-center bg-primary-50 cursor-pointer h-28 w-28 hover:bg-muted transition-all">
            <Upload className="w-8 h-8 text-green-500 mb-2" />
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          {/* Exibir imagens carregadas */}
          {formData.images.map((url, index) => (
            <div key={index} className="relative group w-24 h-24">
              <Image
                src={url}
                width={300}
                height={300}
                className="w-28 h-28 object-contain rounded-md border p-2"
                alt="Imagem da campanha"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                onClick={() => removeImage(index)}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>

        {/* NOME DA RIFA */}
        <div className="space-y-2">
          <Label htmlFor="title">Nome da Rifa</Label>
          <div className="flex gap-2">
            <Input
              id="title"
              value={formData.title}
              onChange={handleChange}
              disabled={!editMode.title}
            />
            <Button type="button" onClick={() => toggleEditMode("title")}>
              {editMode.title ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* DESCRICAO DA RIFA */}
        <div className="space-y-2">
          <Label htmlFor="description">Descrição da Rifa</Label>
          <div className="flex gap-2">
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!editMode.description}
            />
            <Button type="button" onClick={() => toggleEditMode("description")}>
              {editMode.description ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full items-center">
          {formData.raffleType === 'fixed' && (
            <div className="space-y-2 w-full">
              <Label htmlFor="quantity">Quantidade de números</Label>
              <Select
                onValueChange={(value) => handleSelectChange(value, 'quantity')}
              >
                <SelectTrigger>
                  <SelectValue defaultValue={formData.quantity} />
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
            <Label htmlFor="price">Preço do Bilhete</Label>
            <div className="flex gap-2">
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                disabled={!editMode.price}
              />
              <Button type="button" onClick={() => toggleEditMode("price")}>
                {editMode.price ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="drawDate">Data do sorteio</Label>
            <div className="flex gap-2">
              <DatePicker
                id="drawDate"
                value={formData.drawDate ? new Date(formData.drawDate).toISOString().split('T')[0] : ''} // Converte para string no formato correto
                onChange={() => handleDateChange} // Atualiza o estado
                required
                disabled={!editMode.drawDate}
              />
              <Button type="button" onClick={() => toggleEditMode("drawDate")}>
                {editMode.drawDate ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-4 flex-col md:flex-row">
          <div className="space-y-2 w-full">
            <Label htmlFor="pixKey">Chave Pix para pagamento</Label>
            <div className="flex gap-2">
              <Input id="pixKey" value={formData.pixKey} onChange={handleChange} disabled={!editMode.pixKey} required />
              <Button type="button" onClick={() => toggleEditMode("pixKey")}>
                {editMode.pixKey ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="phone">Telefone para envio do comprovante</Label>
            <div className="flex gap-2">
              <PhoneInput
                id="phone"
                type="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                disabled={!editMode.phone}
                required
              />
              <Button type="button" onClick={() => toggleEditMode("phone")}>
                {editMode.phone ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
              </Button>
            </div>

          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Atualizando...' : 'Atualizar Campanha'}
        </Button>
      </form>
    </div>
  )
}