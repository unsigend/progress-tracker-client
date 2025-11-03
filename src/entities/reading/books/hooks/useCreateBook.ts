import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { IBook, IBookCreate } from "../models/model";
import { mapToBook } from "../models/mapper";
import {
    ContentType,
    type BookCreateRequestDto,
    type BookResponseDto,
} from "@/lib/api/api";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";

/**
 * useCreateBook - Hook for creating a book
 * @param book - The book to create
 * @returns useMutation hook for creating a book
 * @returns The created book
 */
export const useCreateBook = () => {
    return useMutation({
        mutationFn: async (book: IBookCreate): Promise<IBook> => {
            const formData = new FormData();

            // append required fields
            formData.append("title", book.title);
            formData.append("pages", book.pages.toString());

            // append optional fields
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
            const response = await ApiClient.api.bookControllerCreate(
                formData as unknown as BookCreateRequestDto,
                {
                    type: ContentType.FormData,
                }
            );
            const bookResponse: BookResponseDto = response.data;
            return mapToBook(bookResponse);
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            // Show error toast
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
