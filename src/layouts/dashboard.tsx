import { Outlet } from "react-router";
import { DashboardContainer } from "@/features/dashboard/container/DashboardContainer";

/**
 * DashboardMainLayout - The main layout for the dashboard pages
 * @returns DashboardMainLayout component
 */
export const DashboardMainLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <DashboardContainer>
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-6">
                        <Outlet />
                    </div>
                </main>
            </DashboardContainer>
        </div>
    );
};
