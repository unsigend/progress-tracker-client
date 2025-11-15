import type { ReadingRecording } from "@/entities/reading/recordings/model/model";

/**
 * ReadingStatistics - Interface for reading statistics
 */
export interface ReadingStatistics {
    totalMinutes: number;
    totalPages: number;
    totalRecordings: number;
}

/**
 * ReadingStatisticsDetail - Interface for reading statistics detail
 */
export interface ReadingStatisticsDetail {
    recordings: ReadingRecording[];
    totalCount: number;
}
