"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PhoneInput } from '@/components/ui/phone-input';
import { BuyerType } from '@/types/campaign';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gift, Users, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useState } from "react";
import { toast } from 'sonner';

export default function MeusBilhetes() {
  const [phone, setPhone] = useState('');
  const [buyer, setBuyer] = useState<BuyerType | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const searchCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    setBuyer(null);

    try {
      const normalizedPhone = phone.replace(/\D/g, '');

      const response = await fetch(`/api/campaign/buyer?phone=${normalizedPhone}`, {
        method: 'GET',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ""
        },
      })

      if (!response.ok) {
        toast.error(`Campanha não encontrada para ${normalizedPhone}. Verifique o código e tente novamente.`);
      }

      const data: BuyerType = await response.json();
      setBuyer(data);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao buscar os. Tente novamente mais tarde.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  console.log("Resposta da busca", buyer)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-primary/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-primary/10"
        >
          <Card className="text-center mb-8">
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Gift className="w-12 h-12 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold">Buscar Campanha</h1>
            <p className="text-primary/50 mt-2">Digite o seu telefone para encontrar seus bilhetes</p>
          </Card>

          <form onSubmit={searchCampaign} className="space-y-6">
            <div className="relative">
              <PhoneInput
                id="phone"
                value={phone}
                onChange={setPhone}
                defaultCountry='BR'
                required
                className="mt-1 w-full uppercase placeholder-green-200 border border-primary/20 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-sm"
              />

              <Button
                type="submit"
                disabled={!phone || isSearching}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 p-2 rounded-lg disabled:opacity-50 disabled:hover:bg-green-500"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-300 text-center"
              >
                {error}
              </motion.p>
            )}
          </form>

          <AnimatePresence mode="wait">
            {buyer && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="mt-8"
              >

                <Card className="flex gap-2 bg-primary/0 backdrop-blur-sm rounded-xl border border-primary/10 p-6 mt-4">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>{buyer.name}</span>
                </Card>

                {/* Itera pelas campanhas únicas dos tickets */}
                {Object.values(
                  buyer.tickets?.reduce((acc, ticket) => {
                    const campaignId = ticket.campaign?.id || "unknown";
                    if (!acc[campaignId]) {
                      acc[campaignId] = {
                        id: campaignId,
                        title: ticket.campaign?.title || "Título indisponível",
                        code: ticket.campaign?.code || "Código indisponível",
                        numbers: [],
                      };
                    }
                    acc[campaignId].numbers.push(...ticket.numbers);
                    return acc;
                  }, {} as Record<string, { id: string; title: string; code: string; numbers: string[] }>)
                ).map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="flex items-center justify-between bg-primary/0 backdrop-blur-sm rounded-xl border border-primary/10 p-6 mt-4"
                  >
                    <div>
                      <h2 className="text-lg font-semibold mb-2">{campaign.title}</h2>

                      {/* Exibir números agrupados */}
                      <div className="my-2 flex flex-wrap gap-2">
                        {campaign.numbers.map((number, numIdx) => (
                          <Badge key={`${campaign.id}-${numIdx}`} className="">
                            {number.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link href={`/sorteios/${campaign.code}`}>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2">
                        Ver Campanha
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div >
    </div >
  )
}