import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { ReadingHomePage } from "@/pages/reading/home";

/**
 * ReadingRoutes - The routes for the reading page
 * @returns ReadingRoutes component
 */
export const ReadingRoutes = (
    <>
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}
            element={<ReadingHomePage />}
        />
    </>
);
