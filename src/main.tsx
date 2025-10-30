// Main entry point for the application
import { createRoot } from "react-dom/client";
import App from "./app/app";
import "./app/style.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
