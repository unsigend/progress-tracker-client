import { LandingHero } from "@/features/landing/components/home/LandingHero";
import { LandingFeatures } from "@/features/landing/components/home/LandingFeatures";
import { LandingBuildWith } from "@/features/landing/components/home/LandingBuildWith";

/**
 * LandingHomePage - The page for the home page
 * @returns LandingHomePage component
 */
export const LandingHomePage = () => {
    return (
        <section className="px-4 py-7 lg:py-3">
            {/* Hero Section */}
            <LandingHero />
            {/* Features Section */}
            <LandingFeatures />
            {/* Build With Section */}
            <LandingBuildWith />
        </section>
    );
};
