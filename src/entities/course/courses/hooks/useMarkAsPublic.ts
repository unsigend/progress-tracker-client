import type { CourseResponseDto } from "@/lib/api/api";
import { ApiClient } from "@/lib/api/api-client";
import { mapToCourse } from "../models/mapper";
import type { ICourse } from "../models/model";
import type { IErrorResponse } from "@/entities/common/models/error";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { API_KEY_FACTORY } from "@/lib/api/api-key-factory";
import { useQueryClient } from "@tanstack/react-query";

/**
 * useMarkAsPublic - Hook for marking a course as public
 * @returns useMutation hook for marking a course as public
 */
export const useMarkAsPublic = () => {
    const queryClient = useQueryClient();
    const markAsPublic = async (id: string): Promise<ICourse> => {
        const response = await ApiClient.api.courseControllerUpdate(id, {
            isPublic: true,
        });
        if (response.status !== HttpStatusCode.Ok) {
            const errorModel: IErrorResponse =
                response.data as unknown as IErrorResponse;
            toast.error(errorModel.message);
        }
        const courseResponse: CourseResponseDto = response.data;

        // invalidate queries
        queryClient.invalidateQueries({
            queryKey: API_KEY_FACTORY().COURSES.MY_COURSES(true),
        });
        return mapToCourse(courseResponse);
    };

    return { markAsPublic };
};
