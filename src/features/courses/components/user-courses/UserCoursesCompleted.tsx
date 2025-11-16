import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { useUserCourses } from "@/features/courses/api";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

/**
 * UserCoursesCompleted - Smart component for displaying completed courses
 * Handles its own data fetching and category filtering
 * @returns UserCoursesCompleted component
 */
export const UserCoursesCompleted = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    // Fetch completed courses
    const { data, isLoading } = useUserCourses({
        field: "status",
        value: "COMPLETED",
        sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
        order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
        page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
        limit: COURSE_CONSTANTS.USER_COURSE.DEFAULT_LIMIT,
    });

    const completedCourses = data?.userCourses || [];

    if (isLoading) {
        return (
            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-foreground">
                        Completed Courses
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[150px] flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    // Filter out user courses without course data
    const validCourses = completedCourses.filter(
        (userCourse) => userCourse.course !== null
    );

    // Get unique categories from all completed courses
    const allCategories = Array.from(
        new Set(
            validCourses
                .flatMap((userCourse) => userCourse.course!.categories || [])
                .filter(Boolean)
        )
    ).sort();

    // Filter courses by selected category
    const filteredCourses = selectedCategory
        ? validCourses.filter((userCourse) =>
              userCourse.course!.categories?.some(
                  (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
              )
          )
        : validCourses;

    // Map to grid format - use userCourseId directly (like reading module does)
    const coursesForGrid = filteredCourses.map((userCourse) => ({
        id: userCourse.id, // Use userCourse.id for navigation
        title: userCourse.course!.name,
        source: userCourse.course!.source,
        categories: userCourse.course!.categories,
    }));

    const completedCoursesTotalCount = completedCourses.length;

    // Calculate most liked categories (top 3) from completed courses
    const categoryCounts = new Map<string, number>();
    validCourses.forEach((userCourse) => {
        userCourse.course!.categories?.forEach((category) => {
            if (category && category.trim() !== "") {
                const normalizedCategory = category.toLowerCase();
                categoryCounts.set(
                    normalizedCategory,
                    (categoryCounts.get(normalizedCategory) || 0) + 1
                );
            }
        });
    });

    // Get top 3 most frequent categories
    const topCategories = Array.from(categoryCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([category]) => {
            // Find the original case from allCategories
            return (
                allCategories.find((cat) => cat.toLowerCase() === category) ||
                category
            );
        });

    // Display categories from completed courses or predefined list if no courses
    const displayCategories =
        allCategories.length > 0
            ? allCategories
            : COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.slice(0, 12);

    /**
     * handleCategoryClick - Handler for category badge click
     * @param category - The category to filter by
     */
    const handleCategoryClick = (category: string) => {
        // Use case-insensitive comparison
        const isSameCategory =
            selectedCategory &&
            selectedCategory.toLowerCase() === category.toLowerCase();
        if (isSameCategory) {
            // If clicking the same category, clear the filter
            setSelectedCategory(null);
        } else {
            // Set the category as the filter
            setSelectedCategory(category);
        }
    };

    return (
        <Card className="min-h-[200px]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                    Completed Courses
                </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px]">
                {completedCourses.length > 0 ? (
                    <div className="space-y-6">
                        {/* Summary Bar */}
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-foreground">
                                        {completedCoursesTotalCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Courses Completed
                                    </div>
                                </div>
                                {topCategories.length > 0 && (
                                    <>
                                        <div className="w-px h-8 bg-border"></div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-muted-foreground font-medium">
                                                Top Categories:
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {topCategories.map(
                                                    (category) => (
                                                        <Badge
                                                            key={category}
                                                            variant="secondary"
                                                            className="text-xs font-normal px-2.5 py-1 bg-muted/60 hover:bg-muted/80 text-foreground border-0"
                                                        >
                                                            {category
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                category.slice(
                                                                    1
                                                                )}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Categories Filter Section */}
                        {displayCategories.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-foreground">
                                        Filter by Category
                                    </h3>
                                    {selectedCategory && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs h-6 px-2"
                                            onClick={() =>
                                                setSelectedCategory(null)
                                            }
                                        >
                                            <X className="h-3 w-3 mr-1" />
                                            Clear filter
                                        </Button>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    {displayCategories.map((category) => {
                                        const isSelected =
                                            selectedCategory &&
                                            selectedCategory.toLowerCase() ===
                                                category.toLowerCase();
                                        return (
                                            <Badge
                                                key={category}
                                                variant={
                                                    isSelected
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className={cn(
                                                    "text-xs font-normal cursor-pointer transition-all duration-200",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                        : "hover:bg-accent hover:text-accent-foreground"
                                                )}
                                                onClick={() =>
                                                    handleCategoryClick(
                                                        category
                                                    )
                                                }
                                            >
                                                {category}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Course Grid - Inline rendering like reading module */}
                        <div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-foreground">
                                    Your Library
                                    {selectedCategory && (
                                        <span className="text-sm font-normal text-muted-foreground ml-2">
                                            ({filteredCourses.length}{" "}
                                            {filteredCourses.length === 1
                                                ? "course"
                                                : "courses"}{" "}
                                            in "{selectedCategory}")
                                        </span>
                                    )}
                                </h3>
                            </div>
                            <div
                                className={cn(
                                    "grid gap-6 w-full",
                                    "grid-cols-1",
                                    "sm:grid-cols-2",
                                    "md:grid-cols-3",
                                    "2xl:grid-cols-4"
                                )}
                            >
                                {coursesForGrid.map((course) => (
                                    <Card
                                        key={course.id}
                                        className={cn(
                                            "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1.5 h-full flex flex-col border-border/50 hover:border-border/80 bg-card/50 backdrop-blur-sm"
                                        )}
                                        onClick={() =>
                                            navigate(
                                                ROUTES_CONSTANTS.DASHBOARD()
                                                    .COURSES()
                                                    .USER_COURSES()
                                                    .DETAIL(course.id)
                                            )
                                        }
                                    >
                                        <div className="p-8 sm:p-10 lg:p-12 flex-1 flex flex-col min-h-[220px] sm:min-h-[240px] lg:min-h-[260px]">
                                            {/* Title */}
                                            <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-[1.2] tracking-[-0.02em] mb-4">
                                                {course.title}
                                            </h3>

                                            {/* Source */}
                                            {course.source &&
                                                course.source.trim() !== "" && (
                                                    <div className="mb-6">
                                                        <p className="text-sm sm:text-base text-muted-foreground/80 truncate font-medium">
                                                            {course.source}
                                                        </p>
                                                    </div>
                                                )}

                                            {/* Categories */}
                                            {course.categories &&
                                                course.categories.length > 0 && (
                                                    <div className="flex flex-wrap items-center gap-2.5 mt-auto pt-4 border-t border-border/30">
                                                        {course.categories
                                                            .filter(
                                                                (cat) =>
                                                                    cat &&
                                                                    cat.trim() !==
                                                                        ""
                                                            )
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
                                                                        className="text-xs sm:text-sm font-normal px-3.5 py-1.5 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-all duration-200 group-hover:bg-muted/60"
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
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                            <p className="text-lg">
                                Your completed course journey
                            </p>
                            <p className="text-sm">
                                Courses will appear here once you finish them
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

