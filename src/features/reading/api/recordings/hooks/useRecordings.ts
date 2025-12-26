import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { ReadingRecordings } from "../model/model";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * RecordingQuery - Interface for recording query parameters
 */
export interface RecordingQuery {
    page: number;
    limit: number;
    sort?: string;
    order?: "asc" | "desc";
}

/**
 * useReadingRecordings - Hook for fetching reading recordings
 * @param userBookId - The ID of the user book to fetch recordings for
 * @param query - The query parameters for pagination
 * @returns The reading recordings query
 */
export const useReadingRecordings = (
    userBookId: string,
    query?: RecordingQuery
) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().READING_RECORDINGS.LIST(userBookId, query),
        queryFn: async (): Promise<ReadingRecordings> => {
            const queryObject = query
                ? {
                      page: query.page,
                      limit: query.limit,
                      sort: query.sort,
                      order: query.order,
                  }
                : undefined;
            const response =
                await ApiClient.api.userBookControllerFindRecordings(
                    userBookId,
                    queryObject
                );
            return response.data;
        },
    });
};
