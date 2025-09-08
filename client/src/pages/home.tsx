// Importa todos os componentes necessários para a página inicial
import { Navigation } from "@/components/navigation"; // Barra de navegação superior
import { HeroBanner } from "@/components/hero-banner"; // Banner principal com call-to-action
import { CourseSearch } from "@/components/course-search"; // Campo de busca de cursos
import { WhyChooseUs } from "@/components/why-choose-us"; // Seção "Por que escolher"
import { CourseCarousel } from "@/components/course-carousel"; // Carrossel de cursos
import { Testimonials } from "@/components/testimonials"; // Depoimentos de alunos
import { Partners } from "@/components/partners"; // Seção de parceiros
import { Footer } from "@/components/footer"; // Rodapé da página
import { FloatingWhatsApp } from "@/components/floating-whatsapp"; // Botão flutuante WhatsApp

// Componente principal da página inicial
export default function Home() {
  return (
    // Container principal com altura mínima da tela e fundo branco
    <div className="min-h-screen bg-white">
      {/* Componente de navegação fixo no topo */}
      <Navigation />
      {/* Banner principal com imagem de fundo e chamada para ação */}
      <HeroBanner />
      {/* Seção de busca de cursos com integração WhatsApp */}
      <CourseSearch />
      {/* Seção explicando motivos para escolher a Educavales Tec */}
      <WhyChooseUs />
      {/* Carrossel mostrando todos os cursos disponíveis */}
      <CourseCarousel />
      {/* Seção com depoimentos de ex-alunos */}
      <Testimonials />
      {/* Seção mostrando parceiros da empresa */}
      <Partners />
      {/* Rodapé com informações de contato e links úteis */}
      <Footer />
      {/* Botão flutuante de WhatsApp sempre visível */}
      <FloatingWhatsApp />
    </div>
  );
}
