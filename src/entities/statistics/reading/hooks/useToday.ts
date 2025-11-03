import { useQuery } from "@tanstack/react-query";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IReadingStatistics } from "../models/model";
import { ApiClient } from "@/lib/api/api-client";
import type { ReadingRecordingResponseDto } from "@/lib/api/api";

/**
 * useToday - Hook for getting today's reading statistics
 */
export const useToday = () => {
    return useQuery({
        queryKey: API_KEY_FACTORY().STATISTICS.READING.TODAY(),
        queryFn: async (): Promise<IReadingStatistics> => {
            const response =
                await ApiClient.api.statisticsControllerGetReadingRecordingToday();
            const readingStatistics: ReadingRecordingResponseDto =
                response.data;
            return {
                totalMinutes: readingStatistics.totalMinutes,
                totalPages: readingStatistics.totalPages,
                totalRecordings: readingStatistics.totalRecordings,
            };
        },
    });
};
