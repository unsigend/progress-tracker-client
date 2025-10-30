// import dependencies
import { Routes } from "react-router";

// import routes
import { landingRoutes } from "@/routes/landing.routes";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing Routes */}
            {landingRoutes}
        </Routes>
    );
};

export default AppRoutes;
