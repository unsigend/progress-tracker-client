import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { CoursesHomePage } from "@/pages/courses/home";

/**
 * CoursesRoutes - The routes for the courses page
 * @returns CoursesRoutes component
 */
export const CoursesRoutes = (
    <>
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME()}
            element={<CoursesHomePage />}
        />
    </>
);
