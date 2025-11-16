import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { User } from "../models/model";
import { mapToUser } from "../models/mapper";
import type { UserResponseDto } from "@/lib/api/api";

/**
 * useMe - Hook for getting the current user
 * @returns useQuery hook for getting the current user
 */
export const useMe = () => {
    return useQuery({
        queryKey: API_KEY_FACTORY().USERS.ME(),
        queryFn: async (): Promise<User> => {
            const response = await ApiClient.api.userControllerGetCurrentUser();
            const user: UserResponseDto = response.data;
            return mapToUser(user);
        },
    });
};
