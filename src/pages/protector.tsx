import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useAuth } from "@/entities/auth/hooks/useAuth";
import { Navigate } from "react-router";

/**
 * Protector: A component that protects a route from unauthorized access
 */
export const Protector = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to={ROUTES_CONSTANTS.AUTH().LOGIN()} />;
    }
    return <>{children}</>;
};
