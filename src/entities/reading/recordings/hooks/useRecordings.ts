import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { IReadingRecordings } from "../model/model";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * useReadingRecordings - Hook for fetching reading recordings
 * @param userBookId - The ID of the user book to fetch recordings for
 * @returns The reading recordings query
 */
export const useReadingRecordings = (userBookId: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().READING_RECORDINGS.LIST(userBookId),
        queryFn: async (): Promise<IReadingRecordings> => {
            const response =
                await ApiClient.api.userBookControllerFindRecordings(
                    userBookId
                );
            return response.data;
        },
    });
};
