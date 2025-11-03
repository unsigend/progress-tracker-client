import type { IRecording } from "@/entities/reading/recordings/model/model";

/**
 * IReadingStatistics - Interface for reading statistics
 */
export interface IReadingStatistics {
    totalMinutes: number;
    totalPages: number;
    totalRecordings: number;
}

/**
 * IReadingStatisticsDetail - Interface for reading statistics detail
 */
export interface IReadingStatisticsDetail {
    recordings: IRecording[];
    totalCount: number;
}
