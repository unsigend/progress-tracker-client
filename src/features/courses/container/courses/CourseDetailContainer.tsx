import { toast } from "sonner";
import { useParams, useNavigate } from "react-router";
import { CourseDetailCard } from "@/features/courses/components/courses/CourseDetailCard";
import { useCourse } from "@/entities/course/courses/hooks/useCourse";
import { useDeleteCourse } from "@/entities/course/courses/hooks/useDeleteCourse";
import { useMe } from "@/entities/users/hooks/useMe";
import { UserRole } from "@/entities/users/models/model";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { useCreateUserCourse } from "@/entities/course/user-courses/hooks/useCreateUserCourse";

/**
 * CourseDetailContainer - Container component for displaying course details
 * Handles data fetching and action handlers
 * @returns CourseDetailContainer component
 */
export const CourseDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: course, isLoading } = useCourse(id || "");
    const { mutate: createUserCourse } = useCreateUserCourse();
    const { data: currentUser } = useMe();

    // Check if user has permission to edit/delete the course
    // User can edit/delete if they created the course or if they are an admin
    const hasPermission =
        !!course &&
        !!currentUser &&
        (course.createdById === currentUser.id ||
            currentUser.role === UserRole.ADMIN);

    /**
     * handleAddClick - Handle add course functionality
     * @description Add course functionality (placeholder - to be implemented)
     */
    const handleAddClick = () => {
        createUserCourse(
            { courseId: id || "" },
            {
                onSuccess: () => {
                    toast.success("Course added successfully");
                    navigate(
                        ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().HOME()
                    );
                },
            }
        );
    };

    /**
     * handleEditClick - Handle edit course functionality
     * @description Edit course functionality
     */
    const handleEditClick = () => {
        if (!id) return;
        navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().EDIT(id));
    };

    /**
     * deleteCourse - Hook for deleting a course
     * @description Delete course functionality
     */
    const { mutate: deleteCourse } = useDeleteCourse(id || "");
    const handleDeleteConfirm = () => {
        if (!id) return;
        deleteCourse(undefined, {
            onSuccess: () => {
                toast.success("Course deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().HOME());
            },
        });
    };

    return (
        <CourseDetailCard
            course={course || null}
            isLoading={isLoading}
            hasPermission={hasPermission}
            onAddClick={handleAddClick}
            onEditClick={handleEditClick}
            onDeleteConfirm={handleDeleteConfirm}
            onBack={() => navigate(-1)}
        />
    );
};
