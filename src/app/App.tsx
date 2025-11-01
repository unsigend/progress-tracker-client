/**
 * Progress Tracker Main Entry Point
 * @Copyright 2025 Yixiang Qiu
 * @License MIT
 */
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "@/routes/app.routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "@/hooks/use-theme";

export default function App() {
    const queryClient = new QueryClient();
    return (
        <BrowserRouter>
            <ThemeProvider
                defaultTheme="system"
                storageKey="progress-tracker-theme"
            >
                {/* React Query Client Provider */}
                <QueryClientProvider client={queryClient}>
                    {/* App Routes */}
                    <AppRoutes />
                </QueryClientProvider>

                {/* Sonner Toaster */}
                <Toaster position="top-right" />

                {/* Vercel Analytics and Speed Insights */}
                <Analytics />
                <SpeedInsights />
            </ThemeProvider>
        </BrowserRouter>
    );
}
