import type {
    CourseRecordingResponseDto,
    CourseRecordingsResponseDto,
} from "@/lib/api/api";
import type { CourseRecording, CourseRecordings } from "./model";

/**
 * mapToCourseRecording - Map a course recording response to a course recording model
 */
export const mapToCourseRecording = (
    response: CourseRecordingResponseDto
): CourseRecording => {
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
): CourseRecordings => {
    return {
        recordings: response.recordings.map(mapToCourseRecording),
        totalCount: response.totalCount,
    };
};
