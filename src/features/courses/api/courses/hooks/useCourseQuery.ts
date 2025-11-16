import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { useSearchParams } from "react-router";
import type { CoursesQuery } from "../models/model";
import { useMemo } from "react";

/**
 * useCourseQuery - Hook for getting and setting course query parameters
 * @returns The course query parameters and setter functions
 */
export const useCourseQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query: CoursesQuery = useMemo<CoursesQuery>(() => {
        const page = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : COURSE_CONSTANTS.COURSE.DEFAULT_PAGE;
        const limit = searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : COURSE_CONSTANTS.COURSE.DEFAULT_LIMIT;
        const value =
            searchParams.get("value") || COURSE_CONSTANTS.COURSE.DEFAULT_VALUE;

        return {
            page,
            limit,
            value,
            order: COURSE_CONSTANTS.COURSE.DEFAULT_ORDER,
            sort: COURSE_CONSTANTS.COURSE.DEFAULT_SORT,
        };
    }, [searchParams]);

    /**
     * setPage - Handler for setting the page
     * @param page - The page to set
     */
    const setPage = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        setSearchParams(newParams);
    };

    /**
     * setValue - Handler for setting the value (search or category)
     * @param value - The value to set (course name or category name)
     */
    const setValue = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value.trim()) {
            newParams.set("value", value.trim());
        } else {
            newParams.delete("value");
        }
        // Reset to first page when search/category changes
        newParams.set("page", COURSE_CONSTANTS.COURSE.DEFAULT_PAGE.toString());
        setSearchParams(newParams);
    };

    return {
        query,
        setPage,
        setValue,
    };
};
