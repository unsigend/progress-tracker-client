import { useParams } from "react-router";
import { UserBookDetail } from "@/features/reading/components/user-books/UserBookDetail";
import { RecordingList } from "@/features/reading/components/recordings/RecordingList";
import { NotFoundPage } from "@/pages/not-found";

/**
 * UserBookDetailPage - The page for displaying user book details
 * @returns UserBookDetailPage component
 */
export const UserBookDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    
    if (!id) {
        return <NotFoundPage />;
    }
    
    return (
        <div className="lg:w-[80%] mx-auto flex flex-col gap-8">
            <UserBookDetail userBookId={id} />
            <RecordingList userBookId={id} />
        </div>
    );
};
