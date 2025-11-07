import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { IUserCourseCreate } from "../model/model";
import { mapToUserCourse } from "../model/mapper";
import type { UserCourseCreateRequestDto } from "@/lib/api/api";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { IUserCourse } from "../model/model";

/**
 * useCreateUserCourse - Hook for creating a user course
 */
export const useCreateUserCourse = () => {
    return useMutation({
        mutationFn: async (
            userCourse: IUserCourseCreate
        ): Promise<IUserCourse> => {
            const userCourseRequestDto: UserCourseCreateRequestDto = {
                courseId: userCourse.courseId,
            };
            const response = await ApiClient.api.userCourseControllerCreate(
                userCourseRequestDto
            );
            return mapToUserCourse(response.data);
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            toast.error(error.message);
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
