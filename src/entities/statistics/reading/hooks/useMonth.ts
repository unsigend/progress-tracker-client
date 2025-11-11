import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import { ApiClient } from "@/lib/api/api-client";
import { DatesUtils } from "@/lib/utils/dates";
import type { IReadingStatisticsDetail } from "../models/model";
import type { ReadingRecordingDetailResponseDto } from "@/lib/api/api";
import type { IReadingRecording } from "@/entities/reading/recordings/model/model";
import { mapToRecording } from "@/entities/reading/recordings/model/mapper";

/**
 * useMonth - Hook for fetching recordings data
 * Fetches one month at a time on-demand based on weekOffset
 * @param weekOffset - Week offset to determine which months to fetch
 */
export const useMonth = (weekOffset: number = 0) => {
    // Determine which months are needed based on weekOffset
    // A week can span two months, so need to check both
    const neededMonths = useMemo(() => {
        const weekStart = new Date(DatesUtils.getWeekStartDate(weekOffset));
        const weekEnd = new Date(DatesUtils.getWeekEndDate(weekOffset));

        const startMonth = weekStart.getMonth();
        const startYear = weekStart.getFullYear();
        const endMonth = weekEnd.getMonth();
        const endYear = weekEnd.getFullYear();

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calculate month offsets from current month
        const startMonthOffset =
            (startYear - currentYear) * 12 + (startMonth - currentMonth);
        const endMonthOffset =
            (endYear - currentYear) * 12 + (endMonth - currentMonth);

        // Return unique month offsets
        const months = new Set([startMonthOffset, endMonthOffset]);
        return Array.from(months).sort((a, b) => a - b);
    }, [weekOffset]);

    // Fetch each needed month
    const monthQueries = useQueries({
        queries: neededMonths.map((monthOffset) => {
            const monthRange = DatesUtils.getMonthRange(monthOffset);
            return {
                queryKey: API_KEY_FACTORY().STATISTICS.READING.RANGE(
                    monthRange.startDate,
                    monthRange.endDate
                ),
                queryFn: async (): Promise<IReadingStatisticsDetail> => {
                    const response =
                        await ApiClient.api.statisticsControllerGetReadingRecordingDetail(
                            {
                                startDate: monthRange.startDate,
                                endDate: monthRange.endDate,
                            }
                        );
                    const data: ReadingRecordingDetailResponseDto =
                        response.data;

                    const recordings: IReadingRecording[] =
                        data.recordings.map(mapToRecording);

                    return {
                        recordings,
                        totalCount: data.totalCount,
                    };
                },
            };
        }),
    });

    // Merge all recordings from fetched months
    const mergedData = useMemo(() => {
        const allRecordings: IReadingRecording[] = [];
        let totalCount = 0;
        let isLoading = false;

        monthQueries.forEach((query) => {
            if (query.data) {
                allRecordings.push(...query.data.recordings);
                totalCount += query.data.totalCount;
            }
            if (query.isLoading) {
                isLoading = true;
            }
        });

        // Remove duplicates by id
        const uniqueRecordings = Array.from(
            new Map(allRecordings.map((rec) => [rec.id, rec])).values()
        );

        return {
            recordings: uniqueRecordings,
            totalCount,
            isLoading,
        };
    }, [monthQueries]);

    return {
        data: {
            recordings: mergedData.recordings,
            totalCount: mergedData.totalCount,
        },
        isLoading: mergedData.isLoading,
    };
};
