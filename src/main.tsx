import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Router from "./Router/Router.tsx";
import StateProvider from "./context/StateProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AuthProvider from "./api/Auth/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <StateProvider>
        <Toaster />
        <Router />
      </StateProvider>
    </AuthProvider>
  </StrictMode>
);
