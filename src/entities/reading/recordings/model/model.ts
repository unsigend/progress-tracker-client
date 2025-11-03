/**
 * IRecording - Interface for a recording
 */
export interface IRecording {
    id: string;
    userBookId: string;
    date: string;
    pages: number;
    minutes: number;
    notes: string | null;
}

/**
 * IRecordings - Interface for a list of recordings
 */
export interface IRecordings {
    recordings: IRecording[];
    totalCount: number;
}

/**
 * IRecordingCreate - Interface for creating a recording
 */
export interface IRecordingCreate {
    date: string;
    pages: number;
    minutes: number;
    notes?: string;
}
