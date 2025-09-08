// Importa QueryClient e QueryFunction do TanStack Query
import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Função que verifica se a resposta HTTP é válida e lança erro se não for
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    // Extrai texto da resposta de erro ou usa statusText como fallback
    const text = (await res.text()) || res.statusText;
    // Lança erro com código de status e mensagem
    throw new Error(`${res.status}: ${text}`);
  }
}

// Função utilitária para fazer requisições HTTP com tratamento de erro
export async function apiRequest(
  method: string, // Método HTTP (GET, POST, PUT, DELETE, etc.)
  url: string, // URL da requisição
  data?: unknown | undefined, // Dados para enviar no body (opcional)
): Promise<Response> {
  // Executa requisição fetch com configurações adequadas
  const res = await fetch(url, {
    method, // Método HTTP especificado
    headers: data ? { "Content-Type": "application/json" } : {}, // Headers condicionais
    body: data ? JSON.stringify(data) : undefined, // Converte dados para JSON se existirem
    credentials: "include", // Inclui cookies de sessão
  });

  await throwIfResNotOk(res); // Verifica se houve erro na resposta
  return res; // Retorna resposta se tudo OK
}

// Tipo que define comportamento em caso de erro 401 (não autorizado)
type UnauthorizedBehavior = "returnNull" | "throw";

// Função de busca padrão configurável para o TanStack Query
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior; // Como tratar erro 401
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) => // Recebe configuração de comportamento
  async ({ queryKey }) => { // Função executada para cada query
    // Faz requisição usando primeira parte da queryKey como URL
    const res = await fetch(queryKey[0] as string, {
      credentials: "include", // Inclui cookies de autenticação
    });

    // Se configurado para retornar null em caso de 401, faz isso
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res); // Verifica outros erros HTTP
    return await res.json(); // Retorna dados parseados como JSON
  };

// Cliente de query configurado globalmente para toda a aplicação
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }), // Usa função de busca que lança erro em 401
      refetchInterval: false, // Não refaz requisições automaticamente por tempo
      refetchOnWindowFocus: false, // Não refaz requisições ao focar janela
      staleTime: Infinity, // Dados nunca ficam "velhos" (cache permanente)
      retry: false, // Não tenta novamente em caso de erro
    },
    mutations: {
      retry: false, // Não tenta novamente mutações que falharam
    },
  },
});
