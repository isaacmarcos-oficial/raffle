import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-4xl shadow-md border ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-600">Política de Privacidade</CardTitle>
        </CardHeader>

        <CardContent className="text-muted-foreground text-base leading-relaxed tracking-wide space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">1. Introdução</h2>
            <p>
              Esta Política de Privacidade explica como o <strong className="text-green-500">RAFFLE</strong> coleta, usa e protege os dados dos usuários, 
              em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">2. Dados Coletados</h2>

            <h3 className="text-xl font-semibold text-green-500 mt-4">2.1. Dados Pessoais</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome completo do comprador.</li>
              <li>Telefone (WhatsApp).</li>
              <li>Nome do destinatário (opcional).</li>
              <li>Dados de login do organizador (Google OAuth).</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-500 mt-4">2.2. Dados de Transação</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Valor pago e forma de pagamento.</li>
              <li>Comprovantes de pagamento (quando aplicável).</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-500 mt-4">2.3. Dados de Sorteio</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Números adquiridos e identificação dos ganhadores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">3. Como os Dados São Utilizados</h2>
            <p>Os dados são coletados para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Criar e gerenciar rifas.</li>
              <li>Processar pagamentos.</li>
              <li>Informar os ganhadores dos sorteios.</li>
              <li>Melhorar a experiência dos usuários.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">4. Compartilhamento de Dados</h2>
            <p>O <strong className="text-green-500">RAFFLE</strong> não compartilha dados pessoais com terceiros, incluindo provedores de pagamento.</p>
            <p>Os dados são armazenados em servidores seguros (Vercel e Cloudinary).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">5. Direitos dos Usuários</h2>
            <p>Conforme a LGPD, os usuários têm direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acessar seus dados armazenados.</li>
              <li>Corrigir informações incorretas.</li>
              <li>Solicitar a exclusão da conta e dos dados associados.</li>
            </ul>
            <p>Solicitações podem ser feitas via e-mail do suporte.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">6. Armazenamento e Exclusão de Dados</h2>
            <p>Os dados são armazenados enquanto durar o cadastro.</p>
            <p>Ao excluir a conta, os dados são removidos em até <strong className="text-red-500">30 dias</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">7. Segurança das Informações</h2>
            <p>Os dados são protegidos com medidas técnicas para evitar acessos indevidos.</p>
            <p>O usuário deve manter sua conta segura e não compartilhar credenciais.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">8. Alterações na Política de Privacidade</h2>
            <p>Esta Política pode ser atualizada periodicamente. Recomendamos revisar eventuais mudanças.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">9. Contato e Suporte</h2>
            <p>Caso tenha dúvidas ou precise exercer seus direitos, entre em contato pelo nosso suporte via e-mail.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
