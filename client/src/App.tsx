// Importa componentes de roteamento da biblioteca Wouter
import { Switch, Route } from "wouter";
// Importa cliente de consulta configurado para requisições HTTP
import { queryClient } from "./lib/queryClient";
// Importa provedor do TanStack Query para gerenciamento de estado do servidor
import { QueryClientProvider } from "@tanstack/react-query";
// Importa componente para exibir notificações toast
import { Toaster } from "@/components/ui/toaster";
// Importa provedor de tooltips para toda a aplicação
import { TooltipProvider } from "@/components/ui/tooltip";
// Importa páginas da aplicação
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Componente de roteamento que define as rotas da aplicação
function Router() {
  return (
    <Switch>
      {/* Rota principal que renderiza a página Home */}
      <Route path="/" component={Home} />
      {/* Rota padrão para páginas não encontradas */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Componente principal da aplicação que configura todos os provedores
function App() {
  return (
    // Provedor do TanStack Query para cache e gerenciamento de dados do servidor
    <QueryClientProvider client={queryClient}>
      {/* Provedor de tooltips para componentes da interface */}
      <TooltipProvider>
        {/* Componente que exibe notificações toast */}
        <Toaster />
        {/* Sistema de roteamento da aplicação */}
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Exporta componente principal para uso no arquivo main.tsx
export default App;
