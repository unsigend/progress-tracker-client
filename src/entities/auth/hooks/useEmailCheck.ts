import { ApiClient } from "@/lib/api/api-client";
import { useMutation } from "@tanstack/react-query";
import type { EmailCheckResponseDto } from "@/lib/api/api";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * useEmailCheck - Hook for checking if an email is already in use
 * @returns useMutation hook for checking if an email is already in use
 */
export const useEmailCheck = () => {
    return useMutation({
        mutationFn: async (email: string): Promise<boolean> => {
            // Check if the email is already in use
            const response = await ApiClient.api.authControllerEmailCheck(
                email
            );

            // Return the email check response
            const emailCheckResponseDto: EmailCheckResponseDto = response.data;
            return emailCheckResponseDto.isAvailable;
        },
        retry: false,
        onError: (error: AxiosError<IErrorResponse>) => {
            // Show error toast
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
