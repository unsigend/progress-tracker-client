import type { RecordingResponseDto } from "@/lib/api/api";
import type { IRecording } from "./model";

/**
 * mapToRecording - Map a RecordingResponseDto to an IRecording
 * @param recording - The RecordingResponseDto to map
 * @returns The mapped IRecording
 */
export const mapToRecording = (recording: RecordingResponseDto): IRecording => {
    return {
        id: recording.id,
        userBookId: recording.userBookId,
        date: recording.date,
        pages: recording.pages,
        minutes: recording.minutes,
        notes: recording.notes,
    };
};
