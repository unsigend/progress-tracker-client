import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { ICourses, ICoursesQuery } from "../models/model";
import { mapToCourse } from "../models/mapper";
import type { CoursesResponseDto } from "@/lib/api/api";

/**
 * useCourses - Hook for getting a list of courses
 * @param query - The query parameters for getting courses
 * @returns useQuery hook for getting courses with pagination data
 */
export const useCourses = (query: ICoursesQuery) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().COURSES.LIST(query),
        queryFn: async (): Promise<ICourses> => {
            const response = await ApiClient.api.courseControllerFindAll(query);
            const coursesResponse: CoursesResponseDto = response.data;
            return {
                courses: coursesResponse.courses.map(mapToCourse),
                totalCount: coursesResponse.totalCount,
            };
        },
    });
};
