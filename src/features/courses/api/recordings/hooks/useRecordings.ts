import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { CourseRecordings } from "../models/model";
import { mapToCourseRecordings } from "../models/mapper";

/**
 * useCourseRecordings - Hook for fetching course recordings
 * @param userCourseId - The ID of the user course to fetch recordings for
 * @returns The course recordings query
 */
export const useCourseRecordings = (userCourseId: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().COURSE_RECORDINGS.LIST(userCourseId),
        queryFn: async (): Promise<CourseRecordings> => {
            const response =
                await ApiClient.api.userCourseControllerFindRecordings(
                    userCourseId
                );
            console.log(response.data);

            return mapToCourseRecordings(response.data);
        },
        enabled: !!userCourseId,
    });
};
