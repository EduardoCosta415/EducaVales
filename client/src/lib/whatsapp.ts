// Número do WhatsApp da Educavales Tec para receber contatos
export const WHATSAPP_NUMBER = "5531972608298";

// Áreas de cursos disponíveis (adicionado conforme solicitado)
export const COURSE_AREAS = [
  "Administração",
  "Informática",
  "Design Gráfico",
  "Enfermagem",
  "Eletricista",
  "Cabeleireiro",
  "Manicure e Pedicure",
  "Cozinheiro Profissional",
];

// Função principal que abre o WhatsApp com uma mensagem pré-definida
export function sendWhatsAppMessage(message: string) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
}

// Função para enviar interesse em um curso específico (mantida igual)
export function sendCourseInterest(courseName: string) {
  const message = `Olá! Tenho interesse no curso de ${courseName} da Educavales Tec. Gostaria de mais informações sobre cronograma, valor e inscrições.`;
  sendWhatsAppMessage(message);
}

// Função para enviar inscrição (agora aceita nome do aluno opcional)
export function sendCourseEnrollment(courseName: string, studentName?: string) {
  const message = studentName
    ? `Olá! Meu nome é ${studentName} e gostaria de me inscrever no curso de ${courseName}. Podem me enviar informações sobre valores e matrícula?`
    : `Olá! Gostaria de me inscrever no curso de ${courseName}. Podem me enviar informações sobre valores e matrícula?`;
  sendWhatsAppMessage(message);
}

// Função para contato geral (mantida igual)
export function sendGeneralContact() {
  const message = "Olá! Gostaria de mais informações sobre os cursos da Educavales Tec.";
  sendWhatsAppMessage(message);
}