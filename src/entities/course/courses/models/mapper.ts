import type { CourseResponseDto, CoursesResponseDto } from "@/lib/api/api";
import type { ICourse, ICourses } from "./model";

/**
 * mapToCourse - Map a CourseResponseDto to an ICourse
 * @param course - The CourseResponseDto to map
 * @returns The mapped ICourse
 */
export const mapToCourse = (course: CourseResponseDto): ICourse => {
    return {
        id: course.id,
        name: course.name,
        description: course.description,
        source: course.source,
        officialWebsiteUrl: course.officialWebsiteUrl,
        createdById: course.createdById,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        isPublic: course.isPublic,
        categories: course.categories,
    };
};

/**
 * mapToCourses - Map a CoursesResponseDto to an ICourses
 * @param coursesResponse - The CoursesResponseDto to map
 * @returns The mapped ICourses
 */
export const mapToCourses = (coursesResponse: CoursesResponseDto): ICourses => {
    return {
        courses: coursesResponse.courses.map(mapToCourse),
        totalCount: coursesResponse.totalCount,
    };
};
