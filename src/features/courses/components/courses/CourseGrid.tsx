import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { CourseOverviewCard } from "./CourseOverviewCard";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * CourseGridItem - Interface for a course item in the grid
 */
interface CourseGridItem {
    id: string;
    title: string;
    source?: string | null;
    categories?: string[];
}

/**
 * CourseGridProps - Interface for CourseGrid component props
 */
interface CourseGridProps {
    courses: CourseGridItem[];
    className?: string;
    onNavigate?: (id: string) => void;
    to?: (id: string) => string;
}

/**
 * CourseGrid - Component for displaying a grid of course cards
 * @param props - The props for the CourseGrid component
 * @param props.courses - Array of course items to display
 * @param props.className - Additional CSS classes
 * @param props.onNavigate - Optional function to handle navigation when a course card is clicked (for backwards compatibility)
 * @param props.to - Optional function to generate link URL (preferred over onNavigate)
 * @returns CourseGrid component
 */
export const CourseGrid = ({
    courses,
    className,
    onNavigate,
    to,
}: CourseGridProps) => {
    const navigate = useNavigate();

    if (!courses || courses.length === 0) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center py-12",
                    className
                )}
            >
                <p className="text-muted-foreground text-sm">
                    No courses found
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "grid gap-6 w-full",
                "grid-cols-1",
                "sm:grid-cols-2",
                "md:grid-cols-3",
                "2xl:grid-cols-4",
                className
            )}
        >
            {courses.map((course) => (
                <CourseOverviewCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    source={course.source}
                    categories={course.categories}
                    onNavigate={
                        to
                            ? () => navigate(to(course.id))
                            : onNavigate ||
                              ((id: string) =>
                                  navigate(
                                      ROUTES_CONSTANTS.DASHBOARD()
                                          .COURSES()
                                          .LIST()
                                          .DETAIL(id)
                                  ))
                    }
                />
            ))}
        </div>
    );
};
