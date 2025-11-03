import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IUserBookQuery } from "../model/model";
import type { UserBooksResponseDto } from "@/lib/api/api";
import { mapToUserBooks } from "../model/mapper";
import type { IUserBooksWithBook } from "../model/model";

/**
 * useUserBooks - Hook for fetching user books
 * @param query - The query for fetching user books
 * @returns useQuery hook for fetching user books
 */
export const useUserBooks = (query: IUserBookQuery) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().USER_BOOKS.LIST(query),
        queryFn: async (): Promise<IUserBooksWithBook> => {
            const response = await ApiClient.api.userBookControllerFindAll({
                field: query.field,
                value: query.value,
                sort: query.sort,
                order: query.order,
                limit: query.limit,
                page: query.page,
                expand: true,
            });
            const userBooksResponse: UserBooksResponseDto = response.data;
            return mapToUserBooks(userBooksResponse);
        },
    });
};
