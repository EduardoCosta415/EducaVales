// Componente que exibe os parceiros da Educavales Tec
export function Partners() {
  // Array com dados dos parceiros da empresa
  const partners = [
    {
      name: "Prefeitura de Coronel Fabriciano", // Nome do parceiro
      logo: "/prefeitura.png" , // URL do logo
      description: "Prefeitura de Coronel Fabriciano" // Descrição da parceria
    },
    {
      name: "Colegio São Francisco Xavier",
      logo: "csfx.jpg",
      description: "Fundação São Francisco Xavier "
    },
   
  ];

  return (
    // Seção de parceiros com fundo cinza claro
    <section className="py-16 bg-neutral">
      {/* Container principal com largura máxima e padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção com título e descrição */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-educavales-primary mb-4">
            Nossos Parceiros
          </h2>
          <p className="text-gray-600 text-lg">
            Trabalhamos com as melhores empresas do mercado
          </p>
        </div>

        {/* Grid responsivo: 2 colunas em mobile, 4 em desktop */}
      <div className="flex justify-center gap-8 flex-wrap">
          {/* Mapeia cada parceiro criando um card */}
          {partners.map((partner, index) => (
            <div
              key={index} // Chave única para cada parceiro
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }} // Animação escalonada baseada no índice
            >
              {/* Logo do parceiro com efeito hover */}
              <img
                src={partner.logo} // URL do logo
                alt={partner.name} // Texto alternativo para acessibilidade
                className="h-12 w-auto object-contain mb-3 filter grayscale hover:grayscale-0 transition-all" // Inicia em cinza, fica colorido no hover
              />
              {/* Descrição da parceria */}
              <p className="text-sm text-gray-600 text-center">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}