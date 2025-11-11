/**
 * IReadingRecording - Interface for a recording
 */
export interface IReadingRecording {
    id: string;
    userBookId: string;
    date: string;
    pages: number;
    minutes: number;
    notes: string | null;
}

/**
 * IReadingRecordings - Interface for a list of recordings
 */
export interface IReadingRecordings {
    recordings: IReadingRecording[];
    totalCount: number;
}

/**
 * IReadingRecordingCreate - Interface for creating a recording
 */
export interface IReadingRecordingCreate {
    date: string;
    pages: number;
    minutes: number;
    notes?: string;
}
