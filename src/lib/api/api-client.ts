import { Api } from "@/lib/api/api";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

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

ApiClient.instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const token = localStorage.getItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
            if (token) {
                localStorage.removeItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
                window.location.assign(ROUTES_CONSTANTS.AUTH().LOGIN());
            }
        }
        return Promise.reject(error);
    }
);
