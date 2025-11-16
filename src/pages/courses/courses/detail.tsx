import { useParams } from "react-router";
import { CourseDetail } from "@/features/courses/components/courses/CourseDetail";
import { NotFoundPage } from "@/pages/not-found";

/**
 * CourseDetailPage - The page for displaying course details
 * @returns CourseDetailPage component
 */
export const CourseDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <NotFoundPage />;
    }

    return <CourseDetail courseId={id} />;
};
