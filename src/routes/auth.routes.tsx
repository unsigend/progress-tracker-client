import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { AuthLayout } from "@/layouts/auth";
import { AuthLoginPage } from "@/pages/auth/login";
import { AuthRegisterPage } from "@/pages/auth/register";
import { GithubCallbackPage } from "@/pages/auth/github-callback";
import { GoogleCallbackPage } from "@/pages/auth/google-callback";
import { AuthRedirect } from "@/pages/redirect";

/**
 * AuthRoutes - The routes for the auth page
 * @returns Auth Routes
 */
export const AuthRoutes = (
    <Route
        path={ROUTES_CONSTANTS.AUTH().ROOT()}
        element={
            <AuthRedirect>
                <AuthLayout />
            </AuthRedirect>
        }
    >
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

        {/* Github Callback Page */}
        <Route
            path={ROUTES_CONSTANTS.AUTH().GITHUB_CALLBACK()}
            element={<GithubCallbackPage />}
        />

        {/* Google Callback Page */}
        <Route
            path={ROUTES_CONSTANTS.AUTH().GOOGLE_CALLBACK()}
            element={<GoogleCallbackPage />}
        />
    </Route>
);
