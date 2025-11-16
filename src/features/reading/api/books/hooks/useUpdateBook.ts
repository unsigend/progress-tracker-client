import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { Book, BookUpdate } from "../models/model";
import { mapToBook } from "../models/mapper";
import {
    ContentType,
    type BookUpdateRequestDto,
    type BookResponseDto,
} from "@/lib/api/api";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * useUpdateBook - Hook for updating a book
 * @param id - The id of the book to update
 * @returns useMutation hook for updating a book
 */
export const useUpdateBook = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (book: BookUpdate): Promise<Book> => {
            const formData = new FormData();

            if (book.title) {
                formData.append("title", book.title);
            }
            if (book.author) {
                formData.append("author", book.author);
            }
            if (book.description) {
                formData.append("description", book.description);
            }
            if (book.ISBN10) {
                formData.append("ISBN10", book.ISBN10);
            }
            if (book.ISBN13) {
                formData.append("ISBN13", book.ISBN13);
            }
            if (book.coverImage) {
                formData.append("coverImage", book.coverImage);
            }
            if (book.pages) {
                formData.append("pages", book.pages.toString());
            }
            const response = await ApiClient.api.bookControllerUpdate(
                id,
                formData as BookUpdateRequestDto,
                {
                    type: ContentType.FormData,
                }
            );
            const bookResponse: BookResponseDto = response.data;
            return mapToBook(bookResponse);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().BOOKS.DETAIL(id),
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
