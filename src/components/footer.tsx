import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center">
      <div className="flex md:flex-row flex-col gap-2 w-full max-w-[1100px] items-center justify-between">
        <p className="text-xs ">© 2024 <span className="font-bold text-green-500">RaffleHub</span>. All rights reserved by <Link href="https://ignishub.com.br" target="_blank" className="text-green-500 font-bold hover:underline">IGNIS HUB</Link>.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terms-service">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/policy-privacy">
            Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
};