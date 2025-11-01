// import dependencies
import { Outlet } from "react-router";

// import components
import { NavBar } from "@/features/landing/components/NavBar";
import { Footer } from "@/features/landing/components/Footer";

/**
 * LandingMainLayout - The main layout for the landing page
 */
export const LandingMainLayout = () => {
    return (
        <section>
            <section className="container mx-auto min-h-screen">
                <NavBar />
                <Outlet />
            </section>
            <Footer />
        </section>
    );
};
