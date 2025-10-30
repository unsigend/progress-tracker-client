import { Header } from "@/features/landing/Header";
import { Footer } from "@/features/landing/Footer";
import { Outlet } from "react-router";

/**
 * Landing Layout
 */
export const LandingLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
