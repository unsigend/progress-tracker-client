import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";
import { PieChart } from "@/components/charts/PieChart";
import type { UserCourseWithCourse } from "@/entities/course/user-courses/model/model";
import { TextUtils } from "@/lib/utils/text";

/**
 * RecordingCategoryData - Interface for categorized recording data
 */
interface RecordingCategoryData {
    key: string;
    value: number;
}

/**
 * UserCourseWithRecordings - Interface for user course with categorized recordings
 */
interface UserCourseWithRecordings {
    userCourse: UserCourseWithCourse;
    recordingsData: RecordingCategoryData[];
    isLoadingRecordings: boolean;
}

/**
 * InProgressCoursesListProps - Interface for InProgressCoursesList component props
 */
interface InProgressCoursesListProps {
    coursesWithRecordings: UserCourseWithRecordings[];
    isLoading: boolean;
    onNavigate: (userCourseId: string) => void;
    onMarkAsComplete: (userCourseId: string) => void;
}

/**
 * InProgressCourseCardProps - Interface for InProgressCourseCard component props
 */
interface InProgressCourseCardProps {
    userCourse: UserCourseWithRecordings["userCourse"];
    recordingsData: RecordingCategoryData[];
    isLoadingRecordings: boolean;
    onNavigate: (userCourseId: string) => void;
    onMarkAsComplete: (userCourseId: string) => void;
}

/**
 * InProgressCourseCard - Component for displaying a single in-progress course with pie chart
 * @param props - The props for the InProgressCourseCard component
 * @returns InProgressCourseCard component
 */
/**
 * Generate colors for legend
 * Uses normal colors: green, blue, red, yellow, etc.
 */
const getLegendColor = (index: number): string => {
    const colors = [
        "#3b82f6", // Blue
        "#10b981", // Green
        "#ef4444", // Red
        "#f59e0b", // Yellow/Amber
        "#8b5cf6", // Purple
        "#06b6d4", // Cyan
        "#f97316", // Orange
        "#ec4899", // Pink
        "#14b8a6", // Teal
        "#84cc16", // Lime
    ];
    return colors[index % colors.length];
};

const InProgressCourseCard = ({
    userCourse,
    recordingsData,
    isLoadingRecordings,
    onNavigate,
    onMarkAsComplete,
}: InProgressCourseCardProps) => {
    const course = userCourse.course!;

    /**
     * handleMarkAsComplete - Handler for mark as complete button click
     * @param e - Mouse event
     */
    const handleMarkAsComplete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkAsComplete(userCourse.id);
    };

    const hasRecordings = recordingsData.length > 0;

    // Calculate total minutes from recordings data
    const totalMinutes = recordingsData.reduce(
        (sum, item) => sum + item.value,
        0
    );
    const totalTimeFormatted = TextUtils.formatDurationShort(totalMinutes);

    return (
        <div
            className={cn(
                "group relative transition-all duration-200 p-3 rounded-lg border border-border/50 hover:border-border/80 hover:bg-muted/30 hover:shadow-sm",
                "grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3"
            )}
        >
            {/* Mark as Complete Button - Top Right Corner */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAsComplete}
                className="absolute top-3 right-3 h-6 px-2 flex items-center gap-1 flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-xs z-10"
                title="Mark as Complete"
            >
                <CheckCircle2 className="h-3 w-3" />
                <span className="font-medium">Mark As Complete</span>
            </Button>

            {/* Left Part: Course Details */}
            <div className="flex flex-col justify-between min-w-0 pr-20">
                {/* Title and Source */}
                <div className="mb-1.5">
                    <h3
                        className="font-semibold text-foreground text-sm leading-tight mb-0.5 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => onNavigate(userCourse.id)}
                    >
                        {course.name}
                    </h3>
                    {course.source && (
                        <p className="text-xs text-muted-foreground">
                            {course.source}
                        </p>
                    )}
                </div>

                {/* Categories */}
                {course.categories && course.categories.length > 0 && (
                    <div
                        className="flex flex-wrap items-center gap-1 cursor-pointer"
                        onClick={() => onNavigate(userCourse.id)}
                    >
                        {(course.categories || [])
                            .filter((cat) => cat && cat.trim() !== "")
                            .slice(0, 3)
                            .map((category, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs font-normal px-1.5 py-0.5 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-all duration-200"
                                >
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </Badge>
                            ))}
                    </div>
                )}
            </div>

            {/* Right Part: Time Spent and Pie Chart */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
                {isLoadingRecordings ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                ) : hasRecordings ? (
                    <>
                        {/* Time Spent - Left of Chart */}
                        <div className="flex-shrink-0">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">
                                Time Spent
                            </p>
                            <p className="text-lg font-bold text-foreground">
                                {totalTimeFormatted}
                            </p>
                        </div>

                        {/* Pie Chart and Legend */}
                        <div className="flex-shrink-0">
                            <div className="w-[180px] space-y-1.5">
                                <PieChart
                                    data={recordingsData.map((item, index) => ({
                                        ...item,
                                        fill: getLegendColor(index),
                                    }))}
                                    className="w-full aspect-square"
                                    showTooltip={true}
                                    innerRadius={35}
                                    outerRadius={60}
                                    showLegend={false}
                                />
                                {/* Custom Legend with Text Labels */}
                                <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
                                    {recordingsData.map((item, index) => (
                                        <div
                                            key={item.key}
                                            className="flex items-center gap-1"
                                        >
                                            <div
                                                className="h-1.5 w-1.5 shrink-0 rounded-[2px]"
                                                style={{
                                                    backgroundColor:
                                                        getLegendColor(index),
                                                }}
                                            />
                                            <span className="text-muted-foreground">
                                                {item.key}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <p className="text-xs">No recordings yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * InProgressCoursesList - Pure UI component for displaying in-progress courses with pie charts
 * @param props - The props for the InProgressCoursesList component
 * @param props.coursesWithRecordings - Array of user courses with categorized recordings data
 * @param props.isLoading - Whether the data is loading
 * @param props.onNavigate - Function to handle navigation when a course card is clicked
 * @param props.onMarkAsComplete - Function to handle marking a course as complete
 * @returns InProgressCoursesList component
 */
export const InProgressCoursesList = ({
    coursesWithRecordings,
    isLoading,
    onNavigate,
    onMarkAsComplete,
}: InProgressCoursesListProps) => {
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

    const hasCourses = coursesWithRecordings.length > 0;

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
                {hasCourses ? (
                    <div className="space-y-2.5">
                        {coursesWithRecordings.map((item) => (
                            <InProgressCourseCard
                                key={item.userCourse.id}
                                userCourse={item.userCourse}
                                recordingsData={item.recordingsData}
                                isLoadingRecordings={item.isLoadingRecordings}
                                onNavigate={onNavigate}
                                onMarkAsComplete={onMarkAsComplete}
                            />
                        ))}
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
