import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { LandingMainLayout } from "@/layouts/landing";
import { LandingHomePage } from "@/pages/landing/home";
import { LandingAboutPage } from "@/pages/landing/about";
import { LandingContactPage } from "@/pages/landing/contact";

/**
 * LandingRoutes - The routes for the landing page
 * @returns Landing Routes
 */
export const LandingRoutes = (
    <Route
        path={ROUTES_CONSTANTS.LANDING().HOME()}
        element={<LandingMainLayout />}
    >
        {/* Landing Home Page */}
        <Route index element={<LandingHomePage />} />

        {/* Landing About Page */}
        <Route
            path={ROUTES_CONSTANTS.LANDING().ABOUT()}
            element={<LandingAboutPage />}
        />

        {/* Landing Contact Page */}
        <Route
            path={ROUTES_CONSTANTS.LANDING().CONTACT()}
            element={<LandingContactPage />}
        />
    </Route>
);
