// Importa hooks do React para gerenciar estado e efeitos colaterais
import { useState, useEffect } from "react";
// Importa hook do TanStack Query para busca de dados com cache
import { useQuery } from "@tanstack/react-query";
// Importa componentes de interface do usuário
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Importa ícone de busca da biblioteca Lucide
import { Search } from "lucide-react";
// Importa ícone do WhatsApp da biblioteca React Icons
import { FaWhatsapp } from "react-icons/fa";
// Importa função para enviar interesse em curso via WhatsApp
import { sendCourseInterest } from "@/lib/whatsapp";
// Importa tipo TypeScript para curso
import type { Course } from "@shared/schema";

// Componente de busca de cursos com integração ao WhatsApp
export function CourseSearch() {
  // Estado para armazenar o termo de busca digitado pelo usuário
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para armazenar o curso selecionado (primeiro resultado da busca)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Query para buscar cursos baseado no termo de busca
  const { data: searchResults } = useQuery<Course[]>({
    queryKey: ["/api/courses/search", searchTerm], // Chave única para cache
    enabled: searchTerm.length > 0, // Só executa busca se há texto digitado
    queryFn: async () => {
      // Faz requisição para API de busca, codificando o termo para URL
      const response = await fetch(`/api/courses/search/${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Failed to search courses"); // Trata erros HTTP
      return response.json(); // Retorna dados em JSON
    },
  });

  // Efeito que roda quando os resultados da busca mudam
  useEffect(() => {
    // Se há resultados e há termo de busca, seleciona o primeiro curso
    if (searchResults && searchResults.length > 0 && searchTerm.length > 0) {
      setSelectedCourse(searchResults[0]);
    } else {
      // Caso contrário, limpa a seleção
      setSelectedCourse(null);
    }
  }, [searchResults, searchTerm]); // Dependências: re-executa quando qualquer uma muda

  // Função para atualizar o termo de busca
  const handleSearch = (value: string) => {
    setSearchTerm(value); // Atualiza estado com novo valor
    if (value.length === 0) {
      setSelectedCourse(null); // Limpa seleção se busca foi apagada
    }
  };

  // Função para enviar interesse no curso selecionado via WhatsApp
  const handleWhatsAppContact = () => {
    if (selectedCourse) {
      sendCourseInterest(selectedCourse.name); // Chama função com nome do curso
    }
  };

  return (
    // Seção principal de busca com fundo cinza claro
    <section className="py-16 bg-neutral">
      {/* Container principal com largura máxima e padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção com título e descrição */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-educavales-primary mb-4">
            Encontre o Curso Ideal
          </h2>
          <p className="text-gray-600 text-lg">
            Pesquise entre nossos cursos profissionalizantes
          </p>
        </div>

        {/* Container do input de busca com largura limitada */}
        <div className="max-w-2xl mx-auto">
          {/* Container do campo de busca com ícone */}
          <div className="relative">
            <Input
              type="text" // Campo de texto
              placeholder="Digite o nome do curso que você procura..." // Texto de ajuda
              value={searchTerm} // Valor controlado pelo estado
              onChange={(e) => handleSearch(e.target.value)} // Atualiza busca a cada digitação
              className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-educavales-secondary focus:border-educavales-secondary text-lg"
            />
            {/* Ícone de busca posicionado dentro do campo */}
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Card de curso selecionado e botão WhatsApp (aparece apenas quando há seleção) */}
          {selectedCourse && (
            <div className="mt-4 animate-fade-in">
              <Card>
                <CardContent className="p-4">
                  {/* Layout responsivo: coluna em mobile, linha em desktop */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Informações do curso selecionado */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Curso selecionado:</p>
                      <p className="font-semibold text-educavales-primary">
                        {selectedCourse.name} {/* Nome do curso */}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedCourse.description} {/* Descrição do curso */}
                      </p>
                    </div>
                    {/* Botão para enviar interesse via WhatsApp */}
                    <Button
                      onClick={handleWhatsAppContact} // Chama função de contato
                      className="bg-educavales-whatsapp hover:bg-educavales-whatsapp/90 text-white px-6 py-2 font-medium flex items-center gap-2"
                    >
                      <FaWhatsapp className="w-4 h-4" /> {/* Ícone WhatsApp */}
                      Tenho interesse neste curso! {/* Texto do botão */}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
