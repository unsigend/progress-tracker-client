import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useAuth } from "@/entities/auth/hooks/useAuth";
import { Navigate } from "react-router";

/**
 * Redirect: A component that redirects when user already authenticated
 */

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return <Navigate to={ROUTES_CONSTANTS.DASHBOARD().HOME()} />;
    }
    return <>{children}</>;
};
