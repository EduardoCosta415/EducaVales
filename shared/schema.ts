// Importa funções do Drizzle ORM para criar tabelas PostgreSQL
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
// Importa função para criar schemas de validação baseados nas tabelas
import { createInsertSchema } from "drizzle-zod";
// Importa biblioteca Zod para validação de tipos
import { z } from "zod";

// Define a tabela de cursos no banco de dados
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // ID único auto-incrementável como chave primária
  name: text("name").notNull(), // Nome do curso, campo obrigatório
  description: text("description").notNull(), // Descrição do curso, campo obrigatório
  price: integer("price").notNull(), // Preço do curso em centavos, campo obrigatório
  duration: text("duration").notNull(), // Duração do curso (ex: "6 meses"), campo obrigatório
  image: text("image").notNull(), // URL da imagem do curso, campo obrigatório
});

// Cria schema de validação para inserção de cursos, excluindo o ID (auto-gerado)
export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

// Tipo TypeScript para dados de inserção de curso
export type InsertCourse = z.infer<typeof insertCourseSchema>;
// Tipo TypeScript para curso completo (incluindo ID)
export type Course = typeof courses.$inferSelect;

// Mantém schema existente de usuários para futuras funcionalidades
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // ID único do usuário
  username: text("username").notNull().unique(), // Nome de usuário único e obrigatório
  password: text("password").notNull(), // Senha do usuário, campo obrigatório
});

// Cria schema de validação para inserção de usuários, incluindo apenas campos necessários
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Tipo TypeScript para dados de inserção de usuário
export type InsertUser = z.infer<typeof insertUserSchema>;
// Tipo TypeScript para usuário completo (incluindo ID)
export type User = typeof users.$inferSelect;
