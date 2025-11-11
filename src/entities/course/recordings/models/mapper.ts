import type {
    CourseRecordingResponseDto,
    CourseRecordingsResponseDto,
} from "@/lib/api/api";
import type { ICourseRecording, ICourseRecordings } from "./model";

/**
 * mapToCourseRecording - Map a course recording response to a course recording model
 */
export const mapToCourseRecording = (
    response: CourseRecordingResponseDto
): ICourseRecording => {
    return {
        id: response.id,
        userCourseId: response.userCourseId,
        date: response.date,
        minutes: response.minutes,
        recordType: response.recordType,
        notes: response.notes,
    };
};

/**
 * mapToCourseRecordings - Map a course recordings response to a course recordings model
 */
export const mapToCourseRecordings = (
    response: CourseRecordingsResponseDto
): ICourseRecordings => {
    return {
        recordings: response.recordings.map(mapToCourseRecording),
        totalCount: response.totalCount,
    };
};
