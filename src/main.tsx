import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DependencyProvider } from "@shared/providers/dependency-provider.tsx";
import container from "@shared/container.ts";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DependencyProvider container={container}>
      <App />
    </DependencyProvider>
  </StrictMode>
);
