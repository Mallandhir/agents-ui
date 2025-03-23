import { createRoot } from "react-dom/client";
import { StartMission } from "./screens/StartMission";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<StartMission />);
