import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { useUserCourses } from "@/features/courses/api/user-courses/hooks/useUserCourses";
import { useMarkAsComplete } from "@/features/courses/api/user-courses/hooks/useMarkAsComplete";
import { RecordingsGraph } from "../recordings/RecordingsGraph";
import { cn } from "@/lib/utils";

/**
 * UserCoursesInProgress - Smart component for in-progress courses
 * Displays a list of in-progress courses with their details and recordings statistics
 * @returns UserCoursesInProgress component
 */
export const UserCoursesInProgress = () => {
    const navigate = useNavigate();
    const { markAsComplete } = useMarkAsComplete();

    const { data, isLoading } = useUserCourses({
        field: "status",
        value: "IN_PROGRESS",
        sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
        order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
        page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
        limit: COURSE_CONSTANTS.USER_COURSE.MAXIMUM_TRACKED_COURSES,
    });

    const inProgressCourses =
        data?.userCourses.filter((uc) => uc.course !== null) || [];

    const handleNavigate = (userCourseId: string) => {
        navigate(
            ROUTES_CONSTANTS.DASHBOARD()
                .COURSES()
                .USER_COURSES()
                .DETAIL(userCourseId)
        );
    };

    const handleMarkAsComplete = async (userCourseId: string) => {
        await markAsComplete(userCourseId);
        toast.success("Course marked as complete");
    };

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
                {inProgressCourses.length > 0 ? (
                    <div className="space-y-1.5">
                        {inProgressCourses.map((userCourse) => {
                            const course = userCourse.course!;

                            return (
                                <div
                                    key={userCourse.id}
                                    className={cn(
                                        "group relative transition-all duration-200 rounded-lg border border-border/50 hover:border-border hover:shadow-md bg-card overflow-hidden",
                                        "flex flex-row items-stretch"
                                    )}
                                >
                                    {/* LEFT: User Course Info */}
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="flex flex-col justify-between p-2.5 cursor-pointer hover:bg-muted/20 transition-colors h-full gap-2"
                                            onClick={() =>
                                                handleNavigate(userCourse.id)
                                            }
                                        >
                                            {/* Course Info - Compact */}
                                            <div className="space-y-1 p-3">
                                                {/* Title - Large & Bold */}
                                                <h3 className="font-bold text-foreground text-xl leading-snug hover:text-primary transition-colors line-clamp-2">
                                                    {course.name}
                                                </h3>

                                                {/* Source - Medium */}
                                                {course.source && (
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        {course.source}
                                                    </p>
                                                )}

                                                {/* Categories - Bigger badges */}
                                                {course.categories &&
                                                    course.categories.length >
                                                        0 && (
                                                        <div className="flex flex-wrap items-center gap-1.5 pt-4">
                                                            {course.categories
                                                                .filter(
                                                                    (cat) =>
                                                                        cat &&
                                                                        cat.trim() !==
                                                                            ""
                                                                )
                                                                .slice(0, 4)
                                                                .map(
                                                                    (
                                                                        category,
                                                                        index
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                index
                                                                            }
                                                                            variant="secondary"
                                                                            className="text-xs font-medium px-2 py-0.5 bg-muted/60 hover:bg-muted text-muted-foreground border-0"
                                                                        >
                                                                            {category
                                                                                .charAt(
                                                                                    0
                                                                                )
                                                                                .toUpperCase() +
                                                                                category.slice(
                                                                                    1
                                                                                )}
                                                                        </Badge>
                                                                    )
                                                                )}
                                                        </div>
                                                    )}
                                            </div>

                                            {/* Mark as Complete Button - Compact */}
                                            <div className="pt-1.5 border-t border-border/40">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsComplete(
                                                            userCourse.id
                                                        );
                                                    }}
                                                    className="h-7 px-2.5 flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-semibold"
                                                >
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    Mark As Complete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DIVIDER */}
                                    <div className="w-px bg-border/50 flex-shrink-0" />

                                    {/* RIGHT: Course Recordings Graph */}
                                    <div className="flex-shrink-0">
                                        <RecordingsGraph
                                            userCourseId={userCourse.id}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full py-8">
                        <div className="text-center text-muted-foreground">
                            <p className="text-base">Currently learning</p>
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
