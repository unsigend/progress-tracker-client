import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import type { UserUpdate } from "@/entities/users/models/model";
import type { UserResponseDto, UserUpdateRequestDto } from "@/lib/api/api";
import type { IErrorResponse } from "@/entities/common/models/error";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { mapToUser } from "../models/mapper";
import { ContentType } from "@/lib/api/api";

/**
 * useUpdateUser - Hook for updating a user
 * @param id - The id of the user to update
 * @returns useMutation hook for updating a user
 */
export const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UserUpdate) => {
            const formData: FormData = new FormData();
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
            const response = await ApiClient.api.userControllerUpdate(
                id,
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
                queryKey: API_KEY_FACTORY().USERS.DETAIL(id),
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
