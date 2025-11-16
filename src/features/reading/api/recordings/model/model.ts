/**
 * ReadingRecording - Interface for a recording
 */
export interface ReadingRecording {
    id: string;
    userBookId: string;
    date: string;
    pages: number;
    minutes: number;
    notes: string | null;
}

/**
 * ReadingRecordings - Interface for a list of recordings
 */
export interface ReadingRecordings {
    recordings: ReadingRecording[];
    totalCount: number;
}

/**
 * ReadingRecordingCreate - Interface for creating a recording
 */
export interface ReadingRecordingCreate {
    date: string;
    pages: number;
    minutes: number;
    notes?: string;
}
