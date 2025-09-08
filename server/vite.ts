import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger, ServerOptions } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

// Transformar import.meta.url em __dirname ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detecta se está rodando em desenvolvimento (Vite dev) ou produção (build)
const isDev = process.env.NODE_ENV !== "production";

// Caminho para o front-end
const clientPath = path.resolve(__dirname, isDev ? "../client" : "../dist/public");

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
  if (!isDev) return; // Em produção, não precisa do dev server

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

  // Recarrega index.html no dev
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const indexFile = path.resolve(clientPath, "index.html");
      let template = await fs.promises.readFile(indexFile, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
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
  // Em dev, serve nada ou use o Vite dev server
  if (isDev) return;

  if (!fs.existsSync(clientPath)) {
    throw new Error(
      `Could not find the build directory: ${clientPath}\n` +
        `Make sure to build the client first with:\n` +
        `npm run build` +
        `\nCurrent working directory: ${process.cwd()}`
    );
  }

  app.use(express.static(clientPath));

  // fallback para index.html
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(clientPath, "index.html"));
  });
}
