import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Loader2,
    Calendar,
    CalendarDays,
    Clock,
    ExternalLink,
    PieChart,
} from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { BackButton } from "@/components/common/BackButton";
import { RecordingsGraph } from "../recordings/RecordingsGraph";
import { useUserCourse } from "@/features/courses/api/user-courses/hooks/useUserCourse";
import { useDeleteUserCourse } from "@/features/courses/api/user-courses/hooks/useDeleteUserCourse";
import { useMarkAsComplete } from "@/features/courses/api/user-courses/hooks/useMarkAsComplete";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { DatesUtils } from "@/lib/utils/dates";

/**
 * UserCourseDetail - Smart component for displaying user course details
 * Handles its own data fetching, actions, and UI rendering
 * @param userCourseId - The user course ID to display
 * @returns UserCourseDetail component
 */
export const UserCourseDetail = ({
    userCourseId,
}: {
    userCourseId: string;
}) => {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { data: userCourse, isLoading } = useUserCourse(userCourseId);
    const { mutate: deleteUserCourse } = useDeleteUserCourse(userCourseId);
    const { markAsComplete } = useMarkAsComplete();

    const handleMarkAsComplete = async () => {
        await markAsComplete(userCourseId);
        toast.success("Course marked as complete");
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleDelete = () => {
        deleteUserCourse(undefined, {
            onSuccess: () => {
                toast.success("User course deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME());
            },
        });
        setShowDeleteDialog(false);
    };

    if (isLoading || !userCourse || !userCourse.course) {
        return (
            <Card>
                <CardHeader>
                    <BackButton
                        onClick={() =>
                            navigate(
                                ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME()
                            )
                        }
                    />
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex justify-center py-12">
                        <Loader2 className="size-8 animate-spin" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const course = userCourse.course;
    const isCompleted = userCourse.status === "COMPLETED";
    const canMarkAsComplete = !isCompleted;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <BackButton onClick={() => navigate(-1)} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="shadow-sm"
                        >
                            Actions
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {canMarkAsComplete && (
                            <DropdownMenuItem
                                onClick={handleMarkAsComplete}
                                disabled={!canMarkAsComplete}
                            >
                                Mark as Complete
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            onClick={handleDeleteClick}
                            className="text-destructive focus:text-destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-8 sm:p-10 lg:p-12">
                <div className="space-y-8 sm:space-y-10">
                    {/* Course Header - Title and Categories */}
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                                {course.name}
                            </h1>
                        </div>

                        {/* Categories */}
                        {course.categories && course.categories.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2.5 pt-2">
                                {course.categories
                                    .filter((cat) => cat && cat.trim() !== "")
                                    .map((category, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-sm font-normal px-3.5 py-1.5 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-colors"
                                        >
                                            {category.charAt(0).toUpperCase() +
                                                category.slice(1)}
                                        </Badge>
                                    ))}
                            </div>
                        )}

                        {/* Status Badge and Source Row */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            {/* Status Badge */}
                            <Badge
                                variant={
                                    userCourse.status === "COMPLETED"
                                        ? "default"
                                        : "secondary"
                                }
                                className="text-sm px-4 py-2"
                            >
                                {userCourse.status === "COMPLETED"
                                    ? "Completed"
                                    : "In Progress"}
                            </Badge>

                            {/* Source */}
                            {course.source && course.source.trim() !== "" && (
                                <div className="text-base text-muted-foreground/80 font-medium">
                                    {course.source}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Course Description */}
                    {course.description && (
                        <div className="space-y-3 pt-4 border-t border-border/50">
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Overview
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed whitespace-pre-wrap">
                                {course.description}
                            </p>
                        </div>
                    )}

                    {/* Combined Timeline, Statistics, and Recording Graph Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-border/50">
                        {/* Timeline Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Timeline
                            </h2>
                            <div className="space-y-3">
                                {/* Start Date */}
                                {userCourse.startDate && (
                                    <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                                        <div className="p-2.5 bg-primary/10 rounded-lg flex-shrink-0">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                                Started Learning
                                            </p>
                                            <p className="text-base font-semibold text-foreground">
                                                {DatesUtils.formatDate(
                                                    userCourse.startDate
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Complete Date */}
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                                    <div className="p-2.5 bg-green-500/10 rounded-lg flex-shrink-0">
                                        <CalendarDays className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                            Completed
                                        </p>
                                        <p className="text-base font-semibold text-foreground">
                                            {userCourse.completedDate
                                                ? DatesUtils.formatDate(
                                                      userCourse.completedDate
                                                  )
                                                : "Not completed yet"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                                Progress
                            </h2>
                            <div className="space-y-3">
                                {/* Total Days */}
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                                    <div className="p-2.5 bg-blue-500/10 rounded-lg flex-shrink-0">
                                        <CalendarDays className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                            Total Days
                                        </p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {userCourse.totalDays}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Time */}
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                                    <div className="p-2.5 bg-purple-500/10 rounded-lg flex-shrink-0">
                                        <Clock className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                                            Time Spent
                                        </p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {
                                                DatesUtils.formatDuration(
                                                    userCourse.totalMinutes
                                                ).value
                                            }{" "}
                                            <span className="text-base font-normal text-muted-foreground">
                                                {
                                                    DatesUtils.formatDuration(
                                                        userCourse.totalMinutes
                                                    ).unit
                                                }
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recording Statistics Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground flex items-center gap-2">
                                <PieChart className="h-5 w-5" />
                                Recording Stats
                            </h2>
                            <div className="flex items-center justify-center p-4 rounded-lg border border-border/50 bg-muted/10">
                                <RecordingsGraph userCourseId={userCourse.id} />
                            </div>
                        </div>
                    </div>

                    {/* Course Metadata - Website */}
                    {course.officialWebsiteUrl && (
                        <div className="pt-4 border-t border-border/50">
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-auto p-0 text-sm sm:text-base"
                            >
                                <a
                                    href={course.officialWebsiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Visit Course Website</span>
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>

            <DeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Course"
                description="Are you sure you want to delete this course? This action cannot be undone and will remove all associated progress."
                onConfirm={handleDelete}
            />
        </Card>
    );
};
