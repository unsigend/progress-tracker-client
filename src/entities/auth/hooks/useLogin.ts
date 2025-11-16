import { toast } from "sonner";
import type { AxiosError } from "axios";
import { ApiClient } from "@/lib/api/api-client";
import { useMutation } from "@tanstack/react-query";
import type { LoginRequestDto } from "@/lib/api/api";
import type { LoginFormData, AccessToken } from "../models/model";
import type { IErrorResponse } from "@/entities/common/models/error";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";

/**
 * useLogin - Hook for logging in a user
 * @returns useMutation hook for logging in a user
 */
export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginFormData): Promise<AccessToken> => {
            // Create the login form data
            const loginFormData: LoginRequestDto = {
                email: data.email,
                password: data.password,
            };

            // Login the user
            const response = await ApiClient.api.authControllerLogin(
                loginFormData
            );

            // Return the access token
            return {
                accessToken: response.data.accessToken,
            };
        },
        retry: false,
        onError: (error: AxiosError<IErrorResponse>) => {
            // Show error toast
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
        onSuccess: (token: AccessToken) => {
            // Set the access token in localStorage
            localStorage.setItem(
                AUTH_CONSTANTS.ACCESS_TOKEN_KEY,
                token.accessToken
            );
        },
    });
};
