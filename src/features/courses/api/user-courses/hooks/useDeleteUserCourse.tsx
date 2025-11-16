import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * useDeleteUserCourse - Hook for deleting a user course
 * @param id - The id of the user course to delete
 * @returns useMutation hook for deleting a user course
 */
export const useDeleteUserCourse = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (): Promise<void> => {
            await ApiClient.api.userCourseControllerDelete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().USER_COURSES.DETAIL(id),
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
