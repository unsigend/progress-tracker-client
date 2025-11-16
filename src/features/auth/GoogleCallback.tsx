import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";

/**
 * GoogleCallback - Smart component for handling Google OAuth callback
 * Processes OAuth token and redirects user
 * @returns GoogleCallback component
 */
export const GoogleCallback = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get(AUTH_CONSTANTS.ACCESS_TOKEN_KEY);
    const navigate = useNavigate();

    useEffect(() => {
        if (access_token) {
            localStorage.setItem(AUTH_CONSTANTS.ACCESS_TOKEN_KEY, access_token);
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().USERS.ME(),
            });
            navigate(ROUTES_CONSTANTS.DASHBOARD().HOME());
        }
    }, [access_token, navigate, queryClient]);

    return null;
};

