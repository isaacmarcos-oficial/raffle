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



export function CreateRaffleForm() {
  const { data: session } = useSession();

  const [raffleType, setRaffleType] = useState<'rifa' | 'loteria'>('rifa')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    minQuantity: '',
    price: '',
    drawDate: '',
    pixKey: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event?.target?.value ? new Date(event.target.value) : null;
    setFormData((prevData) => ({
      ...prevData,
      drawDate: date ? date.toISOString().split('T')[0] : '', // Converte Date para string no formato YYYY-MM-DD
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'description', 'price', 'pixKey', 'phone', 'drawDate'];

    if (raffleType === 'rifa' &&
      (!formData.quantity || isNaN(parseInt(formData.quantity)))
    ) {
      return false;
    }

    if (
      raffleType === 'loteria' &&
      (!formData.minQuantity || isNaN(parseInt(formData.minQuantity)))
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

    // Configura os dados conforme o tipo de campanha
    const payload = {
      name: formData.name,
      description: formData.description,
      type: raffleType === 'rifa' ? 'FIXED' : 'ALEATORY',
      ...(raffleType === 'rifa' && { quote: parseInt(formData.quantity) }),
      ...(raffleType === 'loteria' && { minQuotes: parseInt(formData.minQuantity) }),
      price: parseFloat(formData.price),
      drawDate: formData.drawDate,
      pixCode: formData.pixKey,
      contactPhone: formData.phone,
      ownerId: session?.user?.id
    };
    console.log(payload)

    try {
      const response = await fetch('/api/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        description: `ID: ${data.id}`,
      });

      // Limpa o formulário após o sucesso
      setFormData({
        name: '',
        description: '',
        quantity: '',
        minQuantity: '',
        price: '',
        drawDate: '',
        pixKey: '',
        phone: '',
      });
      setRaffleType('rifa');
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
      toast.error('Erro ao criar campanha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="flex gap-2 w-full items-center justify-center">
        <RadioGroup
          defaultValue="rifa"
          onValueChange={(value) => {
            setRaffleType(value as 'rifa' | 'loteria');
            setFormData((prevData) => ({
              ...prevData,
              quantity: "",
              minQuantity: "",
            }));
          }}
          className='flex flex-col md:flex-row items-center justify-center gap-4 w-full'
        >
          <Card
            onClick={() => setRaffleType('rifa')}
            className={cn(
              'flex gap-4 cursor-pointer border transition-all',
              raffleType === 'rifa' ? 'border-green-500 shadow-lg' : 'border-gray-300'
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
            onClick={() => setRaffleType('loteria')}
            className={cn(
              'flex gap-4 cursor-pointer border transition-all',
              raffleType === 'loteria' ? 'border-green-500 shadow-lg' : 'border-gray-300'
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

      <div className="space-y-2">
        <Label htmlFor="name">Nome da Rifa</Label>
        <Input id="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição da Rifa</Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} required />
      </div>


      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        {raffleType === 'rifa' && (
          <div className="space-y-2 w-full">
            <Label htmlFor="quantity">Quantidade de números</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, 'quantity')}
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
        )}
        {raffleType === 'loteria' && (
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
            onChange={(date) => handleDateChange(date)} // Atualiza o estado
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
        {loading ? 'Criando...' : 'Criar Campanha'}
      </Button>
    </form>
  )
}

