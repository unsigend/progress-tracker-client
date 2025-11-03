import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * useDeleteRecordings - Hook for deleting recordings
 * @param userBookId - The ID of the user book to delete recordings for
 * @returns The delete recordings mutation
 */
export const useDeleteRecordings = (userBookId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            return ApiClient.api.userBookControllerDeleteRecordings(userBookId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().RECORDINGS.LIST(userBookId),
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
