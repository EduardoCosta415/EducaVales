// Importa tipos do Express para tipagem correta
import type { Express } from "express";
// Importa função para criar servidor HTTP
import { createServer, type Server } from "http";
// Importa instância de armazenamento de dados
import { storage } from "./storage";

// Função que registra todas as rotas da API no servidor Express
export async function registerRoutes(app: Express): Promise<Server> {
  // Rota GET para buscar todos os cursos disponíveis
  app.get("/api/courses", async (req, res) => {
    try {
      // Chama método do storage para obter todos os cursos
      const courses = await storage.getAllCourses();
      // Retorna cursos em formato JSON
      res.json(courses);
    } catch (error) {
      // Em caso de erro, retorna status 500 com mensagem de erro
      res.status(500).json({ message: "Error fetching courses" });
    }
  });

  // Rota GET para buscar um curso específico pelo ID
  app.get("/api/courses/:id", async (req, res) => {
    try {
      // Converte parâmetro da URL de string para número
      const id = parseInt(req.params.id);
      // Busca curso no storage pelo ID
      const course = await storage.getCourse(id);
      
      // Se curso não encontrado, retorna erro 404
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Retorna curso encontrado em formato JSON
      res.json(course);
    } catch (error) {
      // Em caso de erro, retorna status 500 com mensagem de erro
      res.status(500).json({ message: "Error fetching course" });
    }
  });

  // Rota GET para buscar cursos que correspondam a uma consulta de texto
  app.get("/api/courses/search/:query", async (req, res) => {
    try {
      // Obtém texto da consulta dos parâmetros da URL
      const query = req.params.query;
      // Executa busca no storage usando o texto fornecido
      const courses = await storage.searchCourses(query);
      // Retorna cursos encontrados em formato JSON
      res.json(courses);
    } catch (error) {
      // Em caso de erro, retorna status 500 com mensagem de erro
      res.status(500).json({ message: "Error searching courses" });
    }
  });

  // Cria servidor HTTP usando a aplicação Express configurada
  const httpServer = createServer(app);
  // Retorna instância do servidor para uso externo
  return httpServer;
}
