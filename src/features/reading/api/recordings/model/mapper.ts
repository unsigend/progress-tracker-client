import type { BookRecordingResponseDto } from "@/lib/api/api";
import type { ReadingRecording } from "./model";

/**
 * mapToRecording - Map a BookRecordingResponseDto to a ReadingRecording
 * @param recording - The BookRecordingResponseDto to map
 * @returns The mapped ReadingRecording
 */
export const mapToRecording = (recording: BookRecordingResponseDto): ReadingRecording => {
    return {
        id: recording.id,
        userBookId: recording.userBookId,
        date: recording.date,
        pages: recording.pages,
        minutes: recording.minutes,
        notes: recording.notes,
    };
};
