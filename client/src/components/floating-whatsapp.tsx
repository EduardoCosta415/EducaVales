import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export function FloatingWhatsApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const interestArea = "Cursos Técnicos";
  
  const courses = [
    "Tecnico em Marketing",
    "Segurança do Trabalho",
    "Logistica",
    "Transações Imobiliarias",
    "Enfermagem"
  ];

  const handleSubmit = () => {
    if (name && course) {
      const message = `Olá, meu nome é ${name}. Tenho interesse em ${interestArea}, especificamente no curso de ${course}.`;
      window.open(`https://wa.me/5531972608298?text=${encodeURIComponent(message)}`, '_blank');
      setIsModalOpen(false);
      setName("");
      setCourse("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-educavales-whatsapp hover:bg-educavales-whatsapp/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-bounce"
        aria-label="Contato via WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Enviar mensagem</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-whatsapp"
                  placeholder="Digite seu nome"
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                  Área de interesse
                </label>
                <input
                  type="text"
                  id="interest"
                  value={interestArea}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Curso desejado
                </label>
                <select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-educavales-whatsapp"
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((courseOption, index) => (
                    <option key={index} value={courseOption}>{courseOption}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!name || !course}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${!name || !course ? 'bg-gray-400 cursor-not-allowed' : 'bg-educavales-whatsapp hover:bg-educavales-whatsapp/90'}`}
              >
                Enviar para WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}