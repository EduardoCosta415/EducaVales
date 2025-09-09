// Importa hook useState do React para gerenciar estado local
import { useState, useEffect } from "react";
// Importa componente Button personalizado da biblioteca de UI
import { Button } from "@/components/ui/button";
// Importa componentes para criar menu lateral em dispositivos móveis
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Importa ícone de menu hambúrguer da biblioteca Lucide
import { Menu } from "lucide-react";
// Importa ícones
import { FaWhatsapp, FaEnvelope, FaTimes, FaGraduationCap } from "react-icons/fa";
// Importa função para enviar contato geral via WhatsApp
import { sendGeneralContact } from "@/lib/whatsapp";

// Componente principal de navegação do site
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const emailData = useState({
    from: "",
    to: "contato@educavalestec.com.br", // Email padrão de destino
    subject: "Contato via Site",
    message: ""
  });
  const whatsappData = useState({
    name: "",
    course: ""
  });

  const navItems = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#cursos", label: "Cursos" },
    { href: "#depoimentos", label: "Depoimentos" },
  ];

  const courses = [
    "Logistica",
    "Segurança do Trabalho",
    "Transações Imobiliarias",
    "Enfermagem",
    "Técnico em Marketing"
  ];

  // Efeito para detectar scroll e mudança de seção
  useEffect(() => {
    const handleScroll = () => {
      // Verifica se a página foi scrollada
      setIsScrolled(window.scrollY > 10);
      
      // Atualiza a seção ativa com base no scroll
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 80;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i].offsetTop) {
          setActiveSection(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (emailData[0].from && emailData[0].message) {
      try {
        const response = await fetch("http://localhost:3001/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData[0])
        });

        if (response.ok) {
          alert("Email enviado com sucesso!");
          setIsEmailModalOpen(false);
          emailData[1]({
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
    if (!whatsappData[0].name || !whatsappData[0].course) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Número de telefone 
    const phoneNumber = '5531972608298';
    
    // Mensagem personalizada
    const message = `Olá! Meu nome é ${whatsappData[0].name} e tenho interesse no curso de ${whatsappData[0].course}. Gostaria de mais informações.`;
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Gerar o link do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir o WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fechar o modal
    setIsWhatsAppModalOpen(false);
    
    // Limpar os dados
    whatsappData[1]({
      name: "",
      course: ""
    });
  };

  return (
    // Barra de navegação fixa no topo com transição suave ao scrollar
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-1' : 'shadow-sm py-2'}`}>
      {/* Container principal com largura máxima e padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flexbox para organizar logo, menu e botão de contato */}
        <div className="flex justify-between items-center h-16">
          {/* Logo da empresa */}
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-educavales-primary flex items-center">
              <FaGraduationCap className="mr-2" />
              Educavales<span className="text-educavales-secondary">Tec</span>
            </h1>
          </div>

          {/* Menu de navegação para desktop (oculto em mobile) */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors tracking-wide relative
                    ${activeSection === item.href 
                      ? 'text-educavales-secondary font-semibold' 
                      : 'text-educavales-primary hover:text-educavales-secondary'}`}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-educavales-secondary"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Botões de contato */}
          <div className="flex items-center gap-2">
            {/* Botão de WhatsApp */}
            <Button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="bg-educavales-whatsapp hover:bg-educavales-whatsapp/90 text-white px-3 py-2 text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 transition-colors shadow-md hover:shadow-lg"
              size="sm"
            >
              <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">MATRICULE-SE</span>
              <span className="sm:hidden">MATRÍCULA</span>
            </Button>

            {/* Botão de Email (apenas desktop) */}
         
            {/* Menu hambúrguer para dispositivos móveis */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="lg:hidden ml-2 text-educavales-primary hover:text-educavales-secondary hover:bg-gray-100 p-2"
                  size="icon"
                >
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-educavales-primary">Menu</h2>
                    <Button
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                      className="p-1 h-auto text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes className="w-5 h-5" />
                      <span className="sr-only">Fechar menu</span>
                    </Button>
                  </div>
                  
                  <div className="flex-1 py-6 space-y-2">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full text-left px-4 py-3 text-base font-medium transition-colors rounded-md mx-2
                          ${activeSection === item.href 
                            ? 'bg-educavales-primary/10 text-educavales-secondary' 
                            : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t">
                    <Button
                      onClick={() => setIsEmailModalOpen(true)}
                      variant="outline"
                      className="w-full justify-center gap-2 mb-3 border-educavales-primary text-educavales-primary hover:bg-educavales-primary hover:text-white"
                    >
                      <FaEnvelope className="w-4 h-4" />
                      Contato por Email
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Modal de Email */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Enviar Email</h3>
              <button 
                onClick={() => setIsEmailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
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
                  value={emailData[0].from}
                  onChange={(e) => emailData[1]({...emailData[0], from: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary focus:border-transparent"
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
                  value={emailData[0].to}
                  onChange={(e) => emailData[1]({...emailData[0], to: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={emailData[0].subject}
                  onChange={(e) => emailData[1]({...emailData[0], subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={emailData[0].message}
                  onChange={(e) => emailData[1]({...emailData[0], message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary focus:border-transparent"
                  rows={4}
                  placeholder="Digite sua mensagem aqui..."
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEmailSubmit}
                  disabled={!emailData[0].from || !emailData[0].message}
                  className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors ${!emailData[0].from || !emailData[0].message ? 'bg-gray-400 cursor-not-allowed' : 'bg-educavales-primary hover:bg-educavales-primary/90'}`}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de WhatsApp */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Entre em Contato</h3>
              <button 
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
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
                  value={whatsappData[0].name}
                  onChange={(e) => whatsappData[1]({...whatsappData[0], name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary focus:border-transparent"
                  placeholder="Digite seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Selecione o curso de interesse
                </label>
                <select
                  id="course"
                  value={whatsappData[0].course}
                  onChange={(e) => whatsappData[1]({...whatsappData[0], course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-primary focus:border-transparent"
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleWhatsAppSubmit}
                  disabled={!whatsappData[0].name || !whatsappData[0].course}
                  className={`flex-1 py-2 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-colors ${!whatsappData[0].name || !whatsappData[0].course ? 'bg-gray-400 cursor-not-allowed' : 'bg-educavales-whatsapp hover:bg-educavales-whatsapp/90'}`}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}