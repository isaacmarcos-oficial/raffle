'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/date-picker'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { PhoneInput } from '@/components/ui/phone-input'
import { useRouter } from 'next/navigation'
import { Info, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { MoneyInput } from '@/components/ui/money-input'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export function CreateRaffleForm() {
  const { data: session } = useSession();
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter()

  const [raffleType, setRaffleType] = useState<'FIXED' | 'ALEATORY'>('FIXED')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quote: '',
    minQuotes: '',
    price: '',
    drawDate: '',
    pixKey: '',
    phone: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value || '',
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.url) {
          return data.url;
        } else {
          toast.error("Erro ao enviar imagem");
          return null;
        }
      } catch (error) {
        console.error("Erro ao processar a imagem:", error);
        toast.error("Erro ao processar a imagem");
        return null;
      }
    });

    // Aguarda o upload de todas as imagens antes de atualizar o estado
    const uploadedImages = (await Promise.all(uploadPromises)).filter(Boolean) as string[];

    if (uploadedImages.length > 0) {
      setImages((prev) => [...prev, ...uploadedImages]); // Adiciona as novas imagens ao estado
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'description', 'price', 'pixKey', 'phone', 'quote', 'minQuotes', 'drawDate'];

    if (raffleType === 'FIXED' &&
      (!formData.quote || isNaN(parseInt(formData.quote)))
    ) {
      return false;
    }

    if (
      raffleType === 'ALEATORY' &&
      (!formData.minQuotes || isNaN(parseInt(formData.minQuotes)))
    ) {
      return false;
    }

    return requiredFields.every(
      (field) => formData[field as keyof typeof formData] !== ''
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    const normalizedPhone = formData.phone.startsWith("+") ? formData.phone : `+${formData.phone}`;

    // Configura os dados conforme o tipo de campanha
    const payload = {
      type: raffleType === 'FIXED' ? 'FIXED' : 'ALEATORY',
      images,
      title: formData.title,
      description: formData.description,
      quote: parseInt(formData.quote),
      minQuotes: parseInt(formData.minQuotes),
      price: parseFloat(formData.price),
      drawDate: formData.drawDate,
      pixCode: formData.pixKey,
      contactPhone: normalizedPhone,
      ownerId: session?.user?.id,
    };

    try {
      const response = await fetch('/api/campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Erro ao criar campanha: ${errorData.error || 'Erro desconhecido'}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      toast.success('Campanha criada com sucesso!', {
        description: `Campanha: ${data.title}`,
      });

      router.push(`/dashboard/minhas-campanhas/${data.code}`);
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
      toast.error('Erro ao criar campanha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      {/* MODELO DA CAMPANHA */}
      <div className="flex flex-col gap-2 w-full">
        <Label>Modelo da campanha</Label>
        <RadioGroup
          defaultValue="FIXED"
          onValueChange={(value) => {
            setRaffleType(value as 'FIXED' | 'ALEATORY');
            setFormData((prevData) => ({
              ...prevData,
              quote: "",
              minQuotes: "",
            }));
          }}
          className='flex flex-col md:flex-row items-center justify-center gap-4 w-full'
        >
          <Card
            onClick={() => setRaffleType('FIXED')}
            className={cn(
              'flex gap-4 cursor-pointer border transition-all',
              raffleType === 'FIXED' ? 'border-green-500 bg-green-500/20 shadow-lg' : 'border-gray-300'
            )}
          >

            <div className="flex-1 flex-col gap-2">
              <Badge>00001</Badge>
              <Badge className='ml-6'>00002</Badge>
              <Badge>00003</Badge>
            </div>
            <div className="">
              <CardHeader className='p-0'>Bilhetes fixos</CardHeader>
              <CardDescription>
                Modelo de rifa tradicional com quantidade e bilhetes pré fixados
              </CardDescription>
            </div>
          </Card>
          <Card
            onClick={() => setRaffleType('ALEATORY')}
            className={cn(
              'flex gap-4 cursor-pointer border transition-all',
              raffleType === 'ALEATORY' ? 'border-green-500 shadow-lg bg-green-500/20' : 'border-gray-300'
            )}
          >
            <div className="flex-1 flex-col gap-2">
              <Badge>362514</Badge>
              <Badge className='ml-6'>475869</Badge>
              <Badge>718593</Badge>
            </div>
            <div className="">
              <CardHeader className='p-0'>Bilhetes Aleatórios</CardHeader>
              <CardDescription>
                Modelo de rifa tradicional com quantidade e bilhetes pré fixados
              </CardDescription>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* IMAGENS */}
      <div className="space-y-2">
        <Label>Imagens</Label>
        <div className="flex gap-4 flex-wrap">
          <label className="border-[1px] border-dashed border-primary/20 rounded-lg p-6 flex flex-col items-center justify-center bg-primary-50 cursor-pointer h-28 w-28 hover:bg-muted transition-all">
            <Input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            <Upload className="w-8 h-8 text-green-500 mb-2" />
          </label>

          {/* Exibição das imagens enviadas */}
          {images.length > 0 && images.map((img, index) => (
            <div key={index} className="relative group">
              <Image src={img} alt={`Imagem ${index + 1}`} className="w-28 h-28 object-contain rounded-md border" />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TITULO */}
      <div className="space-y-2">
        <Label htmlFor="title">Nome da Rifa</Label>
        <Input id="title" value={formData.title} onChange={handleChange} required />
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2">
        <Label htmlFor="description">Descrição da Rifa</Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} required />
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        {/* QUANTIDADE DE BILHETES */}
        <div className="space-y-2 w-full">
          <Label htmlFor="quote" className='flex items-center'>Bilhetes
            <HoverCard>
              <HoverCardTrigger className='cursor-help hover:text-green-500'>
                <Info className="w-4 h-4 ml-1" />
              </HoverCardTrigger>
              <HoverCardContent>
                A Quantidade de números que terá a sua campanha. A Quantidade mínima é 25.
              </HoverCardContent>
            </HoverCard>
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange(value, 'quote')}
          >
            <SelectTrigger>
              <SelectValue />
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

        {/* QUANTIDADE MINIMA */}
        <div className="space-y-2 w-full">
          <Label htmlFor="minQuotes">Quantidade mínima</Label>
          <Input
            id="minQuotes"
            type="number"
            min="1"
            value={formData.minQuotes}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        {/* PREÇO */}
        <div className="space-y-2 w-full">
          <Label htmlFor="price">Valor do bilhete</Label>
          <MoneyInput
            value={formData.price}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, price: value }))
            }
          />

          {/* <Input
            id="price"
            type="number"
            min="0.00"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          /> */}
        </div>

        {/* DATA DO SORTEIO */}
        <div className="space-y-2 w-full">
          <Label htmlFor="drawDate">Data do sorteio</Label>
          <DatePicker
            id="drawDate"
            value={formData.drawDate}
            onDateChange={(formattedDate) => setFormData((prevData) => ({
              ...prevData,
              drawDate: formattedDate
            }))}
            allowPastDates={false}
            required
          />
        </div>
      </div>

      <div className="w-full flex gap-4 flex-col md:flex-row">
        {/* CHAVE PIX */}
        <div className="space-y-2 w-full">
          <Label htmlFor="pixKey">Chave Pix para pagamento</Label>
          <Input id="pixKey" value={formData.pixKey} onChange={handleChange} required />
        </div>

        {/* TELEFONE */}
        <div className="space-y-2 w-full">
          <Label htmlFor="phone">Telefone para envio do comprovante</Label>
          <PhoneInput
            id="phone"
            defaultCountry='BR'
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange} required />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Campanha'}
      </Button>
    </form>
  )
}