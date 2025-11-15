import type { Course } from "@/entities/course/courses/models/model";

/**
 * UserCourseStatusType - Type for the status of a user course
 */
export type UserCourseStatusType = "IN_PROGRESS" | "COMPLETED";

/**
 * UserCourse - Interface for a user course
 */
export interface UserCourse {
    id: string;
    courseId: string;
    status: UserCourseStatusType;
    startDate: string | null;
    completedDate: string | null;
    totalMinutes: number;
    totalDays: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * UserCourses - Interface for a list of user courses
 */
export interface UserCourses {
    userCourses: UserCourse[];
    totalCount: number;
}

/**
 * UserCourseQuery - Interface for querying user courses
 */
export interface UserCourseQuery {
    field: string;
    value: string;
    sort: "completedDate" | "startDate" | "createdAt" | "updatedAt";
    order: "asc" | "desc";
    page: number;
    limit: number;
}

/**
 * UserCourseCreate - Interface for creating a user course
 */
export interface UserCourseCreate {
    courseId: string;
}

/**
 * UserCourseWithCourse - Interface for a user course with a course
 */
export interface UserCourseWithCourse extends UserCourse {
    course: Course | null;
}

/**
 * UserCoursesWithCourse - Interface for a list of user courses with a course
 */
export interface UserCoursesWithCourse {
    userCourses: UserCourseWithCourse[];
    totalCount: number;
}
