import { useParams } from "react-router";
import { CourseForm } from "@/features/courses/components/courses/CourseForm";

/**
 * CourseEditPage - The page for editing a course
 * @returns CourseEditPage component
 */
export const CourseEditPage = () => {
    const { id } = useParams<{ id: string }>();

    return <CourseForm mode="edit" courseId={id} />;
};
