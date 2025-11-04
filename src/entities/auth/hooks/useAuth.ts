/**
 * useAuth - Hook for checking if the user is authenticated
 */

import { AUTH_CONSTANTS } from "@/constants/auth.constant";

export const useAuth = () => {
    const accessToken = localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    const isAuthenticated = !!accessToken;
    return { isAuthenticated };
};
