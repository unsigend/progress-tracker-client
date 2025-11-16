import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * useDeleteBook - Hook for deleting a book
 * @param id - The id of the book to delete
 * @returns useMutation hook for deleting a book
 */
export const useDeleteBook = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (): Promise<void> => {
            await ApiClient.api.bookControllerDelete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().BOOKS.DETAIL(id),
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
