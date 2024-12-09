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

export function CreateRaffleForm() {
  const [raffleType, setRaffleType] = useState<'rifa' | 'loteria'>('rifa')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <div className="flex gap-2 w-full items-center justify-center">
        <RadioGroup
          defaultValue="rifa"
          onValueChange={(value) => setRaffleType(value as 'rifa' | 'loteria')}
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
        <Input id="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição da Rifa</Label>
        <Textarea id="description" required />
      </div>


      <div className="flex flex-col md:flex-row gap-4 w-full items-center">
        {raffleType === 'rifa' && (
          <div className="space-y-2 w-full">
            <Label htmlFor="quantity">Quantidade de números</Label>
            <Select defaultValue="25" required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="600">600</SelectItem>
                  <SelectItem value="700">700</SelectItem>
                  <SelectItem value="800">800</SelectItem>
                  <SelectItem value="900">900</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        {raffleType === 'loteria' && (
          <div className="space-y-2 w-full">
            <Label htmlFor="minQuantity">Quantidade mínima de números</Label>
            <Input id="minQuantity" type="number" min="1" required />
          </div>
        )}

        <div className="space-y-2 w-full">
          <Label htmlFor="price">Preço do número</Label>
          <Input id="price" type="number" min="0" step="0.01" required />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="drawDate">Data do sorteio</Label>
          <DatePicker id="drawDate" />
        </div>
      </div>

      <div className="w-full flex gap-4 flex-col md:flex-row">
        <div className="space-y-2 w-full">
          <Label htmlFor="pixKey">Chave Pix para pagamento</Label>
          <Input id="pixKey" required />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="phone">Telefone para envio do comprovante</Label>
          <Input id="phone" type="tel" required />
        </div>
      </div>

      <Button type="submit" className="w-full">Criar Campanha</Button>
    </form>
  )
}

