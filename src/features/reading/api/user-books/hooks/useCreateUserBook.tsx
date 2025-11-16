import { useMutation } from "@tanstack/react-query";
import { mapToUserBook } from "../model/mapper";
import { type UserBookCreate, type UserBook } from "../model/model";
import { ApiClient } from "@/lib/api/api-client";
import type { UserBookCreateRequestDto } from "@/lib/api/api";
import { toast } from "sonner";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";

/**
 * useCreateUserBook - Hook for creating a user book
 * @returns useMutation hook for creating a user book
 */
export const useCreateUserBook = () => {
    return useMutation({
        mutationFn: async (userBook: UserBookCreate): Promise<UserBook> => {
            const userBookRequestDto: UserBookCreateRequestDto = {
                bookId: userBook.bookId,
            };
            const response = await ApiClient.api.userBookControllerCreate(
                userBookRequestDto
            );
            return mapToUserBook(response.data);
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            // Show error toast
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
