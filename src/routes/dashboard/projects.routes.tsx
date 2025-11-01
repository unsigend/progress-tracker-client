import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { ProjectsHomePage } from "@/pages/projects/home";

/**
 * ProjectsRoutes - The routes for the projects page
 * @returns ProjectsRoutes component
 */
export const ProjectsRoutes = (
    <>
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().PROJECTS().HOME()}
            element={<ProjectsHomePage />}
        />
    </>
);
