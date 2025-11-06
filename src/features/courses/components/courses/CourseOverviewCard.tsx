import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * CourseOverviewCardProps - Interface for CourseOverviewCard component props
 */
interface CourseOverviewCardProps {
    id: string;
    title: string;
    source?: string | null;
    categories?: string[];
    onNavigate: (id: string) => void;
    className?: string;
}

/**
 * CourseOverviewCard - Component for displaying a course overview card
 * @param props - The props for the CourseOverviewCard component
 * @param props.id - The course ID
 * @param props.title - The course title
 * @param props.source - The course source (e.g., "Stanford University")
 * @param props.categories - Array of course categories
 * @param props.onNavigate - Function to handle navigation when card is clicked
 * @param props.className - Optional additional className
 * @returns CourseOverviewCard component
 */
export const CourseOverviewCard = ({
    id,
    title,
    source,
    categories,
    onNavigate,
    className,
}: CourseOverviewCardProps) => {
    return (
        <Card
            className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1.5 h-full flex flex-col border-border/50 hover:border-border/80 bg-card/50 backdrop-blur-sm",
                className
            )}
            onClick={() => onNavigate(id)}
        >
            <div className="p-8 sm:p-10 lg:p-12 flex-1 flex flex-col min-h-[220px] sm:min-h-[240px] lg:min-h-[260px]">
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-[1.2] tracking-[-0.02em] mb-4">
                    {title}
                </h3>

                {/* Source */}
                {source && source.trim() !== "" && (
                    <div className="mb-6">
                        <p className="text-sm sm:text-base text-muted-foreground/80 truncate font-medium">
                            {source}
                        </p>
                    </div>
                )}

                {/* Categories */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2.5 mt-auto pt-4 border-t border-border/30">
                        {categories
                            .filter((cat) => cat && cat.trim() !== "")
                            .map((category, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs sm:text-sm font-normal px-3.5 py-1.5 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-all duration-200 group-hover:bg-muted/60"
                                >
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </Badge>
                            ))}
                    </div>
                )}
            </div>
        </Card>
    );
};
