// import dependencies
import { Route } from "react-router";

// import routes
import { ROUTES_CONSTANTS } from "@/constants/routes";

// import layouts
import LandingLayout from "@/layouts/landing";

// import pages
import HomePage from "@/pages/landing/home";
import AboutPage from "@/pages/landing/about";

/**
 * LandingRoutes component
 * @returns The LandingRoutes component
 */
const LandingRoutes = (
    <>
        {/* Landing Layout */}
        <Route element={<LandingLayout />}>
            {/* Home Page */}
            <Route
                path={ROUTES_CONSTANTS.LANDING().HOME()}
                element={<HomePage />}
            />
            {/* About Page */}
            <Route
                path={ROUTES_CONSTANTS.LANDING().ABOUT()}
                element={<AboutPage />}
            />
        </Route>
    </>
);

export default LandingRoutes;
