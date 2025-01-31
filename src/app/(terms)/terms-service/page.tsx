import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-4xl shadow-md border ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-600">Termos de Uso</CardTitle>
        </CardHeader>

        <CardContent className="text-muted-foreground text-base leading-relaxed tracking-wide space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">1. Introdução</h2>
            <p>
              Bem-vindo ao <strong className="text-green-500">RAFFLE</strong>! Estes Termos de Serviço regulam o uso da
              plataforma, que facilita a criação e gerenciamento de rifas online. Ao acessar ou usar nossos serviços,
              você concorda com os termos abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">2. Definições</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>RAFFLE:</strong> Plataforma digital que permite a organização de rifas.</li>
              <li><strong>Organizador:</strong> Usuário que cria e gerencia rifas dentro da plataforma.</li>
              <li><strong>Comprador:</strong> Usuário que reserva bilhetes de rifas criadas por organizadores.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">3. Uso do Sistema</h2>
            <p>O <strong className="text-green-500">RAFFLE</strong> atua apenas como intermediador para facilitar a gestão de rifas.</p>
            <p>O organizador é totalmente responsável pela entrega dos prêmios e pela legalidade das campanhas.</p>
            <p>O <strong className="text-green-500">RAFFLE</strong> não se responsabiliza por fraudes, inadimplência de organizadores ou qualquer irregularidade nas rifas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">4. Cadastro e Acesso</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>O cadastro no <strong className="text-green-500">RAFFLE</strong> é feito via autenticação Google.</li>
              <li>O organizador deve fornecer informações verdadeiras sobre sua rifa.</li>
              <li>O <strong className="text-green-500">RAFFLE</strong> pode suspender contas suspeitas ou que violem estes termos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">5. Pagamentos e Reembolsos</h2>
            <p>O organizador deve pagar <strong>R$19,90 por campanha criada</strong>.</p>
            <p className="text-red-600 font-semibold">Não há reembolso após a ativação da campanha.</p>
            <p>Caso um organizador <strong>cancele uma rifa antes do sorteio</strong>, ele deverá reembolsar diretamente os compradores.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">6. Sorteio e Resultados</h2>
            <p>O sorteio pode ser realizado dentro do sistema, utilizando um algoritmo aleatório que registra os vencedores no banco de dados.</p>
            <p>O <strong className="text-green-500">RAFFLE</strong> não audita os sorteios, ficando sob responsabilidade do organizador garantir a transparência.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">7. Medidas Contra Fraude</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Validação de pagamentos pelo organizador antes da confirmação de bilhetes.</li>
              <li>Suspensão de contas suspeitas.</li>
              <li>Canal de denúncia para casos de fraude.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">8. Cancelamento e Suspensão</h2>
            <p>O <strong className="text-green-500">RAFFLE</strong> pode suspender ou excluir contas que violem estes termos.</p>
            <p>O usuário pode excluir sua conta a qualquer momento, solicitando via e-mail.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">9. Resolução de Disputas</h2>
            <p>Quaisquer disputas devem ser resolvidas preferencialmente via suporte por e-mail.</p>
            <p>Caso necessário, o foro competente para questões jurídicas será a comarca do responsável legal pela plataforma.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-500 mb-2">10. Alterações nos Termos</h2>
            <p>O <strong className="text-green-500">RAFFLE</strong> pode atualizar estes termos periodicamente. Recomendamos que os usuários revisem as atualizações regularmente.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
