import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { AuthLayout } from "@/layouts/auth";
import { AuthLoginPage } from "@/pages/auth/login";
import { AuthRegisterPage } from "@/pages/auth/register";

/**
 * AuthRoutes - The routes for the auth page
 * @returns Auth Routes
 */
export const AuthRoutes = (
    <Route path={ROUTES_CONSTANTS.AUTH().ROOT()} element={<AuthLayout />}>
        {/* Login Page */}
        <Route
            path={ROUTES_CONSTANTS.AUTH().LOGIN()}
            element={<AuthLoginPage />}
        />

        {/* Register Page */}
        <Route
            path={ROUTES_CONSTANTS.AUTH().REGISTER()}
            element={<AuthRegisterPage />}
        />
    </Route>
);
