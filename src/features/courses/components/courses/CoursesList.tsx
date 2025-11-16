import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { SearchBar } from "@/components/common/SearchBar";
import { SmartPagination } from "@/components/common/SmartPagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { useCourses } from "@/features/courses/api/courses/hooks/useCourses";
import { useCourseQuery } from "@/features/courses/api/courses/hooks/useCourseQuery";
import { cn } from "@/lib/utils";

/**
 * CoursesList - Smart component for displaying the course library
 * Handles data fetching, filtering, search, pagination, and UI rendering
 * @returns CoursesList component
 */
export const CoursesList = () => {
    const navigate = useNavigate();
    const { query, setPage, setValue } = useCourseQuery();
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState(
        query.value || COURSE_CONSTANTS.COURSE.DEFAULT_VALUE
    );
    const { data: coursesData, isLoading } = useCourses(query);

    useEffect(() => {
        const totalCount = coursesData?.totalCount;
        if (totalCount !== undefined) {
            setTotalPages(
                Math.ceil(
                    totalCount /
                        (query.limit || COURSE_CONSTANTS.COURSE.DEFAULT_LIMIT)
                )
            );
        }
    }, [coursesData?.totalCount, query.limit]);

    // Sync local searchTerm with query value
    useEffect(() => {
        setSearchTerm(query.value || COURSE_CONSTANTS.COURSE.DEFAULT_VALUE);
    }, [query.value]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm("");
        setValue("");
    };

    const handleCategoryClick = (category: string) => {
        const searchValue = query.value || COURSE_CONSTANTS.COURSE.DEFAULT_VALUE;
        const selectedCategory = searchValue
            ? COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.find(
                  (cat) => cat.toLowerCase() === searchValue.toLowerCase()
              ) || null
            : null;

        if (selectedCategory === category) {
            // If clicking the same category, clear the search
            setValue("");
        } else {
            // Set the category as the search value
            setValue(category);
        }
    };

    const handleNavigate = (id: string) => {
        navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().DETAIL(id));
    };

    const courses = coursesData?.courses || [];
    const searchValue = query.value || COURSE_CONSTANTS.COURSE.DEFAULT_VALUE;
    const selectedCategory = searchValue
        ? COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.find(
              (cat) => cat.toLowerCase() === searchValue.toLowerCase()
          ) || null
        : null;

    // Get unique categories from all courses
    const allCategories = Array.from(
        new Set(courses.flatMap((course) => course.categories || []).filter(Boolean))
    ).sort();

    // Display popular categories from predefined list if no courses yet
    const displayCategories =
        allCategories.length > 0
            ? allCategories
            : COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.slice(0, 12);

    return (
        <div className="w-full">
            <Card>
                <CardHeader className="pb-4">
                    {/* Library Title - Centered above search */}
                    <div className="flex justify-center mb-6">
                        <h1
                            className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                    dark:from-gray-50 dark:via-gray-200 dark:to-gray-50 bg-clip-text text-transparent"
                        >
                            Explore Your Courses
                        </h1>
                    </div>

                    {/* Search Section - Centered */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            <SearchBar
                                placeholder="Search by category or course name..."
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onClear={handleClear}
                                size="large"
                                onSubmit={handleSearchSubmit}
                            />
                        </div>
                    </div>

                    {/* Categories Section */}
                    {displayCategories.length > 0 && (
                        <div className="mt-6">
                            <div className="flex flex-wrap items-center gap-2 justify-center">
                                {displayCategories.map((category) => (
                                    <Badge
                                        key={category}
                                        variant={
                                            selectedCategory === category
                                                ? "default"
                                                : "outline"
                                        }
                                        className={cn(
                                            "text-sm font-normal cursor-pointer transition-all duration-200",
                                            selectedCategory === category
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                    >
                                        {category}
                                    </Badge>
                                ))}
                                {selectedCategory && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs h-6 px-2"
                                        onClick={() => setValue("")}
                                    >
                                        Clear filter
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Create Course Button - Right Aligned */}
                    <div className="flex justify-end mt-4">
                        <Link
                            to={ROUTES_CONSTANTS.DASHBOARD()
                                .COURSES()
                                .LIST()
                                .NEW()}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                                Create Course
                            </Button>
                        </Link>
                    </div>
                </CardHeader>

                <CardContent className="min-h-[700px]">
                    {/* Loading State */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-30">
                            <Loader2 className="size-6 animate-spin" />
                        </div>
                    ) : courses.length > 0 ? (
                        <div
                            className={cn(
                                "grid gap-6 w-full",
                                "grid-cols-1",
                                "sm:grid-cols-2",
                                "md:grid-cols-3",
                                "2xl:grid-cols-4"
                            )}
                        >
                            {courses.map((course) => (
                                <Card
                                    key={course.id}
                                    className={cn(
                                        "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1.5 h-full flex flex-col border-border/50 hover:border-border/80 bg-card/50 backdrop-blur-sm"
                                    )}
                                    onClick={() => handleNavigate(course.id)}
                                >
                                    <div className="p-8 sm:p-10 lg:p-12 flex-1 flex flex-col min-h-[220px] sm:min-h-[240px] lg:min-h-[260px]">
                                        {/* Title */}
                                        <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-[1.2] tracking-[-0.02em] mb-4">
                                            {course.name}
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
                                                        .map((category, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className="text-xs sm:text-sm font-normal px-3.5 py-1.5 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-all duration-200 group-hover:bg-muted/60"
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
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-muted-foreground text-sm">
                                No courses found
                            </p>
                        </div>
                    )}
                </CardContent>

                <div className="mt-5 pb-4">
                    {/* Pagination */}
                    <SmartPagination
                        currentPage={
                            query.page || COURSE_CONSTANTS.COURSE.DEFAULT_PAGE
                        }
                        totalPages={totalPages}
                        setCurrentPage={setPage}
                    />
                </div>
            </Card>
        </div>
    );
};
