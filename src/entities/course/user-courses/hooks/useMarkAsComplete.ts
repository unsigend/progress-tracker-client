import type { IErrorResponse } from "@/entities/common/models/error";
import { ApiClient } from "@/lib/api/api-client";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import { COURSE_CONSTANTS } from "@/constants/course.constant";

export const useMarkAsComplete = () => {
    const queryClient = useQueryClient();
    const markAsComplete = async (userCourseId: string): Promise<void> => {
        const response = await ApiClient.api.userCourseControllerMarkComplete(
            userCourseId
        );
        if (response.status !== HttpStatusCode.Ok) {
            const errorModel: IErrorResponse =
                response.data as unknown as IErrorResponse;
            toast.error(errorModel.message);
        }
        // invalidate user course detail
        queryClient.invalidateQueries({
            queryKey: API_KEY_FACTORY().USER_COURSES.DETAIL(userCourseId),
        });
        // invalidate in progress courses list
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
        // invalidate completed courses list
        queryClient.invalidateQueries({
            queryKey: API_KEY_FACTORY().USER_COURSES.LIST({
                field: "status",
                value: "COMPLETED",
                sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
                order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
                page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
                limit: COURSE_CONSTANTS.USER_COURSE.DEFAULT_LIMIT,
            }),
        });
    };
    return { markAsComplete };
};
