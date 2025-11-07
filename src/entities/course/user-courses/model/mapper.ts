import type { IUserCoursesWithCourse, IUserCourseWithCourse } from "./model";
import type { UserCourseResponseDto } from "@/lib/api/api";
import { mapToCourse } from "../../courses/models/mapper";

/**
 * mapToUserCourse - Map a UserCourseResponseDto to an IUserCourse
 * @param userCourse - The UserCourseResponseDto to map
 * @returns The mapped IUserCourse
 */
export const mapToUserCourse = (
    userCourse: UserCourseResponseDto
): IUserCourseWithCourse => {
    return {
        id: userCourse.id,
        courseId: userCourse.courseId,
        status: userCourse.status,
        startDate: userCourse.startDate,
        completedDate: userCourse.completedDate,
        totalMinutes: userCourse.totalMinutes,
        totalDays: userCourse.totalDays,
        createdAt: userCourse.createdAt,
        updatedAt: userCourse.updatedAt,
        course: userCourse.course ? mapToCourse(userCourse.course) : null,
    };
};

/**
 * mapToUserCourses - Map a UserCoursesResponseDto to IUserCoursesWithCourse
 * @param userCoursesResponse - The UserCoursesResponseDto to map
 * @returns The mapped IUserCoursesWithCourse
 */
export const mapToUserCourses = (userCoursesResponse: {
    userCourses: UserCourseResponseDto[];
    totalCount: number;
}): IUserCoursesWithCourse => {
    return {
        userCourses: userCoursesResponse.userCourses.map(mapToUserCourse),
        totalCount: userCoursesResponse.totalCount,
    };
};
