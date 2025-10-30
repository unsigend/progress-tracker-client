import { Route } from "react-router";
import { LandingLayout } from "@/layouts/landing.layout";
import { LandingHomePage } from "@/pages/landing/home";
import { LandingAboutPage } from "@/pages/landing/about";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * Landing Routes
 */
export const LandingRoutes = (
    <Route element={<LandingLayout />}>
        <Route
            path={ROUTES_CONSTANTS().LANDING().HOME()}
            element={<LandingHomePage />}
        />
        <Route
            path={ROUTES_CONSTANTS().LANDING().ABOUT()}
            element={<LandingAboutPage />}
        />
    </Route>
);
