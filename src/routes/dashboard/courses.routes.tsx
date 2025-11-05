import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { CoursesHomePage } from "@/pages/courses/home";
import { CourseNewPage } from "@/pages/courses/courses/new";
import { CourseEditPage } from "@/pages/courses/courses/edit";

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
        {/* Course New Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().COURSES().NEW()}
            element={<CourseNewPage />}
        />
        {/* Course Edit Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().COURSES().EDIT()}
            element={<CourseEditPage />}
        />
    </>
);
