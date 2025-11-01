import { useState } from "react";
import { SideBar } from "@/features/dashboard/components/SideBar";
import { Header } from "@/features/dashboard/components/Header";
import { useMe } from "@/entities/users/hooks/useMe";
import { useLogout } from "@/entities/auth/hooks/useLogout";
import { useNavigate } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * DashboardContainerProps - Interface for DashboardContainer component props
 */
interface DashboardContainerProps {
    children: React.ReactNode;
}

/**
 * DashboardContainer - Container component that handles dashboard layout data and logic
 * @param props - The props for the DashboardContainer component
 * @param props.children - The children to render in the main content area
 * @returns DashboardContainer component
 */
export const DashboardContainer = ({ children }: DashboardContainerProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: user, isLoading } = useMe();
    const { mutate: logout } = useLogout();
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleLinkClick = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                navigate(ROUTES_CONSTANTS.AUTH().LOGIN());
            },
        });
    };

    return (
        <>
            <SideBar
                isOpen={isSidebarOpen}
                onLinkClick={handleLinkClick}
                user={user ?? null}
                isLoading={isLoading}
            />

            <div className="lg:pl-64">
                <Header
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={handleToggleSidebar}
                    user={user ?? null}
                    isLoading={isLoading}
                    onLogout={handleLogout}
                />
                {children}
            </div>
        </>
    );
};
