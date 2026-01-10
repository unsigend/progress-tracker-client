import type {
    CourseRecordingResponseDto,
    DailyRecordsResponseDto,
} from "@/lib/api/api";
import type { CourseRecording, CourseRecordings, DailyRecord } from "./model";

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
 * mapToCourseRecordings - Map a daily records response to a course recordings model
 */
export const mapToCourseRecordings = (
    response: DailyRecordsResponseDto
): CourseRecordings => {
    return {
        dailyRecords: response.dailyRecords as DailyRecord[],
        totalDays: response.totalDays,
        page: response.page,
        pageSize: response.pageSize,
    };
};
