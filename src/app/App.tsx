import { BrowserRouter } from "react-router";
import { AppRoutes } from "@/routes/app.route";
import { ThemeProvider } from "../components/common/theme-provider";

/**
 * Application Main Entry Point
 * @ProgressTracker - Application Progress Tracker
 * @Copyright - 2025 Yixiang Qiu
 */
export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <AppRoutes />
            </ThemeProvider>
        </BrowserRouter>
    );
}
