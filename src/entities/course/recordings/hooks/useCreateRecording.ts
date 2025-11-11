import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { ICourseRecordingCreate } from "../models/model";
import type { ICourseRecording } from "../models/model";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { CourseRecordingCreateRequestDto } from "@/lib/api/api";
import { mapToCourseRecording } from "../models/mapper";

/**
 * useCreateCourseRecording - Hook for creating a course recording
 */
export const useCreateCourseRecording = (userCourseId: string) => {
    return useMutation({
        mutationFn: async (
            recording: ICourseRecordingCreate
        ): Promise<ICourseRecording> => {
            const recordingRequestDto: CourseRecordingCreateRequestDto = {
                date: recording.date,
                minutes: recording.minutes,
                recordType: recording.recordType,
                notes: recording.notes,
            };
            const response =
                await ApiClient.api.userCourseControllerCreateRecording(
                    userCourseId,
                    recordingRequestDto
                );
            return mapToCourseRecording(response.data);
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
