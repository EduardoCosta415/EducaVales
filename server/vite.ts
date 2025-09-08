import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger, ServerOptions } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

// Solução robusta e compatível
const getRootDir = () => {
  try {
    // Tenta usar import.meta.url se estiver disponível (ESM)
    if (typeof import.meta?.url !== 'undefined') {
      const { fileURLToPath } = require("url");
      const __filename = fileURLToPath(import.meta.url);
      return path.dirname(__filename);
    }
  } catch (error) {
    // Se falhar, usa process.cwd() (CommonJS)
    console.warn('import.meta not available, falling back to process.cwd()');
  }
  return process.cwd();
};

const rootDir = getRootDir();
const __dirname = rootDir;

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions: ServerOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        rootDir,
        "client",
        "index.html",
      );

      // sempre recarrega o index.html do disco caso mude
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // CORREÇÃO: Usar o mesmo caminho do vite.config.ts (dist/public)
  const distPath = path.resolve(__dirname, "dist", "public");

  if (!fs.existsSync(distPath)) {
    // Mensagem de erro mais útil com instruções
    throw new Error(
      `Could not find the build directory: ${distPath}\n` +
      `Make sure to build the client first with:\n` +
      `npm run build` +
      `\nCurrent working directory: ${process.cwd()}\n` +
      `Directory contents: ${fs.readdirSync(__dirname).join(', ')}`
    );
  }

  app.use(express.static(distPath));

  // fallback para index.html caso o arquivo não exista
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}