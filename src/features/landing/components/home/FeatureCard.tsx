import type { LucideIcon } from "lucide-react";

/**
 * FeatureCardProps - Interface for FeatureCard component props
 */
interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    paragraph: string;
}

/**
 * FeatureCard - Component for displaying a feature card
 * @param props - The props for the FeatureCard component
 * @param props.icon - The icon to display
 * @param props.title - The title of the feature
 * @param props.paragraph - The paragraph description of the feature
 * @returns FeatureCard component
 */
export const FeatureCard = ({
    icon: Icon,
    title,
    paragraph,
}: FeatureCardProps) => {
    return (
        <div className="group bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                    {title}
                </h3>
            </div>
            <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
                {paragraph}
            </p>
        </div>
    );
};
