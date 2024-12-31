import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { RaffleTable } from "./_components/rafflesTable";

export default function Dashboard() {
  return (
    <div className="flex w-full items-center justify-center">
      <main className="flex-1 py-6 px-4 min-h-screen max-w-[900px]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold ">Dashboard</h1>
            <Button asChild>
              <Link href="/create">
                <Plus className="mr-2 h-4 w-4" /> Criar Nova Rifa
              </Link>
            </Button>
          </div>
          <div>
            <RaffleTable />
          </div>
        </div>
      </main>
    </div>
  )
}