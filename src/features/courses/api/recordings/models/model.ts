/**
 * CourseRecording - Interface for a course recording
 */
export interface CourseRecording {
    id: string;
    userCourseId: string;
    date: string;
    minutes: number;
    recordType: string;
    notes: string | null;
}

/**
 * DailyRecordTypeData - Interface for record type data within a daily record
 */
export interface DailyRecordTypeData {
    minutes: number;
    notes: string | null;
}

/**
 * DailyRecord - Interface for a daily record with grouped recordings by type
 */
export interface DailyRecord {
    date: string;
    total: number;
    [recordType: string]: string | number | DailyRecordTypeData | undefined;
}

/**
 * CourseRecordings - Interface for paginated daily records
 */
export interface CourseRecordings {
    dailyRecords: DailyRecord[];
    totalDays: number;
    page: number;
    pageSize: number;
}

/**
 * CourseRecordingCreate - Interface for creating a course recording
 */
export interface CourseRecordingCreate {
    date: string;
    minutes: number;
    recordType: string;
    notes?: string;
}
