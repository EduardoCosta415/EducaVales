// Importa funções do Drizzle ORM para criar tabelas PostgreSQL
import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
// Importa função para criar schemas de validação baseados nas tabelas
import { createInsertSchema } from "drizzle-zod";
// Importa biblioteca Zod para validação de tipos

// ----------------- Cursos -----------------

// Define a tabela de cursos no banco de dados
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(), // ID único auto-incrementável como chave primária
  name: text("name").notNull(), // Nome do curso, campo obrigatório
  description: text("description").notNull(), // Descrição do curso, campo obrigatório
  price: integer("price").notNull(), // Preço do curso em centavos, campo obrigatório
  duration: text("duration").notNull(), // Duração do curso (ex: "6 meses"), campo obrigatório
  image: text("image").notNull(), // URL da imagem do curso, campo obrigatório
});

// Schema de validação para inserção de cursos (sem ID, que é auto-gerado)
export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

// Tipos TypeScript (direto do Drizzle → mais seguro)
export type InsertCourse = typeof courses.$inferInsert;
export type Course = typeof courses.$inferSelect;

// ----------------- Usuários -----------------

// Define a tabela de usuários
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // ID único do usuário
  username: text("username").notNull().unique(), // Nome de usuário único e obrigatório
  password: text("password").notNull(), // Senha do usuário, campo obrigatório
});

// Schema de validação para inserção de usuários
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Tipos TypeScript (direto do Drizzle)
export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
