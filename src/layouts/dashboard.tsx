import { Outlet } from "react-router";
import { SideBar, SidebarProvider } from "@/features/dashboard/components/SideBar";
import { Header } from "@/features/dashboard/components/Header";

/**
 * DashboardMainLayout - The main layout for the dashboard pages
 * Handles routing and composes dashboard components
 * @returns DashboardMainLayout component
 */
export const DashboardMainLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <SidebarProvider>
                <SideBar />
                <div className="lg:pl-64">
                    <Header />
                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-6">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
};
