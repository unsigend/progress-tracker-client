import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { ICourse, ICourseUpdate } from "../models/model";
import { mapToCourse } from "../models/mapper";
import type { CourseResponseDto, CourseUpdateRequestDto } from "@/lib/api/api";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";

/**
 * useUpdateCourse - Hook for updating a course
 * @param id - The id of the course to update
 * @returns useMutation hook for updating a course
 */
export const useUpdateCourse = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (course: ICourseUpdate): Promise<ICourse> => {
            const courseUpdateRequestDto: CourseUpdateRequestDto = {
                name: course.name,
                description: course.description,
                source: course.source,
                officialWebsiteUrl: course.officialWebsiteUrl,
                isPublic: course.isPublic,
                categories: course.categories,
            };
            const response = await ApiClient.api.courseControllerUpdate(
                id,
                courseUpdateRequestDto
            );
            const courseResponse: CourseResponseDto = response.data;
            return mapToCourse(courseResponse);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().COURSES.DETAIL(id),
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            toast.error(error.message);
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
