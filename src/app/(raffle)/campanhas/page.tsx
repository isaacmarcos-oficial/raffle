"use client";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CampaignType } from '@/types/campaign';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gift, Calendar, Users, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useState } from "react";
import { toast } from 'sonner';

export default function Campanhas() {
  const [code, setCode] = useState('');
  const [campaign, setCampaign] = useState<CampaignType | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const searchCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    setCampaign(null);

    try {
      const response = await fetch(`/api/campaign/${code}`, {
        method: 'GET',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ""
        },
      })
      if (!response.ok) {
        toast.error('Campanha não encontrada. Verifique o código e tente novamente.');
      }

      const data: CampaignType = await response.json();
      setCampaign(data);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao buscar a campanha. Tente novamente mais tarde.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (date: string | Date): string => {
    const parsedDate = new Date(date);

    // Verifica se a data é válida
    if (isNaN(parsedDate.getTime())) {
      return "Data inválida";
    }

    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(parsedDate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <Card className="text-center mb-8">
            <motion.div
              className="inline-block mb-6"
              animate={{ y: [0, 10, 0], }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", out: "linear" }}
            >
              <Gift className="w-12 h-12 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold">Buscar Campanha</h1>
            <p className="text-primary/50 mt-2">Digite o código da campanha para participar</p>
          </Card>

          <form onSubmit={searchCampaign} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Digite o código da campanha"
                className="w-full uppercase placeholder-green-200 border border-primary/10 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-sm"
              />
              <Button
                type="submit"
                disabled={!code || isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 p-2 rounded-lg disabled:opacity-50 disabled:hover:bg-green-500"
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
            {campaign && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="mt-8"
              >
                <Card className="bg-primary/0 backdrop-blur-sm rounded-xl border border-primary/10 p-6 mt-4">
                  <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
                  <p className="text-primary/70 mb-4">{campaign.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                    <div className="flex items-center gap-2 ">
                      <Calendar className="w-5 h-5" />
                      <span>Até {formatDate(campaign.drawDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 ">
                      <Users className="w-5 h-5" />
                      <span>{campaign.tickets?.length} participantes</span>
                    </div>
                  </div>

                  <Link href={`/sorteios/${campaign.code}`} >
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                    >
                      Participar da Campanha
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}