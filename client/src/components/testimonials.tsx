import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      course: "Técnico em Marketing",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      text: "O curso de Marketing Digital da Educavales Tec mudou minha carreira completamente. Hoje trabalho como freelancer e tripliquei minha renda!",
    },
    {
      name: "João Santos",
      course: "Logistica",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      text: "Professores excelentes e metodologia prática. Em 6 meses já estava trabalhando como desenvolvedor junior. Recomendo muito!",
    },
    {
      name: "Ana Costa",
      course: "Segurança do Trabalho",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      text: "O certificado da Educavales Tec foi fundamental para minha promoção. A qualidade do ensino é incomparável!",
    },
  ];

  return (
    <section id="depoimentos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-educavales-primary mb-4">
            O que nossos alunos dizem
          </h2>
          <p className="text-gray-600 text-lg">
            Histórias reais de transformação profissional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-neutral p-6 animate-slide-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-educavales-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.course}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <div className="flex text-educavales-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
