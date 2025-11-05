import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { ICourse, ICourseCreate } from "../models/model";
import { mapToCourse } from "../models/mapper";
import type { CourseCreateRequestDto } from "@/lib/api/api";
import { ContentType } from "@/lib/api/api";
import type { CourseResponseDto } from "@/lib/api/api";
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
        mutationFn: async (course: ICourseCreate): Promise<ICourse> => {
            const formData = new FormData();
            formData.append("name", course.name);
            if (course.description) {
                formData.append("description", course.description);
            }
            if (course.source) {
                formData.append("source", course.source);
            }
            if (course.officialWebsite) {
                formData.append("officialWebsiteUrl", course.officialWebsite);
            }
            if (course.isPublic !== undefined) {
                formData.append("isPublic", course.isPublic.toString());
            }
            if (course.courseImage) {
                formData.append("courseImage", course.courseImage);
            }
            const response = await ApiClient.api.courseControllerCreate(
                formData as unknown as CourseCreateRequestDto,
                {
                    type: ContentType.FormData,
                }
            );
            const courseResponse: CourseResponseDto = response.data;
            return mapToCourse(courseResponse);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().COURSES.LIST({
                    page: COURSE_CONSTANTS.DEFAULT_PAGE,
                    limit: COURSE_CONSTANTS.DEFAULT_LIMIT,
                    sort: COURSE_CONSTANTS.DEFAULT_SORT,
                    order: COURSE_CONSTANTS.DEFAULT_ORDER,
                    value: COURSE_CONSTANTS.DEFAULT_VALUE,
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
