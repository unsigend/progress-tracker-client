import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * Github Callback Page
 */
export const GithubCallbackContainer = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            // Handle the OAuth login with the access token
            localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, access_token);
            // invalidate the user query
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().USERS.ME(),
            });
            // Redirect to dashboard or handle login
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        }
    }, [access_token, navigate, queryClient]);

    return null;
};
