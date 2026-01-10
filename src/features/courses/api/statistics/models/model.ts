/**
 * CourseRecordingStatistics - Interface for course recording statistics
 */
export interface CourseRecordingStatistics {
    totalMinutes: number;
    minutesByType: Record<string, number>;
}
