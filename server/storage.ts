// Importa tipos de dados das tabelas definidas no schema compartilhado
import { users, courses, type User, type InsertUser, type Course, type InsertCourse } from "@shared/schema";

// Interface que define os métodos de armazenamento de dados
export interface IStorage {
  getUser(id: number): Promise<User | undefined>; // Busca usuário por ID
  getUserByUsername(username: string): Promise<User | undefined>; // Busca usuário por nome
  createUser(user: InsertUser): Promise<User>; // Cria novo usuário
  getAllCourses(): Promise<Course[]>; // Retorna todos os cursos
  getCourse(id: number): Promise<Course | undefined>; // Busca curso por ID
  searchCourses(query: string): Promise<Course[]>; // Busca cursos por texto
}

// Implementação de armazenamento em memória (temporário, até configurar banco de dados)
export class MemStorage implements IStorage {
  private users: Map<number, User>; // Mapa para armazenar usuários em memória
  private courses: Map<number, Course>; // Mapa para armazenar cursos em memória
  private currentUserId: number; // Contador para IDs de usuários
  private currentCourseId: number; // Contador para IDs de cursos

  // Construtor da classe - inicializa os dados
  constructor() {
    this.users = new Map(); // Inicializa mapa vazio de usuários
    this.courses = new Map(); // Inicializa mapa vazio de cursos
    this.currentUserId = 1; // Primeiro ID de usuário será 1
    this.currentCourseId = 1; // Primeiro ID de curso será 1
    
    // Carrega dados iniciais dos cursos
    this.initializeCourses();
  }

  // Método privado que carrega os cursos iniciais do sistema
  private initializeCourses() {
    // Array com dados dos cursos disponíveis (sem ID, pois será gerado automaticamente)
    const coursesData: Omit<Course, 'id'>[] = [
      {
        name: "Segurança do Trabalho", // Nome do curso
        description: "Aprenda a identificar, avaliar e controlar riscos que possam comprometer a saúde e a integridade física dos trabalhadores", // Descrição detalhada
        price: 299.00, // Preço em reais
        duration: "", // Duração do curso
        image: "/seguranca.jpg" // URL da imagem
      },
      {
        name: "Tecnico em Marketing",
        description: "Prepara o aluno para planejar e executar estratégias de promoção de produtos, serviços ou marcas.",
        price: 299.00,
        duration: "",
        image: "/marketing.webp"
      },
      {
        name: "Logistica",
        description: " Logística forma profissionais capacitados para planejar, executar e controlar processos relacionados ao armazenamento, transporte, distribuição e gestão de estoques de produtos e materiais.",
        price: 299.00,
        duration: "",
        image: "/logistica.jpg"
      },
      {
        name: "Transações Imobiliarias",
        description: "Forma profissionais habilitados para intermediar a compra, venda, permuta, locação e administração de imóveis urbanos e rurais. ",
        price: 299.00,
        duration: "",
        image: "/movel.jpg"
      },
      {
        name: "Enfermagem",
        description: " Prepara o aluno para atuar na promoção, prevenção, recuperação e reabilitação da saúde, sempre sob supervisão de um enfermeiro",
        price: 499.00,
        duration: "- 40% R$299,00",
        image: "/enfermagem.jpg"
      },
    
    ];

    // Para cada curso no array, cria um objeto completo com ID e armazena no mapa
    coursesData.forEach(courseData => {
      const course: Course = { ...courseData, id: this.currentCourseId++ }; // Adiciona ID auto-incrementado
      this.courses.set(course.id, course); // Armazena no mapa usando ID como chave
    });
  }

  // Busca usuário pelo ID
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id); // Retorna usuário do mapa ou undefined se não encontrar
  }

  // Busca usuário pelo nome de usuário
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find( // Converte valores do mapa em array e busca
      (user) => user.username === username, // Encontra usuário com nome correspondente
    );
  }

  // Cria novo usuário no sistema
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++; // Gera novo ID único
    const user: User = { ...insertUser, id }; // Cria objeto usuário completo com ID
    this.users.set(id, user); // Armazena no mapa
    return user; // Retorna usuário criado
  }

  // Retorna todos os cursos disponíveis
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()); // Converte valores do mapa em array
  }

  // Busca curso específico pelo ID
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id); // Retorna curso do mapa ou undefined se não encontrar
  }

  // Busca cursos que contenham o texto da consulta no nome ou descrição
  async searchCourses(query: string): Promise<Course[]> {
    const allCourses = Array.from(this.courses.values()); // Obtém todos os cursos
    const lowerQuery = query.toLowerCase(); // Converte consulta para minúsculas para busca case-insensitive
    
    // Filtra cursos que contenham o texto na busca (nome ou descrição)
    return allCourses.filter(course => 
      course.name.toLowerCase().includes(lowerQuery) || // Busca no nome do curso
      course.description.toLowerCase().includes(lowerQuery) // Busca na descrição do curso
    );
  }
}

// Exporta instância única do armazenamento para uso em toda a aplicação
export const storage = new MemStorage();
