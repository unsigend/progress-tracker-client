import { useMutation } from "@tanstack/react-query";
import type { AccessToken, RegisterFormData } from "../models/model";
import { ApiClient } from "@/lib/api/api-client";
import type { RegisterRequestDto } from "@/lib/api/api";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { AUTH_CONSTANTS } from "@/constants/auth.constant";

/**
 * useRegister - Hook for registering a user
 * @returns useMutation hook for registering a user
 */
export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterFormData): Promise<AccessToken> => {
            // Create the register form data
            const registerFormData: RegisterRequestDto = {
                username: data.username,
                email: data.email,
                password: data.password,
            };

            // Register the user
            const response = await ApiClient.api.authControllerRegister(
                registerFormData
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
