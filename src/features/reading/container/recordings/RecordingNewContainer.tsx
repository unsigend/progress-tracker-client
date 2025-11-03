import { useState } from "react";
import { RecordingNewForm } from "@/features/reading/components/recordings/RecordingNewForm";
import { useUserBooks } from "@/entities/reading/user-books/hooks/useUserBooks";
import type { IRecordingCreate } from "@/entities/reading/recordings/model/model";
import { toast } from "sonner";
import { useCreateRecording } from "@/entities/reading/recordings/hooks/useCreateRecording";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useNavigate } from "react-router";

/**
 * RecordingNewContainer - Container component for creating a new recording
 * Handles form state and submission logic
 * @returns RecordingNewContainer component
 */
export const RecordingNewContainer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IRecordingCreate>({
        date: "",
        pages: 0,
        minutes: 0,
        notes: "",
    });
    const [selectedUserBookId, setSelectedUserBookId] = useState<string>("");
    const { mutate: createRecording } = useCreateRecording(selectedUserBookId);
    const { data: userBooks, isLoading } = useUserBooks({
        field: "status",
        value: "IN_PROGRESS",
        sort: "startDate",
        order: "desc",
        page: 1,
        limit: 10,
    });

    /**
     * handleSubmit - Handler for form submission
     * @param e - Form event
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedUserBookId) {
            toast.error("Please select a book");
            return;
        }

        if (!formData.date) {
            toast.error("Please select a date");
            return;
        }
        if (!formData.pages) {
            toast.error("Please select a number of pages");
            return;
        }

        createRecording(formData, {
            onSuccess: () => {
                toast.success("Recording created successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl">
                <RecordingNewForm
                    formData={formData}
                    onFormDataChange={setFormData}
                    onSubmit={handleSubmit}
                    userBooks={userBooks?.userBooks || []}
                    isLoading={isLoading}
                    selectedUserBookId={selectedUserBookId}
                    onUserBookIdChange={setSelectedUserBookId}
                    isSubmitting={false}
                />
            </div>
        </div>
    );
};
