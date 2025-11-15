import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import { mapToUser } from "@/entities/users/models/mapper";
import type { UserUpdate } from "@/entities/users/models/model";
import type { UserResponseDto, UserUpdateRequestDto } from "@/lib/api/api";
import { ContentType } from "@/lib/api/api";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { AxiosError } from "axios";

/**
 * useUpdateMe - Hook for updating the current user
 * @returns useUpdateMe hook
 */
export const useUpdateMe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UserUpdate) => {
            const formData = new FormData();
            if (data.username) {
                formData.append("username", data.username);
            }
            if (data.email) {
                formData.append("email", data.email);
            }
            if (data.password) {
                formData.append("password", data.password);
            }
            if (data.avatarImage) {
                formData.append("avatarImage", data.avatarImage);
            }

            const response =
                await ApiClient.api.userControllerUpdateCurrentUser(
                    formData as UserUpdateRequestDto,
                    {
                        type: ContentType.FormData,
                    }
                );
            const user: UserResponseDto = response.data;
            return mapToUser(user);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: API_KEY_FACTORY().USERS.ME(),
            });
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            // Show error toast
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
