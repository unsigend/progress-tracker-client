import { useMutation } from "@tanstack/react-query";
import { ApiClient } from "@/lib/api/api-client";
import type {
    ReadingRecording,
    ReadingRecordingCreate,
} from "../model/model";
import type { IErrorResponse } from "@/entities/common/models/error";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { BookRecordingCreateRequestDto } from "@/lib/api/api";
import { mapToRecording } from "../model/mapper";

/**
 * useCreateReadingRecording - Hook for creating a reading recording
 * @param userBookId - The ID of the user book to create a recording for
 * @returns The create reading recording mutation
 */
export const useCreateReadingRecording = (userBookId: string) => {
    return useMutation({
        mutationFn: async (
            recording: ReadingRecordingCreate
        ): Promise<ReadingRecording> => {
            const recordingRequestDto: BookRecordingCreateRequestDto = {
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
