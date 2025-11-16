// import dependencies
import { Outlet } from "react-router";

// import components
import { LandingNavBar } from "@/features/landing/components/LandingNavBar";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

/**
 * LandingMainLayout - The main layout for the landing page
 */
export const LandingMainLayout = () => {
    return (
        <section>
            <section className="container mx-auto min-h-screen">
                <LandingNavBar />
                <Outlet />
            </section>
            <LandingFooter />
        </section>
    );
};
