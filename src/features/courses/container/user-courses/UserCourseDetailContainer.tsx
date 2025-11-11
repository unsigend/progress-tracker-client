import { UserCourseDetailCard } from "@/features/courses/components/user-courses/UserCourseDetailCard";
import { useNavigate, useParams } from "react-router";
import { useUserCourse } from "@/entities/course/user-courses/hooks/useUserCourse";
import { useDeleteUserCourse } from "@/entities/course/user-courses/hooks/useDeleteUserCourse";
import { useMarkAsComplete } from "@/entities/course/user-courses/hooks/useMarkAsComplete";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { toast } from "sonner";
import { RecordingList } from "@/features/courses/components/recordings/RecordingList";
import { useCourseRecordings } from "@/entities/course/recordings/hooks/useRecordings";

/**
 * UserCourseDetailContainer - Container component for displaying user course details
 * Handles data fetching and action handlers
 * @returns UserCourseDetailContainer component
 */
export const UserCourseDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: userCourse, isLoading } = useUserCourse(id || "");
    const { mutate: deleteUserCourse } = useDeleteUserCourse(id || "");
    const { markAsComplete } = useMarkAsComplete();
    const { data: recordings, isLoading: isLoadingRecordings } =
        useCourseRecordings(id || "");
    /**
     * handleMarkAsComplete - Handler for marking course as complete
     * @description Mark course as complete functionality
     */
    const handleMarkAsComplete = async () => {
        if (!id) return;
        await markAsComplete(id);
        toast.success("Course marked as complete");
    };

    /**
     * handleDelete - Handler for deleting user course
     * @description Delete user course functionality
     */
    const handleDelete = () => {
        if (!id) return;
        deleteUserCourse(undefined, {
            onSuccess: () => {
                toast.success("User course deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME());
            },
        });
    };

    // Determine if user can mark as complete (not already completed)
    const canMarkAsComplete =
        userCourse?.status !== "COMPLETED" && !!userCourse;

    return (
        <div className="lg:w-[80%] mx-auto flex flex-col gap-8">
            <UserCourseDetailCard
                userCourse={userCourse || null}
                isLoading={isLoading}
                canMarkAsComplete={canMarkAsComplete}
                onMarkAsComplete={handleMarkAsComplete}
                onDelete={handleDelete}
            />
            <RecordingList
                recordings={recordings?.recordings ?? []}
                isLoading={isLoadingRecordings}
            />
        </div>
    );
};
