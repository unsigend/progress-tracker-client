import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CourseOverviewCardProps - Interface for CourseOverviewCard component props
 */
interface CourseOverviewCardProps {
    id: string;
    image?: string | null;
    title: string;
    source?: string | null;
    category?: string | null;
    onNavigate: (id: string) => void;
    className?: string;
}

/**
 * CourseOverviewCard - Component for displaying a course overview card
 * @param props - The props for the CourseOverviewCard component
 * @param props.id - The course ID
 * @param props.image - The course image URL
 * @param props.title - The course title
 * @param props.source - The course source (e.g., "Stanford University")
 * @param props.category - The course category (reserved for future use)
 * @param props.onNavigate - Function to handle navigation when card is clicked
 * @param props.className - Optional additional className
 * @returns CourseOverviewCard component
 */
export const CourseOverviewCard = ({
    id,
    image,
    title,
    source,
    category,
    onNavigate,
    className,
}: CourseOverviewCardProps) => {
    return (
        <Card
            className={cn(
                "group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                className
            )}
            onClick={() => onNavigate(id)}
        >
            {/* Image Section - Top Half */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {image && image.trim() !== "" ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                            );
                        }}
                    />
                ) : null}

                {/* Placeholder */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/80",
                        image && image.trim() !== "" ? "hidden" : ""
                    )}
                >
                    <GraduationCap className="size-12 text-muted-foreground" />
                </div>

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Content Section - Bottom Half */}
            <div className="p-4 space-y-2">
                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                    {title}
                </h3>

                {/* Source and Category Row */}
                <div className="flex items-center justify-between gap-2">
                    {/* Source */}
                    <div className="flex-1 min-w-0">
                        {source && source.trim() !== "" ? (
                            <p className="text-xs text-muted-foreground truncate">
                                {source}
                            </p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                No source
                            </p>
                        )}
                    </div>

                    {/* Category - Reserved space for future feature */}
                    {category && category.trim() !== "" ? (
                        <div className="flex-shrink-0">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                {category}
                            </span>
                        </div>
                    ) : (
                        <div className="w-0 h-0" aria-hidden="true" />
                    )}
                </div>
            </div>
        </Card>
    );
};
