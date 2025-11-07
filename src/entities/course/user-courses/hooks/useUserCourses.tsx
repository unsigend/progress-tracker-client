import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IUserCourseQuery, IUserCoursesWithCourse } from "../model/model";
import { mapToUserCourses } from "../model/mapper";
import type { UserCoursesResponseDto } from "@/lib/api/api";

/**
 * useUserCourses - Hook for getting a list of user courses
 * @param query - The query parameters for getting user courses
 * @returns useQuery hook for getting user courses with pagination data
 */
export const useUserCourses = (query: IUserCourseQuery) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().USER_COURSES.LIST(query),
        queryFn: async (): Promise<IUserCoursesWithCourse> => {
            const response = await ApiClient.api.userCourseControllerFindAll({
                field: query.field,
                value: query.value,
                sort: query.sort,
                order: query.order,
                limit: query.limit,
                page: query.page,
                expand: true,
            });
            const userCoursesResponse: UserCoursesResponseDto = response.data;
            return mapToUserCourses(userCoursesResponse);
        },
    });
};
