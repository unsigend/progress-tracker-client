import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { UserCourseCreate } from "../model/model";
import { mapToUserCourse } from "../model/mapper";
import type { UserCourseCreateRequestDto } from "@/lib/api/api";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { UserCourse } from "../model/model";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import { COURSE_CONSTANTS } from "@/constants/course.constant";
/**
 * useCreateUserCourse - Hook for creating a user course
 */
export const useCreateUserCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            userCourse: UserCourseCreate
        ): Promise<UserCourse> => {
            const userCourseRequestDto: UserCourseCreateRequestDto = {
                courseId: userCourse.courseId,
            };
            const response = await ApiClient.api.userCourseControllerCreate(
                userCourseRequestDto
            );
            return mapToUserCourse(response.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().USER_COURSES.LIST({
                    field: "status",
                    value: "IN_PROGRESS",
                    sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
                    order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
                    page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
                    limit: COURSE_CONSTANTS.USER_COURSE.DEFAULT_LIMIT,
                }),
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
