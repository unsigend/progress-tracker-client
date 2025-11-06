import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { ICourse } from "../models/model";
import { mapToCourse } from "../models/mapper";
import type { CourseResponseDto } from "@/lib/api/api";

/**
 * useCourse - Hook for getting a course by id
 * @param id - The id of the course to get
 * @returns useQuery hook for getting a course by id
 */
export const useCourse = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().COURSES.DETAIL(id),
        queryFn: async (): Promise<ICourse> => {
            const response = await ApiClient.api.courseControllerFindById(id);
            const course: CourseResponseDto = response.data;
            return mapToCourse(course);
        },
        enabled: !!id,
    });
};
