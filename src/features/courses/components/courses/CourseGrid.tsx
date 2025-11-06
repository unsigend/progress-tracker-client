import { cn } from "@/lib/utils";
import { CourseOverviewCard } from "./CourseOverviewCard";

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
    onNavigate: (id: string) => void;
}

/**
 * CourseGrid - Component for displaying a grid of course cards
 * @param props - The props for the CourseGrid component
 * @param props.courses - Array of course items to display
 * @param props.className - Additional CSS classes
 * @param props.onNavigate - Function to handle navigation when a course card is clicked
 * @returns CourseGrid component
 */
export const CourseGrid = ({
    courses,
    className,
    onNavigate,
}: CourseGridProps) => {
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
                "lg:grid-cols-4",
                "xl:grid-cols-5",
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
                    onNavigate={onNavigate}
                />
            ))}
        </div>
    );
};
