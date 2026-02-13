import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-card text-card-foreground rounded-xl shadow-xl px-8 py-10">
            <h1 className="text-2xl font-bold mb-6">Termos de Uso</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-sm">Última atualização: Janeiro de 2026</p>
              
              <p>
                Ao acessar e utilizar este site, você concorda com os seguintes 
                termos e condições. Leia-os atentamente antes de utilizar nossos serviços.
              </p>
              
              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar ou usar nosso site, você concorda em estar vinculado a estes Termos de Uso 
                e nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, 
                não deverá acessar o site.
              </p>
              
              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                2. Uso do Site
              </h2>
              <p>
                Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os 
                direitos de terceiros ou restrinja ou iniba o uso e aproveitamento do site por qualquer 
                pessoa. Isso inclui:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Não usar o site para fins fraudulentos</li>
                <li>Não tentar obter acesso não autorizado ao site</li>
                <li>Não transmitir vírus ou códigos maliciosos</li>
                <li>Fornecer informações verdadeiras e precisas</li>
              </ul>
              
              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                3. Produtos e Serviços
              </h2>
              <p>
                Os produtos e serviços oferecidos em nosso site estão sujeitos à disponibilidade. 
                Reservamo-nos o direito de limitar quantidades de compra e recusar pedidos a nosso 
                critério.
              </p>
              <p>
                Fazemos todos os esforços para exibir com precisão as cores e imagens dos produtos. 
                No entanto, não garantimos que a exibição de qualquer cor no monitor do seu computador 
                será precisa.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                4. Preços e Pagamentos
              </h2>
              <p>
                Os preços dos produtos estão sujeitos a alterações sem aviso prévio. Reservamo-nos o 
                direito de corrigir erros de precificação. O pagamento deve ser efetuado no momento 
                da compra através dos métodos de pagamento disponíveis.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                5. Envio e Entrega
              </h2>
              <p>
                Os prazos de entrega são estimativas e podem variar dependendo da localização e 
                disponibilidade. Não nos responsabilizamos por atrasos causados por transportadoras 
                ou circunstâncias fora de nosso controle.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                6. Devoluções e Reembolsos
              </h2>
              <p>
                Aceitamos devoluções dentro de 7 dias após o recebimento do produto, conforme o 
                Código de Defesa do Consumidor. O produto deve estar em condições originais, sem 
                uso e com todas as etiquetas e embalagens intactas.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                7. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens, vídeos 
                e software, é de nossa propriedade ou licenciado para nós e está protegido por leis 
                de direitos autorais e propriedade intelectual.
              </p>
              <p>
                Você não pode reproduzir, distribuir, modificar, exibir publicamente ou criar obras 
                derivadas de qualquer conteúdo sem nossa autorização prévia por escrito.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                8. Limitação de Responsabilidade
              </h2>
              <p>
                Em nenhum caso seremos responsáveis por quaisquer danos diretos, indiretos, 
                incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou 
                incapacidade de usar o site ou produtos adquiridos.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                9. Indenização
              </h2>
              <p>
                Você concorda em nos indenizar e isentar de responsabilidade por quaisquer 
                reclamações, perdas, responsabilidades, danos, custos ou despesas decorrentes 
                de sua violação destes termos ou uso do site.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                10. Links para Sites de Terceiros
              </h2>
              <p>
                Nosso site pode conter links para sites de terceiros. Não temos controle sobre 
                o conteúdo desses sites e não somos responsáveis por suas práticas de privacidade 
                ou conteúdo.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                11. Alterações nos Termos
              </h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações 
                entrarão em vigor imediatamente após sua publicação no site. O uso continuado do 
                site após tais alterações constitui sua aceitação dos novos termos.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                12. Lei Aplicável
              </h2>
              <p>
                Estes termos são regidos e interpretados de acordo com as leis da República 
                Federativa do Brasil. Qualquer disputa será submetida à jurisdição exclusiva 
                dos tribunais brasileiros.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                13. Contato
              </h2>
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco em{" "}
                <a href="mailto:contato@exemplo.com.br" className="text-primary hover:underline">
                  contato@exemplo.com.br
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
