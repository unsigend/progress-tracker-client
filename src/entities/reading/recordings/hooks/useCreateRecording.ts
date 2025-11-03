import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type { IRecording, IRecordingCreate } from "../model/model";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { RecordingCreateRequestDto } from "@/lib/api/api";
import { mapToRecording } from "../model/mapper";

/**
 * useCreateRecording - Hook for creating a recording
 * @param userBookId - The ID of the user book to create a recording for
 * @returns The create recording mutation
 */
export const useCreateRecording = (userBookId: string) => {
    return useMutation({
        mutationFn: async (
            recording: IRecordingCreate
        ): Promise<IRecording> => {
            const recordingRequestDto: RecordingCreateRequestDto = {
                date: recording.date,
                pages: recording.pages,
                minutes: recording.minutes,
                notes: recording.notes,
            };
            const response =
                await ApiClient.api.userBookControllerCreateRecording(
                    userBookId,
                    recordingRequestDto
                );
            return mapToRecording(response.data);
        },
        onError: (error: AxiosError<IErrorResponse>) => {
            const errorModel: IErrorResponse = error.response
                ?.data as IErrorResponse;
            toast.error(errorModel.message);
        },
    });
};
