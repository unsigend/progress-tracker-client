import { useMutation } from "@tanstack/react-query";
import type { VerifyCodeRequestDto } from "@/lib/api/api";
import { ApiClient } from "@/lib/api/api-client";
import type { IVerifyCode } from "../models/model";

/**
 * useVerifyCode - Hook for verifying a code
 * @returns useMutation hook for verifying a code
 */
export const useVerifyCode = () => {
    return useMutation({
        mutationFn: async (data: IVerifyCode): Promise<boolean> => {
            // Create the verify code request data
            const verifyCodeData: VerifyCodeRequestDto = {
                code: data.code,
                resetToken: data.resetToken,
            };
            // Verify the code
            const response = await ApiClient.api.authControllerVerifyCode(
                verifyCodeData
            );
            return response.data.isValid;
        },
    });
};
