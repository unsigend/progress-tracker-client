import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
} from "@/components/ui/empty";
import { Loader2, Lock, Globe, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { Course } from "@/entities/course/courses/models/model";

/**
 * PrivateCoursesCardProps - Interface for PrivateCoursesCard component props
 */
interface PrivateCoursesCardProps {
    courses: Course[];
    isLoading: boolean;
    onMarkAsPublic: (id: string) => void;
    onNavigate: (id: string) => void;
    className?: string;
}

/**
 * PrivateCourseCardItem - Component for displaying a single private course card
 */
interface PrivateCourseCardItemProps {
    course: Course;
    onMarkAsPublic: (id: string) => void;
    onNavigate: (id: string) => void;
}

/**
 * PrivateCourseCardItem - Component for displaying a single private course card with Mark as Public button
 * @param props - The props for the PrivateCourseCardItem component
 * @param props.course - The course data
 * @param props.onMarkAsPublic - Function to handle marking course as public
 * @param props.onNavigate - Function to handle navigation when card is clicked
 * @returns PrivateCourseCardItem component
 */
const PrivateCourseCardItem = ({
    course,
    onMarkAsPublic,
    onNavigate,
}: PrivateCourseCardItemProps) => {
    const handleMarkAsPublic = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkAsPublic(course.id);
    };

    return (
        <Card
            className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1.5 h-full flex flex-col border-border/50 hover:border-border/80 bg-card/50 backdrop-blur-sm relative overflow-hidden"
            )}
            onClick={() => onNavigate(course.id)}
        >
            <div className="p-8 sm:p-10 lg:p-12 flex-1 flex flex-col min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] relative">
                {/* Mark as Public Button - Top Right */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMarkAsPublic}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 h-8 w-8 opacity-60 hover:opacity-100 transition-opacity duration-200 hover:bg-accent hover:text-accent-foreground z-10"
                    title="Mark as Public"
                >
                    <Globe className="h-4 w-4" />
                </Button>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-[1.2] tracking-[-0.02em] mb-4 pr-12">
                    {course.name}
                </h3>

                {/* Source */}
                {course.source && course.source.trim() !== "" && (
                    <div className="mb-4">
                        <p className="text-sm sm:text-base text-muted-foreground/80 truncate font-medium">
                            {course.source}
                        </p>
                    </div>
                )}

                {/* Categories */}
                {course.categories && course.categories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2.5 mt-auto">
                        {course.categories
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

/**
 * PrivateCoursesCard - Pure UI component for displaying private courses section
 * @param props - The props for the PrivateCoursesCard component
 * @param props.courses - Array of private courses to display
 * @param props.isLoading - Whether the courses are loading
 * @param props.onMarkAsPublic - Function to handle marking a course as public
 * @param props.onNavigate - Function to handle navigation when a course card is clicked
 * @param props.className - Optional additional className
 * @returns PrivateCoursesCard component
 */
export const PrivateCoursesCard = ({
    courses,
    isLoading,
    onMarkAsPublic,
    onNavigate,
    className,
}: PrivateCoursesCardProps) => {
    return (
        <Card className={cn("min-h-[200px]", className)}>
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                    My Private Courses
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().NEW()}
                    >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-16">
                        <Loader2 className="size-8 animate-spin text-muted-foreground" />
                    </div>
                ) : !courses || courses.length === 0 ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Lock className="size-6" />
                            </EmptyMedia>
                            <EmptyTitle>No private courses</EmptyTitle>
                            <EmptyDescription>
                                You don't have any private courses yet. Create a
                                course and set it to private to see it here.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    <div
                        className={cn(
                            "grid gap-6 w-full",
                            "grid-cols-1",
                            "sm:grid-cols-2",
                            "md:grid-cols-3",
                            "3xl:grid-cols-5"
                        )}
                    >
                        {courses.map((course) => (
                            <PrivateCourseCardItem
                                key={course.id}
                                course={course}
                                onMarkAsPublic={onMarkAsPublic}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
