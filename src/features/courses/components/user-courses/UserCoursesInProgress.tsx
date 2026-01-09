import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, CheckCircle2, GraduationCap } from "lucide-react";
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
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2.5 text-xl font-semibold">
                        <div className="p-1.5 bg-muted rounded-lg">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </div>
                        In Progress Courses
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[150px] flex items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="min-h-[200px]">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-xl font-semibold">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-muted rounded-lg">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </div>
                        In Progress Courses
                    </div>
                    <Link
                        to={ROUTES_CONSTANTS.DASHBOARD()
                            .COURSES()
                            .LIST()
                            .HOME()}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {inProgressCourses.length > 0 ? (
                    <div className="space-y-3">
                        {inProgressCourses.map((userCourse) => {
                            const course = userCourse.course!;

                            return (
                                <div
                                    key={userCourse.id}
                                    className={cn(
                                        "group relative transition-all duration-300 rounded-xl border border-border/50 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-0.5 bg-card overflow-hidden",
                                        "flex flex-col lg:flex-row items-stretch"
                                    )}
                                >
                                    {/* LEFT: User Course Info */}
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="flex flex-col justify-between p-4 sm:p-5 cursor-pointer hover:bg-muted/30 transition-colors h-full gap-3"
                                            onClick={() =>
                                                handleNavigate(userCourse.id)
                                            }
                                        >
                                            {/* Course Info */}
                                            <div className="space-y-2.5">
                                                {/* Title */}
                                                <h3 className="font-bold text-foreground text-lg sm:text-xl leading-tight hover:text-primary transition-colors line-clamp-2">
                                                    {course.name}
                                                </h3>

                                                {/* Source */}
                                                {course.source && (
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-muted-foreground truncate">
                                                            {course.source}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Categories */}
                                                {course.categories &&
                                                    course.categories.length >
                                                        0 && (
                                                        <div className="flex flex-wrap items-center gap-2 pt-1">
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
                                                                            className="text-xs font-medium px-2.5 py-1 bg-muted/70 hover:bg-muted text-muted-foreground border-0 transition-colors"
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

                                            {/* Mark as Complete Button */}
                                            <div className="pt-2 border-t border-border/50">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsComplete(
                                                            userCourse.id
                                                        );
                                                    }}
                                                    className="h-8 px-3 flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all text-xs font-semibold shadow-sm hover:shadow-md"
                                                >
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Mark As Complete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DIVIDER */}
                                    <div className="h-px w-full lg:h-full lg:w-px bg-border/60 flex-shrink-0" />

                                    {/* RIGHT: Course Recordings Graph */}
                                    <div className="flex-shrink-0 w-full lg:w-auto">
                                        <RecordingsGraph
                                            userCourseId={userCourse.id}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full py-16">
                        <div className="text-center text-muted-foreground">
                            <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                                <GraduationCap className="h-8 w-8 opacity-60" />
                            </div>
                            <p className="text-lg font-semibold mb-1.5">
                                Currently learning
                            </p>
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
