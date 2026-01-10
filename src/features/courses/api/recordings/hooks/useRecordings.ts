import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { CourseRecordings } from "../models/model";
import { mapToCourseRecordings } from "../models/mapper";

const DEFAULT_PAGE_SIZE = 8;

/**
 * useCourseRecordings - Hook for fetching course recordings
 * @param userCourseId - The ID of the user course to fetch recordings for
 * @param page - The page number to fetch (default: 1)
 * @returns The course recordings query
 */
export const useCourseRecordings = (
    userCourseId: string,
    page: number = 1
) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().COURSE_RECORDINGS.LIST(
            userCourseId,
            page
        ),
        queryFn: async (): Promise<CourseRecordings> => {
            const response =
                await ApiClient.api.userCourseControllerFindRecordings(
                    userCourseId,
                    {
                        page,
                        limit: DEFAULT_PAGE_SIZE,
                        sort: "date",
                        order: "desc",
                    }
                );
            console.log(response.data);

            return mapToCourseRecordings(response.data);
        },
        enabled: !!userCourseId,
    });
};
