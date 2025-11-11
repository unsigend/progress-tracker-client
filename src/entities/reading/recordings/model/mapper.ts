import type { RecordingResponseDto } from "@/lib/api/api";
import type { IReadingRecording } from "./model";

/**
 * mapToRecording - Map a RecordingResponseDto to an IReadingRecording
 * @param recording - The RecordingResponseDto to map
 * @returns The mapped IReadingRecording
 */
export const mapToRecording = (recording: RecordingResponseDto): IReadingRecording => {
    return {
        id: recording.id,
        userBookId: recording.userBookId,
        date: recording.date,
        pages: recording.pages,
        minutes: recording.minutes,
        notes: recording.notes,
    };
};
