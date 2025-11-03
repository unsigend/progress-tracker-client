import { useQuery } from "@tanstack/react-query";
import { type BookResponseDto } from "@/lib/api/api";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IBook } from "../models/model";
import { mapToBook } from "../models/mapper";
import { ApiClient } from "@/lib/api/api-client";

/**
 * useBook - Hook for getting a book
 * @returns useQuery hook for getting a book
 */
export const useBook = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().BOOKS.DETAIL(id),
        queryFn: async (): Promise<IBook> => {
            const response = await ApiClient.api.bookControllerFindById(id);
            const book: BookResponseDto = response.data;
            return mapToBook(book);
        },
        enabled: !!id,
    });
};
