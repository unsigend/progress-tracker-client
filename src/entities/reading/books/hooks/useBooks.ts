import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IBooks, IBookQuery } from "../models/model";
import { mapToBook } from "../models/mapper";
import type { BooksResponseDto } from "@/lib/api/api";

/**
 * useBooks - Hook for getting books
 * @param query - The query parameters for getting books
 * @returns useQuery hook for getting books with pagination data
 */
export const useBooks = (query: IBookQuery) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().BOOKS.LIST(query),
        queryFn: async (): Promise<IBooks> => {
            const queryObject = {
                value: query.value,
                sort: query.sort,
                order: query.order,
                limit: query.limit,
                page: query.page,
            };
            const response = await ApiClient.api.bookControllerFindAll(
                queryObject
            );
            const booksResponse: BooksResponseDto = response.data;
            return {
                books: booksResponse.books.map(mapToBook),
                totalCount: booksResponse.totalCount,
            };
        },
    });
};
