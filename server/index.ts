// Importa Express e tipos para criação do servidor web
import express, { type Request, Response, NextFunction } from "express";
// Importa função que registra todas as rotas da API
import { registerRoutes } from "./routes";
// Importa funções para configurar Vite em desenvolvimento e servir arquivos estáticos
import { setupVite, serveStatic, log } from "./vite";

// Cria instância da aplicação Express
const app = express();
// Middleware para parsear requisições JSON
app.use(express.json());
// Middleware para parsear dados de formulários URL-encoded
app.use(express.urlencoded({ extended: false }));

// Middleware de logging que registra todas as requisições da API
app.use((req, res, next) => {
  const start = Date.now(); // Marca tempo de início da requisição
  const path = req.path; // Captura caminho da requisição
  let capturedJsonResponse: Record<string, any> | undefined = undefined; // Armazena resposta JSON

  // Intercepta método res.json para capturar resposta
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson; // Salva resposta para log
    return originalResJson.apply(res, [bodyJson, ...args]); // Chama método original
  };

  // Evento que dispara quando resposta é finalizada
  res.on("finish", () => {
    const duration = Date.now() - start; // Calcula duração da requisição
    // Log apenas para rotas da API
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      // Adiciona preview da resposta JSON se existir
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Trunca linha de log se muito longa
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine); // Exibe log usando função customizada
    }
  });

  next(); // Passa para próximo middleware
});

// Função assíncrona auto-executável para inicializar servidor
(async () => {
  // Registra todas as rotas da API e obtém servidor HTTP
  const server = await registerRoutes(app);

  // Middleware global de tratamento de erros
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500; // Status code do erro
    const message = err.message || "Internal Server Error"; // Mensagem de erro

    res.status(status).json({ message }); // Retorna erro em formato JSON
    throw err; // Relança erro para logging adicional
  });

  // Configuração condicional baseada no ambiente
  // Importante: Vite é configurado apenas em desenvolvimento e após todas as outras rotas
  // para que a rota catch-all não interfira com as rotas da API
  if (app.get("env") === "development") {
    // Em desenvolvimento: configura Vite para hot reload
    await setupVite(app, server);
  } else {
    // Em produção: serve arquivos estáticos buildados
    serveStatic(app);
  }

  // SEMPRE serve a aplicação na porta 5000
  // Esta porta serve tanto a API quanto o cliente
  // É a única porta que não está protegida por firewall
  const port = 3007;
  server.listen({
    port, // Porta definida
    host: "0.0.0.0", // Escuta em todas as interfaces
    // Permite reutilização da porta
  }, () => {
    log(`serving on port ${port}`); // Log de inicialização
  });
})();
