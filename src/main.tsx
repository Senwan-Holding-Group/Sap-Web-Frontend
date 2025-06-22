import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Router from "./Router/Router.tsx";
import StateProvider from "./context/StateProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AuthProvider from "./api/Auth/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <StateProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <Router />
        </QueryClientProvider>
      </StateProvider>
    </AuthProvider>
  </StrictMode>
);
