import { useMutation } from "@tanstack/react-query";
import type { ResetPassword } from "../models/model";
import { ApiClient } from "@/lib/api/api-client";
import type { ResetPasswordRequestDto } from "@/lib/api/api";

/**
 * useResetPassword - Hook for resetting a password
 * @returns useMutation hook for resetting a password
 */
export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (data: ResetPassword): Promise<void> => {
            // Create the reset password request data
            const resetPasswordData: ResetPasswordRequestDto = {
                password: data.newPassword,
                code: data.code,
                resetToken: data.resetToken,
            };
            // Reset the password
            await ApiClient.api.authControllerResetPassword(resetPasswordData);
        },
    });
};
