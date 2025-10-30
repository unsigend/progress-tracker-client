// import dependencies
import { Routes } from "react-router";

// import routes
import LandingRoutes from "@/routes/landing.routes";

/**
 * AppRoutes component
 * @returns The AppRoutes component
 */
export default function AppRoutes() {
    return <Routes>{LandingRoutes}</Routes>;
}
