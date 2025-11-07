import type { ICourse } from "@/entities/course/courses/models/model";
/**
 * UserCourseStatusType - Type for the status of a user course
 */
export type UserCourseStatusType = "IN_PROGRESS" | "COMPLETED";

/**
 * IUserCourse - Interface for a user course
 */
export interface IUserCourse {
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
 * IUserCourses - Interface for a list of user courses
 */
export interface IUserCourses {
    userCourses: IUserCourse[];
    totalCount: number;
}

/**
 * IUserCourseQuery - Interface for querying user courses
 */
export interface IUserCourseQuery {
    field: string;
    value: string;
    sort: "completedDate" | "startDate" | "createdAt" | "updatedAt";
    order: "asc" | "desc";
    page: number;
    limit: number;
}

/**
 * IUserCourseCreate - Interface for creating a user course
 */
export interface IUserCourseCreate {
    courseId: string;
}

/**
 * IUserCourseWithCourse - Interface for a user course with a course
 */
export interface IUserCourseWithCourse extends IUserCourse {
    course: ICourse | null;
}

/**
 * IUserCoursesWithCourse - Interface for a list of user courses with a course
 */
export interface IUserCoursesWithCourse {
    userCourses: IUserCourseWithCourse[];
    totalCount: number;
}
