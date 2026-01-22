import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { mapToUserBook } from "../model/mapper";
import type { UserBookWithBook } from "../model/model";
import type { UserBookResponseDto } from "@/lib/api/api";

/**
 * useSetAsCompleteUserBook - Hook for setting a user book as complete
 * @param id - The id of the user book to set as complete
 * @returns useMutation hook for setting a user book as complete
 */
export const useSetAsCompleteUserBook = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (): Promise<UserBookWithBook> => {
            const response = await ApiClient.api.userBookControllerSetAsComplete(id);
            const userBookResponseDto: UserBookResponseDto = response.data;
            return mapToUserBook(userBookResponseDto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().USER_BOOKS.DETAIL(id),
            });
            queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey;
                    return (
                        Array.isArray(queryKey) &&
                        queryKey[0] === "user-books" &&
                        queryKey[1] === "all"
                    );
                },
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
