import { Link } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { SearchBar } from "@/components/common/SearchBar";
import { SmartPagination } from "@/components/common/SmartPagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CourseGrid } from "./CourseGrid";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import type { ICourse } from "@/entities/course/courses/models/model";
import { cn } from "@/lib/utils";

/**
 * CourseLibraryProps - Interface for CourseLibrary component props
 */
interface CourseLibraryProps {
    courses: ICourse[];
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    searchValue: string;
    onSearchSubmit: (term: string) => void;
    selectedCategory: string | null;
    onCategorySelect: (category: string) => void;
    onNavigate: (id: string) => void;
}

/**
 * CourseLibrary - Pure UI component for displaying the course library
 * @param props - The props for the CourseLibrary component
 * @param props.courses - Array of courses to display
 * @param props.isLoading - Whether the courses are loading
 * @param props.currentPage - Current page number
 * @param props.totalPages - Total number of pages
 * @param props.setCurrentPage - Handler for setting the current page
 * @param props.onSearchSubmit - Handler for search form submission
 * @param props.selectedCategory - Currently selected category filter
 * @param props.onCategorySelect - Handler for category selection
 * @param props.onNavigate - Handler for course navigation
 * @returns CourseLibrary component
 */
export const CourseLibrary = ({
    courses,
    isLoading,
    currentPage,
    totalPages,
    setCurrentPage,
    searchValue,
    onSearchSubmit,
    selectedCategory,
    onCategorySelect,
    onNavigate,
}: CourseLibraryProps) => {
    const [searchTerm, setSearchTerm] = useState(searchValue);

    // Sync local searchTerm with prop searchValue
    useEffect(() => {
        setSearchTerm(searchValue);
    }, [searchValue]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearchSubmit(searchTerm);
    };

    const handleClear = () => {
        setSearchTerm("");
        onSearchSubmit("");
    };

    const handleCategoryClick = (category: string) => {
        if (selectedCategory === category) {
            // If clicking the same category, clear the search
            onCategorySelect("");
        } else {
            // Set the category as the search value
            onCategorySelect(category);
        }
    };

    // Get unique categories from all courses
    const allCategories = Array.from(
        new Set(
            courses.flatMap((course) => course.categories || []).filter(Boolean)
        )
    ).sort();

    // Display popular categories from predefined list if no courses yet
    const displayCategories =
        allCategories.length > 0
            ? allCategories
            : COURSE_CONSTANTS.PREDEFINED_CATEGORIES.slice(0, 12);

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
                                        onClick={() => onCategorySelect("")}
                                    >
                                        Clear filter
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Create Course Button - Right Aligned */}
                    <div className="flex justify-end mt-4">
                        <Link to={ROUTES_CONSTANTS.DASHBOARD().COURSES().NEW()}>
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
                    ) : (
                        <CourseGrid
                            courses={courses.map((course) => ({
                                id: course.id,
                                image: course.courseImageUrl,
                                title: course.name,
                                source: course.source,
                                categories: course.categories,
                            }))}
                            onNavigate={onNavigate}
                        />
                    )}
                </CardContent>

                <div className="mt-5 pb-4">
                    {/* Pagination */}
                    <SmartPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </Card>
        </div>
    );
};
