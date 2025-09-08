// Importa hook useState do React para gerenciar estado local
import { useState } from "react";
// Importa componente Button personalizado da biblioteca de UI
import { Button } from "@/components/ui/button";
// Importa componentes para criar menu lateral em dispositivos móveis
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Importa ícone de menu hambúrguer da biblioteca Lucide
import { Menu } from "lucide-react";
// Importa ícones
import { FaWhatsapp, FaEnvelope, FaTimes } from "react-icons/fa";
// Importa função para enviar contato geral via WhatsApp
import { sendGeneralContact } from "@/lib/whatsapp";

// Componente principal de navegação do site
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [emailData, setEmailData] = useState({
    from: "",
    to: "contato@educavalestec.com.br", // Email padrão de destino
    subject: "Contato via Site",
    message: ""
  });
  const [whatsappData, setWhatsappData] = useState({
    name: "",
    course: ""
  });

  const navItems = [
    { href: "#inicio", label: "Início" },
    { href: "#cursos", label: "Cursos" },
    { href: "#sobre", label: "Sobre" },
    { href: "#depoimentos", label: "Depoimentos" },
  ];

  const courses = [
    "Logistica",
    "Segurança do Trabalho",
    "Transações Imobiliarias",
    "Enfermagem",
    "Técnico em Marketing"
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (emailData.from && emailData.message) {
      try {
        const response = await fetch("http://localhost:3001/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData)
        });

        if (response.ok) {
          alert("Email enviado com sucesso!");
          setIsEmailModalOpen(false);
          setEmailData({
            from: "",
            to: "eduardocosta4155@gmail.com",
            subject: "",
            message: ""
          });
        } else {
          alert("Erro ao enviar email. Tente novamente mais tarde.");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor.");
      }
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!whatsappData.name || !whatsappData.course) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Número de telefone (substitua pelo número desejado)
    const phoneNumber = '5531972608298';
    
    // Mensagem personalizada
    const message = `Olá! Meu nome é ${whatsappData.name} e tenho interesse no curso de ${whatsappData.course}. Gostaria de mais informações.`;
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Gerar o link do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir o WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fechar o modal
    setIsWhatsAppModalOpen(false);
    
    // Limpar os dados
    setWhatsappData({
      name: "",
      course: ""
    });
  };

  return (
    // Barra de navegação fixa no topo com sombra e borda
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Container principal com largura máxima e padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flexbox para organizar logo, menu e botão de contato */}
        <div className="flex justify-between items-center h-16">
          {/* Logo da empresa */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-educavales-primary">
              Educavales<span className="text-educavales-secondary">Tec</span>
            </h1>
          </div>

          {/* Menu de navegação para desktop (oculto em mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-educavales-primary hover:text-educavales-secondary px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botões de contato */}
          <div className="flex items-center gap-2">
            {/* Botão de WhatsApp */}
            <Button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="bg-educavales-whatsapp hover:bg-educavales-whatsapp/90 text-white px-4 py-2 text-sm font-medium flex items-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4" />
              Matricule-se
            </Button>

            {/* Menu hambúrguer para dispositivos móveis */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden ml-4 text-educavales-primary hover:text-educavales-secondary"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-educavales-primary hover:text-educavales-secondary text-left px-3 py-2 text-base font-medium transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Modal de Email */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Enviar Email</h3>
              <button 
                onClick={() => setIsEmailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                  Seu email
                </label>
                <input
                  type="email"
                  id="from"
                  value={emailData.from}
                  onChange={(e) => setEmailData({...emailData, from: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                  Para
                </label>
                <input
                  type="email"
                  id="to"
                  value={emailData.to}
                  onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary"
                  rows={4}
                  placeholder="Digite sua mensagem aqui..."
                />
              </div>
              
              <button
                onClick={handleEmailSubmit}
                disabled={!emailData.from || !emailData.message}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${!emailData.from || !emailData.message ? 'bg-gray-400 cursor-not-allowed' : 'bg-educavales-primary hover:bg-educavales-primary/90'}`}
              >
                Enviar Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de WhatsApp */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Entre em Contato</h3>
              <button 
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={whatsappData.name}
                  onChange={(e) => setWhatsappData({...whatsappData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary"
                  placeholder="Digite seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Selecione o curso de interesse
                </label>
                <select
                  id="course"
                  value={whatsappData.course}
                  onChange={(e) => setWhatsappData({...whatsappData, course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary"
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleWhatsAppSubmit}
                disabled={!whatsappData.name || !whatsappData.course}
                className={`w-full py-2 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2 ${!whatsappData.name || !whatsappData.course ? 'bg-gray-400 cursor-not-allowed' : 'bg-educavales-whatsapp hover:bg-educavales-whatsapp/90'}`}
              >
                <FaWhatsapp className="w-4 h-4" />
                Enviar para WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}