import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Gift, LogIn, Ticket, Users } from "lucide-react"
import Link from "next/link"
import { raffles } from "../api/tickets/raffles"

export default function Raffles() {
    
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <main className="flex-1 max-w-[1100px]">
                <section className="w-full py-12 px-4">
                    <div className="container px-4 md:px-6">
                        <h1 className="text-xl font-bold tracking-tighter mb-8">
                            Sorteios disponíveis
                        </h1>
                        <div className="flex md:flex-row gap-4 mb-8">
                            <Input className="w-2/4" placeholder="Buscar Rifa" />
                            <Select>
                                <SelectTrigger className="w-1/4">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="raffle">Rifa</SelectItem>
                                    <SelectItem value="lottery">Sorteio</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-1/4">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="endDate">Data do sorteio</SelectItem>
                                    <SelectItem value="participants">Participantes</SelectItem>
                                    <SelectItem value="price">Preço</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
                            {raffles.map((raffle) => (
                                <Card key={raffle.id} className="gap-1 p-4">
                                    <CardHeader className="items-start gap-2 p-0">
                                        <div className="flex w-full justify-between items-center">
                                            <Badge className="border gap-1 items-center">
                                                {raffle.type === "rifa" ? (<Ticket className=" h-3 w-3" />) : raffle.type === "sorteio" ? (<Gift className=" h-3 w-3" />) : null}
                                                {raffle.type}
                                            </Badge>
                                            <Badge className="bg-green-200 text-green-800 text-xs">
                                                R${raffle.price},00
                                            </Badge>
                                        </div>

                                        <CardTitle className="text-md">
                                            {raffle.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex w-full justify-between p-0 mt-2">
                                        <div className="">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <p className="text-xs">{raffle.endDate}</p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <Users className="h-4 w-4 mr-2" />
                                                <p className="text-xs">{raffle.participants}</p>
                                            </div>
                                        </div>
                                        <Link href={`/sorteios/${raffle.id}`}>
                                            <Button size="icon" className="active:bg-green-500 ">
                                            <LogIn className="h-6 w-6"/>
                                        </Button>
                                        </Link>
                                    </CardContent>
                                    
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}