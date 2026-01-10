import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { CourseRecordingStatistics } from "../models/model";
import type { CourseRecordingDetailResponseDto } from "@/lib/api/api";

/**
 * useCourseRecordingDetail - Hook for fetching course recording statistics
 * @param userCourseId - The ID of the user course to fetch statistics for
 * @returns The course recording statistics query
 */
export const useCourseRecordingDetail = (userCourseId: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().STATISTICS.COURSE_RECORDING.DETAIL(
            userCourseId
        ),
        queryFn: async (): Promise<CourseRecordingStatistics> => {
            const response =
                await ApiClient.api.statisticsControllerGetCourseRecordingDetail(
                    userCourseId
                );
            const data: CourseRecordingDetailResponseDto = response.data;
            return {
                totalMinutes: data.totalMinutes,
                minutesByType: data.minutesByType as Record<string, number>,
            };
        },
        enabled: !!userCourseId,
    });
};
