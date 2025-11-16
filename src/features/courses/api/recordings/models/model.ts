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
 * CourseRecordings - Interface for a list of course recordings
 */
export interface CourseRecordings {
    recordings: CourseRecording[];
    totalCount: number;
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
