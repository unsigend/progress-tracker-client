import type { CourseResponseDto, CoursesResponseDto } from "@/lib/api/api";
import type { Course, Courses } from "./model";

/**
 * mapToCourse - Map a CourseResponseDto to a Course
 * @param course - The CourseResponseDto to map
 * @returns The mapped Course
 */
export const mapToCourse = (course: CourseResponseDto): Course => {
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
 * mapToCourses - Map a CoursesResponseDto to Courses
 * @param coursesResponse - The CoursesResponseDto to map
 * @returns The mapped Courses
 */
export const mapToCourses = (coursesResponse: CoursesResponseDto): Courses => {
    return {
        courses: coursesResponse.courses.map(mapToCourse),
        totalCount: coursesResponse.totalCount,
    };
};
