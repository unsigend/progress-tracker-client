import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { Book } from "../models/model";
import { mapToBook } from "../models/mapper";
import type { BooksResponseDto } from "@/lib/api/api";

/**
 * useRandomBooks - Hook for getting random books
 * @param count - The count of the books to get
 * @returns useQuery hook for getting random books
 */
export const useRandomBooks = (count: number) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().BOOKS.RANDOM(),
        queryFn: async (): Promise<Book[]> => {
            const response = await ApiClient.api.bookControllerFindRandom({
                count,
            });
            const booksResponse: BooksResponseDto = response.data;
            return booksResponse.books.map(mapToBook);
        },
    });
};
