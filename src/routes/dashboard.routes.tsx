import { Route } from "react-router";
import { DashboardMainLayout } from "@/layouts/dashboard";
import { DashboardHomePage } from "@/pages/dashboard/home";
import { DashboardSettingsPage } from "@/pages/dashboard/settings";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { ReadingRoutes } from "./dashboard/reading.routes";
import { CoursesRoutes } from "./dashboard/courses.routes";
import { ProjectsRoutes } from "./dashboard/projects.routes";
import { Protector } from "@/pages/protector";

/**
 * DashboardRoutes - Dashboard routes configuration
 */
export const DashboardRoutes = (
    <Route
        path={ROUTES_CONSTANTS.DASHBOARD().HOME()}
        element={
            <Protector>
                <DashboardMainLayout />
            </Protector>
        }
    >
        {/* Dashboard Home Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().HOME()}
            element={<DashboardHomePage />}
        />

        {/* Dashboard Settings Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().SETTINGS()}
            element={<DashboardSettingsPage />}
        />

        {/* Reading Routes */}
        {ReadingRoutes}

        {/* Courses Routes */}
        {CoursesRoutes}

        {/* Projects Routes */}
        {ProjectsRoutes}
    </Route>
);
