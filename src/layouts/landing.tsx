// import dependencies
import { Outlet } from "react-router";

// import components
import NavBar from "@/features/landing/components/NavBar";
import Footer from "@/features/landing/components/Footer";

/**
 * Landing Main Layout
 * @returns The landing main layout
 */
const LandingLayout = () => {
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

export default LandingLayout;
