import { MapPin, Phone, Mail, X } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("privacy");

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <footer className="bg-educavales-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Educavales<span className="text-educavales-secondary">Tec</span>
              </h3>
              <p className="text-gray-300 mb-4">
                Transformando vidas através da educação profissionalizante de qualidade.
                Há mais de 10 anos formando profissionais capacitados para o mercado de trabalho.
              </p>
              <div className="flex space-x-4">
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p>Rua Luiz Rodrigues dos Santos, nº 44</p>
                    <p>Todos os Santos</p>
                    <p>Coronel Fabriciano - Minas Gerais</p>
                    <p>CEP: 35170-061</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <p>(31) 97260-8298 </p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <p>contato@educavalestec.com.br</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Links Úteis</h4>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("privacy")}
                  className="block text-gray-300 hover:text-educavales-secondary transition-colors text-left w-full"
                >
                  Política de Privacidade
                </button>
                <button
                  onClick={() => openModal("terms")}
                  className="block text-gray-300 hover:text-educavales-secondary transition-colors text-left w-full"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; 2024 Educavales Tec. Todos os direitos reservados. | CNPJ:
              12.345.678/0001-90
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-800">
                {modalContent === "privacy" ? "Política de Privacidade" : "Termos de Uso"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 text-gray-700">
              {modalContent === "privacy" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Política de Privacidade da EducavalesTec</h3>
                  <p className="text-sm">Última atualização: 01 de Janeiro de 2024</p>
                  
                  <h4 className="font-medium mt-4">1. Introdução</h4>
                  <p>
                    A EducavalesTec ("nós", "nossa" ou "nos") valoriza a privacidade de seus usuários ("você" ou "usuário"). 
                    Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos suas informações 
                    pessoais quando você utiliza nossos serviços.
                  </p>
                  
                  <h4 className="font-medium mt-4">2. Informações que Coletamos</h4>
                  <p>Coletamos informações que você nos fornece diretamente, incluindo:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Número de telefone</li>
                    <li>Endereço residencial</li>
                    <li>Informações de pagamento</li>
                    <li>Dados acadêmicos e profissionais</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">3. Como Utilizamos suas Informações</h4>
                  <p>Utilizamos suas informações para:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Fornecer, operar e manter nossos serviços</li>
                    <li>Processar matrículas e pagamentos</li>
                    <li>Comunicar-nos com você sobre cursos, atualizações e promoções</li>
                    <li>Personalizar e melhorar sua experiência</li>
                    <li>Cumprir obrigações legais</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">4. Compartilhamento de Informações</h4>
                  <p>
                    Não vendemos, alugamos ou comercializamos suas informações pessoais para terceiros. 
                    Podemos compartilhar suas informações com:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Prestadores de serviços que nos auxiliam em nossas operações</li>
                    <li>Autoridades competentes, quando exigido por lei</li>
                    <li>Parceiros educacionais, com seu consentimento</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">5. Seus Direitos</h4>
                  <p>Você tem o direito de:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Acessar suas informações pessoais</li>
                    <li>Corrigir informações inexatas</li>
                    <li>Solicitar a exclusão de seus dados</li>
                    <li>Opor-se ao processamento de suas informações</li>
                    <li>Solicitar a portabilidade de dados</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">6. Segurança de Dados</h4>
                  <p>
                    Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações 
                    contra acesso não autorizado, alteração, divulgação ou destruição.
                  </p>
                  
                  <h4 className="font-medium mt-4">7. Alterações nesta Política</h4>
                  <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
                    quaisquer alterações significativas através do e-mail cadastrado ou por meio de aviso em nosso site.
                  </p>
                  
                  <h4 className="font-medium mt-4">8. Contato</h4>
                  <p>
                    Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através 
                    do e-mail: contato@educavalestec.com.br
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Termos de Uso da EducavalesTec</h3>
                  <p className="text-sm">Última atualização: 01 de Janeiro de 2024</p>
                  
                  <h4 className="font-medium mt-4">1. Aceitação dos Termos</h4>
                  <p>
                    Ao acessar e utilizar os serviços da EducavalesTec, você concorda em cumprir e estar 
                    vinculado a estes Termos de Uso. Se você não concordar com estes termos, não utilize nossos serviços.
                  </p>
                  
                  <h4 className="font-medium mt-4">2. Serviços Oferecidos</h4>
                  <p>
                    A EducavalesTec oferece cursos profissionalizantes, treinamentos e serviços educacionais 
                    através de modalidades presenciais e online.
                  </p>
                  
                  <h4 className="font-medium mt-4">3. Matrícula e Pagamento</h4>
                  <p>
                    A matrícula em nossos cursos está sujeita à disponibilidade de vagas e ao pagamento 
                    integral ou parcelado das taxas estabelecidas. Reservamo-nos o direito de recusar 
                    matrículas sem justificativa prévia.
                  </p>
                  
                  <h4 className="font-medium mt-4">4. Propriedade Intelectual</h4>
                  <p>
                    Todo o conteúdo disponibilizado pela EducavalesTec, incluindo materiais didáticos, 
                    vídeos, textos e software, é de nossa propriedade ou de nossos licenciantes e está 
                    protegido por leis de direitos autorais.
                  </p>
                  
                  <h4 className="font-medium mt-4">5. Conduta do Usuário</h4>
                  <p>Você concorda em não:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Utilizar nossos serviços para fins ilegais ou não autorizados</li>
                    <li>Reproduzir, distribuir ou modificar nosso conteúdo sem autorização</li>
                    <li>Perturbar ou interferir na segurança ou funcionamento de nossos serviços</li>
                    <li>Utilizar dados de outros usuários sem consentimento</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">6. Limitação de Responsabilidade</h4>
                  <p>
                    A EducavalesTec não se responsabiliza por danos diretos, indiretos, incidentais ou 
                    consequenciais resultantes do uso ou incapacidade de uso de nossos serviços.
                  </p>
                  
                  <h4 className="font-medium mt-4">7. Cancelamento e Reembolso</h4>
                  <p>
                    As políticas de cancelamento e reembolso variam conforme o curso contratado. 
                    Consulte o contrato específico para obter informações detalhadas.
                  </p>
                  
                  <h4 className="font-medium mt-4">8. Alterações nos Termos</h4>
                  <p>
                    Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                    Alterações significativas serão notificadas através de nossos canais oficiais.
                  </p>
                  
                  <h4 className="font-medium mt-4">9. Lei Aplicável</h4>
                  <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil e quaisquer 
                    disputas serão resolvidas no foro da comarca de Coronel Fabriciano, Minas Gerais.
                  </p>
                  
                  <h4 className="font-medium mt-4">10. Contato</h4>
                  <p>
                    Para questions relacionadas a estes Termos de Uso, entre em contato conosco através 
                    do e-mail: contato@educavalestec.com.br
                  </p>
                </div>
              )}
            </div>
            <div className="p-6 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="bg-educavales-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}