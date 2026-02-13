import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-card text-card-foreground rounded-xl shadow-xl px-8 py-10">
            <h1 className="text-2xl font-bold mb-6">Política de Privacidade</h1>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-sm">Última atualização: Janeiro de 2026</p>
              
              <p>
                Esta Política de Privacidade descreve como suas informações pessoais são coletadas, 
                usadas e compartilhadas quando você visita ou faz uma compra em nosso site.
              </p>
              
              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                1. Informações Pessoais que Coletamos
              </h2>
              <p>
                Quando você visita nosso site, coletamos automaticamente certas informações sobre seu dispositivo, 
                incluindo informações sobre seu navegador, endereço IP, fuso horário e alguns dos cookies instalados 
                em seu dispositivo. Além disso, conforme você navega pelo site, coletamos informações sobre as páginas 
                individuais ou produtos que você visualiza, quais sites ou termos de pesquisa o encaminharam ao site 
                e informações sobre como você interage com o site.
              </p>
              <p>
                Quando você faz uma compra ou tenta fazer uma compra através do site, coletamos certas informações 
                suas, incluindo seu nome, endereço de faturamento, endereço de envio, informações de pagamento, 
                endereço de e-mail e número de telefone.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                2. Cookies e Tecnologias de Rastreamento
              </h2>
              <p>
                Utilizamos cookies e tecnologias semelhantes para rastrear a atividade em nosso site e manter 
                certas informações. Cookies são arquivos com pequena quantidade de dados que podem incluir um 
                identificador exclusivo anônimo.
              </p>
              <p>
                Utilizamos os seguintes tipos de cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies necessários:</strong> Essenciais para o funcionamento do site.</li>
                <li><strong>Cookies de análise:</strong> Para entender como os visitantes interagem com o site.</li>
                <li><strong>Cookies de publicidade:</strong> Para exibir anúncios relevantes e medir a eficácia das campanhas publicitárias.</li>
              </ul>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                3. Publicidade e Remarketing
              </h2>
              <p>
                Utilizamos serviços de publicidade de terceiros, incluindo TikTok Ads, Google Ads e outras 
                plataformas de mídia social, para exibir anúncios para você após visitar nosso site. Esses 
                serviços usam cookies e tecnologias semelhantes para coletar informações sobre sua atividade 
                de navegação para fornecer publicidade direcionada.
              </p>
              <p>
                Você pode optar por não participar da publicidade direcionada visitando:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>TikTok: <a href="https://www.tiktok.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Configurações de Privacidade do TikTok</a></li>
                <li>Google: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Configurações de Anúncios do Google</a></li>
              </ul>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                4. Como Usamos Suas Informações
              </h2>
              <p>
                Usamos as informações que coletamos para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar pedidos e enviar informações sobre sua compra</li>
                <li>Comunicar com você sobre promoções e novos produtos</li>
                <li>Melhorar e otimizar nosso site</li>
                <li>Proteger contra fraudes e atividades não autorizadas</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                5. Compartilhamento de Dados
              </h2>
              <p>
                Compartilhamos suas informações pessoais com terceiros para nos ajudar a usar suas informações 
                pessoais, conforme descrito acima. Isso inclui:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provedores de pagamento para processar transações</li>
                <li>Serviços de envio para entregar seus pedidos</li>
                <li>Plataformas de publicidade para exibir anúncios relevantes</li>
                <li>Ferramentas de análise para entender o uso do site</li>
              </ul>
              <p>
                Também podemos compartilhar suas informações pessoais para cumprir leis e regulamentos aplicáveis, 
                responder a intimações, mandados de busca ou outras solicitações legais.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                6. Seus Direitos (LGPD)
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Direito de acesso às suas informações pessoais</li>
                <li>Direito de correção de dados incompletos ou desatualizados</li>
                <li>Direito de exclusão de dados pessoais</li>
                <li>Direito de portabilidade dos dados</li>
                <li>Direito de revogar consentimento a qualquer momento</li>
                <li>Direito de informação sobre compartilhamento de dados</li>
              </ul>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                7. Retenção de Dados
              </h2>
              <p>
                Manteremos suas informações pessoais pelo tempo necessário para cumprir os propósitos 
                descritos nesta política, a menos que um período de retenção mais longo seja exigido 
                ou permitido por lei.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                8. Segurança
              </h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger 
                suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                9. Menores de Idade
              </h2>
              <p>
                Nosso site não é destinado a menores de 18 anos. Não coletamos intencionalmente informações 
                pessoais de menores de idade.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                10. Alterações nesta Política
              </h2>
              <p>
                Podemos atualizar esta política de privacidade periodicamente para refletir mudanças em 
                nossas práticas ou por outros motivos operacionais, legais ou regulatórios.
              </p>

              <h2 className="text-lg font-semibold text-card-foreground mt-6">
                11. Contato
              </h2>
              <p>
                Para mais informações sobre nossas práticas de privacidade, se você tiver dúvidas ou 
                se quiser fazer uma reclamação, entre em contato conosco por e-mail em{" "}
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

export default Privacy;
