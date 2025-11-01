import { Route, Routes } from "react-router";
import { NotFoundPage } from "@/pages/not-found";
import { LandingRoutes } from "./landing.routes";
import { AuthRoutes } from "./auth.routes";
import { DashboardRoutes } from "./dashboard.routes";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { AuthResetPasswordPage } from "@/pages/auth/reset-password";

/**
 * App Routes
 * @returns App Routes
 */
export const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing Routes */}
            {LandingRoutes}

            {/* Auth Routes */}
            {AuthRoutes}

            {/* Dashboard Routes */}
            {DashboardRoutes}

            {/* Reset Password Page */}
            <Route
                path={ROUTES_CONSTANTS.AUTH().RESET_PASSWORD()}
                element={<AuthResetPasswordPage />}
            />

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
