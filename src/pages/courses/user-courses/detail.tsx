import { useParams } from "react-router";
import { UserCourseDetail } from "@/features/courses/components/user-courses/UserCourseDetail";
import { RecordingList } from "@/features/courses/components/recordings/RecordingList";
import { NotFoundPage } from "@/pages/not-found";

/**
 * UserCourseDetailPage - The page for displaying user course details
 * @returns UserCourseDetailPage component
 */
export const UserCourseDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <NotFoundPage />;
    }

    return (
        <div className="lg:w-[80%] mx-auto flex flex-col gap-6">
            <UserCourseDetail userCourseId={id} />
            <RecordingList userCourseId={id} />
        </div>
    );
};
