import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { UserCourseWithCourse } from "../model/model";
import { mapToUserCourse } from "../model/mapper";

/**
 * useUserCourse - Hook for getting a user course by id
 * @param id - The id of the user course to get
 * @returns useQuery hook for getting a user course by id
 */
export const useUserCourse = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().USER_COURSES.DETAIL(id),
        queryFn: async (): Promise<UserCourseWithCourse> => {
            const response = await ApiClient.api.userCourseControllerFindById(
                id,
                {
                    expand: true,
                }
            );
            return mapToUserCourse(response.data);
        },
        enabled: !!id,
    });
};
