// Api Key Factory
import type { ICoursesQuery } from "@/entities/course/courses/models/model";
import type { IUserCourseQuery } from "@/entities/course/user-courses/model/model";
import type { IBookQuery } from "@/entities/reading/books/models/model";
import type { IUserBookQuery } from "@/entities/reading/user-books/model/model";
import { DatesUtils } from "@/lib/utils/dates";

const RESOURCES_KEYS = {
    USERS: "users",
    BOOKS: "books",
    USER_BOOKS: "user-books",
    READING_RECORDINGS: "reading-recordings",
    STATISTICS: "statistics",
    COURSES: "courses",
    USER_COURSES: "user-courses",
};

/**
 * Api Key Factory for the application
 */
export const API_KEY_FACTORY = () => {
    return {
        USERS: {
            ALL: () => {
                return [RESOURCES_KEYS.USERS, "all"];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.USERS, "detail", id];
            },
            ME: () => {
                return [RESOURCES_KEYS.USERS, "me"];
            },
        },
        BOOKS: {
            RANDOM: () => {
                // Cache based on the today's date, will invalidate in the next day
                return [
                    RESOURCES_KEYS.BOOKS,
                    "random",
                    DatesUtils.getTodayDateString(),
                ];
            },
            LIST: (query: IBookQuery) => {
                return [RESOURCES_KEYS.BOOKS, "all", query];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.BOOKS, "detail", id];
            },
        },
        USER_BOOKS: {
            LIST: (query: IUserBookQuery) => {
                return [RESOURCES_KEYS.USER_BOOKS, "all", query];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.USER_BOOKS, "detail", id];
            },
        },
        READING_RECORDINGS: {
            LIST: (userBookId: string) => {
                return [RESOURCES_KEYS.READING_RECORDINGS, userBookId];
            },
        },
        COURSES: {
            LIST: (query: ICoursesQuery) => {
                return [RESOURCES_KEYS.COURSES, "all", query];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.COURSES, "detail", id];
            },
        },
        USER_COURSES: {
            LIST: (query: IUserCourseQuery) => {
                return [RESOURCES_KEYS.USER_COURSES, "all", query];
            },
            DETAIL: (id: string) => {
                return [RESOURCES_KEYS.USER_COURSES, "detail", id];
            },
        },
        STATISTICS: {
            READING: {
                TODAY: () => {
                    return [RESOURCES_KEYS.STATISTICS, "reading", "today"];
                },
                RANGE: (startDate: string, endDate: string) => {
                    return [
                        RESOURCES_KEYS.STATISTICS,
                        "reading",
                        "range",
                        startDate,
                        endDate,
                    ];
                },
            },
        },
    };
};
