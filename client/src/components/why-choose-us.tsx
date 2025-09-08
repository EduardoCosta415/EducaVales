import { GraduationCap, Laptop, Award } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: GraduationCap,
      title: "Professores Qualificados",
      description: "Profissionais experientes do mercado compartilhando conhecimento prático",
    },
    {
      icon: Laptop,
      title: "Metodologia Prática",
      description: "Aprendizado baseado em projetos reais e situações do dia a dia profissional",
    },
    {
      icon: Award,
      title: "Certificação Reconhecida",
      description: "Certificados válidos em todo território nacional com reconhecimento no mercado",
    },
  ];

  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-educavales-primary mb-4">
            Por que fazer cursos conosco?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Na Educavales Tec, oferecemos educação de qualidade com foco na prática profissional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="text-center p-6 animate-slide-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-educavales-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <reason.icon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-educavales-primary mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
