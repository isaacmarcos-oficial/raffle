import Link from "next/link";

export default function Footer () {
  return (
    <div className="bg-gray-950 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">IGNIS HUB</h3>
            <p className="text-gray-400">
              Criando soluções digitais inovadoras para seu negócio
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">ItsZap</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/itszap/privacy" className="text-gray-400 hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/itszap/terms" className="text-gray-400 hover:text-white">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400">
              contato@ignishub.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-xs">
          <p>&copy; {new Date().getFullYear()} IGNIS HUB. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
};