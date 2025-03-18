import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import { ThemeProvider } from "./context/useThemeContext.tsx";

if (typeof global === "undefined") {
  window.global = window;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <BrowserRouter basename={"/"}>
        <App />
      </BrowserRouter>
    </StrictMode>
    ,
  </ThemeProvider>
);
