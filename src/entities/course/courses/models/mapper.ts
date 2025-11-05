import type { CourseResponseDto } from "@/lib/api/api";
import type { ICourse } from "./model";

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
        officialWebsite: course.officialWebsiteUrl,
        courseImageUrl: course.courseImageUrl,
        createdById: course.createdById,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
    };
};

/**
 * mapToCourseResponseDto - Map an ICourse to a CourseResponseDto
 * @param course - The ICourse to map
 * @returns The mapped CourseResponseDto
 */
export const mapToCourseResponseDto = (course: ICourse): CourseResponseDto => {
    return {
        id: course.id,
        name: course.name,
        description: course.description,
        source: course.source,
        officialWebsiteUrl: course.officialWebsite,
        courseImageUrl: course.courseImageUrl,
        createdById: course.createdById,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
    };
};
