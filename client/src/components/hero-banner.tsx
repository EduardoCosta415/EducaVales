import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const scrollToCourses = () => {
    const element = document.querySelector("#cursos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
   <section id="inicio" className="relative">
  <div
    className="relative w-full aspect-[16/9] bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/tecvale.jpg')",
    }}
  >
    {/* 🔳 Overlay escuro acima da imagem */}
    <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

    {/* 🧱 Conteúdo centralizado */}
    <div className="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
      <div className="text-center text-white animate-fade-in max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Transforme seu <span className="text-educavales-secondary">Futuro</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Cursos profissionalizantes de qualidade para impulsionar sua carreira
        </p>
        <Button
          onClick={scrollToCourses}
          className="bg-educavales-secondary hover:bg-educavales-secondary/90 text-white px-8 py-3 text-lg font-semibold"
        >
          Conheça nossos cursos
        </Button>
      </div>
    </div>
  </div>
</section>
  );
}
