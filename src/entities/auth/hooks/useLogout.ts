import { AUTH_CONSTANTS } from "@/constants/auth.constant";
import { useMutation } from "@tanstack/react-query";

/**
 * useLogout - Hook for logging out a user
 * @returns useMutation hook for logging out a user
 */
export const useLogout = () => {
    return useMutation({
        mutationFn: async (): Promise<void> => {
            return Promise.resolve();
        },
        retry: false,
        onSuccess: () => {
            // Remove the access token from localStorage
            localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
        },
    });
};
