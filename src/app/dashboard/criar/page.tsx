import { CreateRaffleForm } from "./_components/createRafleForm";

export default function CampaignCreate() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col w-full max-w-[800px] p-4 lg:px-0">
        <h1 className="text-2xl font-bold">Criar nova campanha</h1>
        <div className="">
          <CreateRaffleForm />
        </div>
      </div>
    </div>
  )
}