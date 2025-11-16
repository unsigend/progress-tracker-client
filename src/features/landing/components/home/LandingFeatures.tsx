import { webFeatures } from "@/features/landing/constants/web-features";
import { LandingFeatureCard } from "@/features/landing/components/home/LandingFeatureCard";

/**
 * LandingFeatures - Component for displaying the features section
 * @returns LandingFeatures component
 */
export const LandingFeatures = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 lg:py-20">
            <div className="text-center mb-12 lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                    Everything you need to track progress
                </h2>
                <p className="text-lg max-w-3xl lg:text-left">
                    Progress Tracker comes with powerful features to help you
                    monitor and analyze your daily progress across multiple
                    domains with seamless integrations
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {webFeatures.map((feature, index) => (
                    <LandingFeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        paragraph={feature.paragraph}
                    />
                ))}
            </div>
        </div>
    );
};

