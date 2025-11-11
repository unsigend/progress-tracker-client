/**
 * ICourseRecording - Interface for a course recording
 */
export interface ICourseRecording {
    id: string;
    userCourseId: string;
    date: string;
    minutes: number;
    recordType: string;
    notes: string | null;
}

/**
 * ICourseRecordings - Interface for a list of course recordings
 */
export interface ICourseRecordings {
    recordings: ICourseRecording[];
    totalCount: number;
}

/**
 * ICourseRecordingCreate - Interface for creating a course recording
 */
export interface ICourseRecordingCreate {
    date: string;
    minutes: number;
    recordType: string;
    notes?: string;
}
