import { COURSE_CONSTANTS } from "@/constants/course.constant";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useCreateCourseRecording } from "@/entities/course/recordings/hooks/useCreateRecording";
import type { CourseRecordingCreate } from "@/entities/course/recordings/models/model";
import { useUserCourses } from "@/entities/course/user-courses/hooks/useUserCourses";
import { RecordingNewForm } from "@/features/courses/components/recordings/RecordingNewForm";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

/**
 * RecordingNewContainer - Container component for creating a new recording
 * Handles form state and submission logic
 * @returns RecordingNewContainer component
 */
export const RecordingNewContainer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CourseRecordingCreate>({
        date: "",
        minutes: 0,
        recordType: "",
        notes: "",
    });
    const [selectedUserCourseId, setSelectedUserCourseId] =
        useState<string>("");
    const { mutate: createRecording, isPending } =
        useCreateCourseRecording(selectedUserCourseId);
    const { data: userCourses, isLoading } = useUserCourses({
        field: "status",
        value: "IN_PROGRESS",
        sort: COURSE_CONSTANTS.USER_COURSE.DEFAULT_SORT,
        order: COURSE_CONSTANTS.USER_COURSE.DEFAULT_ORDER,
        page: COURSE_CONSTANTS.USER_COURSE.DEFAULT_PAGE,
        limit: COURSE_CONSTANTS.USER_COURSE.DEFAULT_LIMIT,
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedUserCourseId) {
            toast.error("Please select a course");
            return;
        }

        if (!formData.date) {
            toast.error("Please select a date");
            return;
        }

        if (!formData.minutes) {
            toast.error("Please select a number of minutes");
            return;
        }

        if (!formData.recordType) {
            toast.error("Please select a record type");
            return;
        }

        createRecording(formData, {
            onSuccess: () => {
                toast.success("Recording created successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME());
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
                    userCourses={userCourses?.userCourses || []}
                    isLoading={isLoading}
                    selectedUserCourseId={selectedUserCourseId}
                    onUserCourseIdChange={setSelectedUserCourseId}
                    isSubmitting={isPending}
                />
            </div>
        </div>
    );
};
