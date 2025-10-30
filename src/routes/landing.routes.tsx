import { Route } from "react-router";

// import constants
import { ROUTES_CONSTANTS } from "@/constants/routes";

// import layouts
import LandingLayout from "@/layouts/landing";

// import pages
import LandingHomePage from "@/pages/landing/home";
import LandingAboutPage from "@/pages/landing/about";

/**
 * Landing Routes
 * @returns The landing routes
 */
export const landingRoutes = (
    <>
        {/* Landing Main Layout */}
        <Route
            path={ROUTES_CONSTANTS.LANDING().HOME()}
            element={<LandingLayout />}
        >
            {/* Landing Home Page */}
            <Route
                path={ROUTES_CONSTANTS.LANDING().HOME()}
                element={<LandingHomePage />}
            />
            {/* Landing About Page */}
            <Route
                path={ROUTES_CONSTANTS.LANDING().ABOUT()}
                element={<LandingAboutPage />}
            />
        </Route>
    </>
);
