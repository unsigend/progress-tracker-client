import { HeroSection } from "@/features/landing/components/home/HeroSection";
import { FeaturesSection } from "@/features/landing/components/home/FeaturesSection";
import { BuildWithSection } from "@/features/landing/components/home/BuildWithSection";

/**
 * LandingHomePage - The page for the home page
 * @returns
 */
export const LandingHomePage = () => {
    return (
        <section className="px-4 py-7 lg:py-3">
            {/* Hero Section */}
            <HeroSection />
            {/* Features Section */}
            <FeaturesSection />
            {/* Build With Section */}
            <BuildWithSection />
        </section>
    );
};
