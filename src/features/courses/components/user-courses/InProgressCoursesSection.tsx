import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type { UserCourseWithCourse } from "@/entities/course/user-courses/model/model";
import { cn } from "@/lib/utils";
import { COURSE_CONSTANTS } from "@/constants/course.constant";

/**
 * InProgressCoursesSectionProps - Interface for InProgressCoursesSection component props
 */
interface InProgressCoursesSectionProps {
    inProgressCourses: UserCourseWithCourse[];
    isLoading: boolean;
    onNavigate: (courseId: string) => void;
    onMarkAsComplete: (userCourseId: string) => void;
}

/**
 * InProgressCoursesSection - Pure UI component for displaying in-progress courses
 * @param props - The props for the InProgressCoursesSection component
 * @param props.inProgressCourses - Array of in-progress user courses with course data
 * @param props.isLoading - Whether the data is loading
 * @param props.onNavigate - Function to handle navigation when a course card is clicked
 * @param props.onMarkAsComplete - Function to handle marking a course as complete
 * @returns InProgressCoursesSection component
 */
export const InProgressCoursesSection = ({
    inProgressCourses,
    isLoading,
    onNavigate,
    onMarkAsComplete,
}: InProgressCoursesSectionProps) => {
    if (isLoading) {
        return (
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                        In Progress Courses
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[150px] flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    // Filter out user courses without course data
    const validCourses = inProgressCourses.filter(
        (userCourse) => userCourse.course !== null
    );

    // Limit to maximum of 3 courses
    const displayCourses = validCourses.slice(
        0,
        COURSE_CONSTANTS.USER_COURSE.MAXIMUM_TRACKED_COURSES
    );

    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                    In Progress Courses
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD()
                            .COURSES()
                            .LIST()
                            .HOME()}
                    >
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {validCourses.length > 0 ? (
                    <div className="space-y-3">
                        {displayCourses.map((userCourse) => {
                            const course = userCourse.course!;

                            /**
                             * handleMarkAsComplete - Handler for mark as complete button click
                             * @param e - Mouse event
                             */
                            const handleMarkAsComplete = (
                                e: React.MouseEvent
                            ) => {
                                e.stopPropagation();
                                onMarkAsComplete(userCourse.id);
                            };

                            return (
                                <div
                                    key={userCourse.id}
                                    className={cn(
                                        "group relative transition-all duration-200 p-5 rounded-lg border border-border/50 hover:border-border/80 hover:bg-muted/30 hover:shadow-sm"
                                    )}
                                >
                                    {/* Header: Title, Source, and Complete Button */}
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                className="font-semibold text-foreground text-base leading-tight mb-1 cursor-pointer hover:text-primary transition-colors"
                                                onClick={() =>
                                                    onNavigate(userCourse.id)
                                                }
                                            >
                                                {course.name}
                                            </h3>
                                            {course.source && (
                                                <p className="text-sm text-muted-foreground">
                                                    {course.source}
                                                </p>
                                            )}
                                        </div>
                                        {/* Mark as Complete Button - Always Visible */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleMarkAsComplete}
                                            className="h-8 px-3 flex items-center gap-1.5 flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                                            title="Mark as Complete"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span className="text-xs font-medium">
                                                Mark As Complete
                                            </span>
                                        </Button>
                                    </div>

                                    {/* Categories */}
                                    {course.categories &&
                                        course.categories.length > 0 && (
                                            <div
                                                className="flex flex-wrap items-center gap-2 cursor-pointer"
                                                onClick={() =>
                                                    onNavigate(userCourse.id)
                                                }
                                            >
                                                {course.categories
                                                    .filter(
                                                        (cat) =>
                                                            cat &&
                                                            cat.trim() !== ""
                                                    )
                                                    .slice(0, 3)
                                                    .map((category, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="text-xs font-normal px-2.5 py-1 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-all duration-200"
                                                        >
                                                            {category
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                category.slice(
                                                                    1
                                                                )}
                                                        </Badge>
                                                    ))}
                                            </div>
                                        )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">Currently learning</p>
                            <p className="text-sm">
                                Your active courses will show up here
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
