import { Route, Routes } from "react-router";
import { NotFoundPage } from "@/pages/not-found";
import { LandingRoutes } from "@/routes/landing.routes";

/**
 * App Routes
 * @returns App Routes
 */
export const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing Routes */}
            {LandingRoutes}

            {/* Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
