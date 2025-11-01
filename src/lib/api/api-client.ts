import { Api } from "@/lib/api/api";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";

/**
 * Api Client for the application
 */
export const ApiClient = new Api({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    securityWorker: async () => {
        // Get token from localStorage on each request
        const token = localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);

        if (token) {
            return {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        return {};
    },
    secure: true,
});
