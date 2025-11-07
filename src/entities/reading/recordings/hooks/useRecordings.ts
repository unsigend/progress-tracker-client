import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { IRecordings } from "../model/model";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * useRecordings - Hook for fetching recordings
 * @param userBookId - The ID of the user book to fetch recordings for
 * @returns The recordings query
 */
export const useRecordings = (userBookId: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().READING_RECORDINGS.LIST(userBookId),
        queryFn: async (): Promise<IRecordings> => {
            const response =
                await ApiClient.api.userBookControllerFindRecordings(
                    userBookId
                );
            return response.data;
        },
    });
};
