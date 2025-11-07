import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { ICourses } from "../models/model";
import { mapToCourses } from "../models/mapper";
import type { CoursesResponseDto } from "@/lib/api/api";

/**
 * useMyCourses - Hook for getting a list of courses for the current user
 * @param isPrivate - Whether to get private courses (true) or public courses (false)
 * @returns useQuery hook for getting a list of courses for the current user
 */
export const useMyCourses = (isPrivate: boolean = false) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().COURSES.MY_COURSES(isPrivate),
        queryFn: async (): Promise<ICourses> => {
            const response = await ApiClient.api.courseControllerMyCourses({
                field: "isPublic",
                value: isPrivate ? "false" : undefined,
            });
            const coursesResponse: CoursesResponseDto = response.data;
            return mapToCourses(coursesResponse);
        },
    });
};
