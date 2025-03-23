import App from "@/App";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);
