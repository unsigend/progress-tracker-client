import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IUserBookWithBook } from "../model/model";
import { mapToUserBook } from "../model/mapper";
import type { UserBookResponseDto } from "@/lib/api/api";

/**
 * useUserBook - Hook for fetching a user book by id
 * @param id - The id of the user book to fetch
 * @returns useQuery hook for fetching a user book by id
 */
export const useUserBook = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().USER_BOOKS.DETAIL(id),
        queryFn: async (): Promise<IUserBookWithBook> => {
            const response = await ApiClient.api.userBookControllerFindById(
                id,
                {
                    expand: true,
                }
            );
            const userBookResponseDto: UserBookResponseDto = response.data;
            return mapToUserBook(userBookResponseDto);
        },
    });
};
