import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Router from "./Router/Router.tsx";
import StateProvider from "./context/StateProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateProvider>
      <Router />
    </StateProvider>
  </StrictMode>
);
