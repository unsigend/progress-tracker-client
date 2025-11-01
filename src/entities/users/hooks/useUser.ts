import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { IUser } from "../models/model";
import { mapToUser } from "../models/mapper";
import type { UserResponseDto } from "@/lib/api/api";

/**
 * useUser - Hook for getting a user by id
 * @param id - The id of the user to get
 * @returns useQuery hook for getting a user by id
 */
export const useUser = (id: string) => {
    return useQuery({
        queryKey: API_KEY_FACTORY().USERS.DETAIL(id),
        queryFn: async (): Promise<IUser> => {
            const response = await ApiClient.api.userControllerFindById(id);
            const user: UserResponseDto = response.data;
            return mapToUser(user);
        },
    });
};
