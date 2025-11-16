import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { Course, CourseCreate } from "../models/model";
import { mapToCourse } from "../models/mapper";
import type { CourseCreateRequestDto, CourseResponseDto } from "@/lib/api/api";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/entities/common/models/error";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { toast } from "sonner";

/**
 * useCreateCourse - Hook for creating a course
 * @param course - The course to create
 * @returns useMutation hook for creating a course
 * @returns The created course
 */
export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (course: CourseCreate): Promise<Course> => {
            const courseCreateRequestDto: CourseCreateRequestDto = {
                name: course.name,
                description: course.description,
                source: course.source,
                officialWebsiteUrl: course.officialWebsiteUrl,
                isPublic: course.isPublic,
                categories: course.categories,
            };
            const response = await ApiClient.api.courseControllerCreate(
                courseCreateRequestDto
            );
            const courseResponse: CourseResponseDto = response.data;
            return mapToCourse(courseResponse);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().COURSES.LIST({
                    page: COURSE_CONSTANTS.COURSE.DEFAULT_PAGE,
                    limit: COURSE_CONSTANTS.COURSE.DEFAULT_LIMIT,
                    sort: COURSE_CONSTANTS.COURSE.DEFAULT_SORT,
                    order: COURSE_CONSTANTS.COURSE.DEFAULT_ORDER,
                    value: COURSE_CONSTANTS.COURSE.DEFAULT_VALUE,
                }),
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            // Show error toast
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
