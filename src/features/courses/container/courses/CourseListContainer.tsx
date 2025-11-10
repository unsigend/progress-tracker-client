import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CourseLibrary } from "@/features/courses/components/courses/CourseLibrary";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useCourses } from "@/entities/course/courses/hooks/useCourses";
import { useCourseQuery } from "@/entities/course/courses/hooks/useCourseQuery";

/**
 * CourseListContainer - Container component for the course list page
 * Handles state management, filtering, and pagination logic
 * @returns CourseListContainer component
 */
export const CourseListContainer = () => {
    const navigate = useNavigate();

    // State management
    const { query, setPage, setValue } = useCourseQuery();
    const [totalPages, setTotalPages] = useState(0);
    const { data: coursesData, isLoading } = useCourses(query);

    // Calculate total pages
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

    // Unified handler for both search and category selection
    const handleSearchOrCategory = (term: string) => {
        setValue(term);
    };

    const handleNavigate = (id: string) => {
        navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().DETAIL(id));
    };

    // Derive selectedCategory from query.value if it matches a predefined category
    const searchValue = query.value || COURSE_CONSTANTS.COURSE.DEFAULT_VALUE;
    const selectedCategory = searchValue
        ? COURSE_CONSTANTS.COURSE.PREDEFINED_CATEGORIES.find(
              (cat) => cat.toLowerCase() === searchValue.toLowerCase()
          ) || null
        : null;

    return (
        <CourseLibrary
            courses={coursesData?.courses || []}
            isLoading={isLoading}
            currentPage={query.page || COURSE_CONSTANTS.COURSE.DEFAULT_PAGE}
            totalPages={totalPages}
            setCurrentPage={setPage}
            searchValue={searchValue}
            onSearchSubmit={handleSearchOrCategory}
            selectedCategory={selectedCategory}
            onCategorySelect={handleSearchOrCategory}
            onNavigate={handleNavigate}
        />
    );
};
