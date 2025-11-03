import { useMutation } from "@tanstack/react-query";
import type { IResetToken } from "../models/model";
import type { SendCodeRequestDto } from "@/lib/api/api";
import { ApiClient } from "@/lib/api/api-client";

/**
 * useSendCode - Hook for sending a code to a user's email
 * @returns useMutation hook for sending a code to a user's email
 */
export const useSendCode = () => {
    return useMutation({
        mutationFn: async (email: string): Promise<IResetToken> => {
            // Create the reset token request data
            const resetToken: SendCodeRequestDto = {
                email: email,
            };
            const response = await ApiClient.api.authControllerSendCode(
                resetToken
            );
            return {
                resetToken: response.data.resetToken,
            };
        },
    });
};
