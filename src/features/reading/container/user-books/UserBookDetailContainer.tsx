import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { UserBookShowCard } from "@/features/reading/components/user-books/UserBookShowCard";
import { RecordingList } from "@/features/reading/components/recordings/RecordingList";
import { useUserBook } from "@/entities/reading/user-books/hooks/useUserBook";
import { useDeleteUserBook } from "@/entities/reading/user-books/hooks/useDeleteUserBook";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useDeleteRecordings } from "@/entities/reading/recordings/hooks/useDeleteRecordings";
import { useRecordings } from "@/entities/reading/recordings/hooks/useRecordings";

/**
 * UserBookDetailContainer - Container component for displaying user book and recording details
 * Handles data fetching and action handlers
 * @returns UserBookDetailContainer component
 */
export const UserBookDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: userBook, isLoading: isLoadingUserBook } = useUserBook(
        id || ""
    );
    const { mutate: deleteUserBook } = useDeleteUserBook(id || "");
    const { mutate: deleteRecordings } = useDeleteRecordings(id || "");
    const { data: recordings, isLoading: isLoadingRecordings } = useRecordings(
        id || ""
    );

    /**
     * handleDelete - Handler for deleting user book
     * @description Delete user book functionality
     */
    const handleDelete = () => {
        deleteUserBook(undefined, {
            onSuccess: () => {
                toast.success("Book deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().READING().HOME());
            },
        });
    };

    /**
     * handleDeleteRecordings - Handler for deleting recordings
     * @description Delete recordings functionality
     */
    const handleDeleteRecordings = () => {
        deleteRecordings(undefined, {
            onSuccess: () => {
                toast.success("Auto-merged recordings");
            },
        });
    };

    return (
        <div className="lg:w-[80%] mx-auto flex flex-col gap-8">
            <UserBookShowCard
                userBook={userBook || null}
                isLoading={isLoadingUserBook}
                onDelete={handleDelete}
            />
            <RecordingList
                recordings={recordings?.recordings ?? []}
                isLoading={isLoadingRecordings}
                onDelete={handleDeleteRecordings}
            />
        </div>
    );
};
