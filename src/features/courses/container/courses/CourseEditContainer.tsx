import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CourseActionForm } from "@/features/courses/components/courses/CourseActionForm";
import type {
    ICourseCreate,
    ICourseUpdate,
} from "@/entities/course/courses/models/model";
import { useCourse } from "@/entities/course/courses/hooks/useCourse";
import { useUpdateCourse } from "@/entities/course/courses/hooks/useUpdateCourse";
import { useEffect } from "react";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { toast } from "sonner";

/**
 * CourseEditContainer - Container component for editing a course
 * Handles form state and submission logic
 * @returns CourseEditContainer component
 */
export const CourseEditContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: course, isLoading } = useCourse(id || "");
    const { mutate: updateCourse, isPending } = useUpdateCourse(id || "");

    const [formData, setFormData] = useState<ICourseUpdate>({
        name: "",
        description: "",
        source: "",
        officialWebsiteUrl: undefined,
    });

    useEffect(() => {
        if (course) {
            setFormData({
                name: course.name,
                description: course.description || "",
                source: course.source || "",
                officialWebsiteUrl: course.officialWebsiteUrl ?? undefined,
                isPublic: course.isPublic,
                categories: course.categories || [],
            });
        }
    }, [course]);

    /**
     * handleSubmit - Handles the form submission
     * @description Updates the course with the form data
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateCourse(formData, {
            onSuccess: () => {
                toast.success("Course updated successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME());
            },
        });
    };

    /**
     * handleFormDataChange - Handles the form data change
     * @description Sets the form data
     * @param data - The form data
     */
    const handleFormDataChange = (data: ICourseCreate | ICourseUpdate) => {
        setFormData(data as ICourseUpdate);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl">
                <CourseActionForm
                    title="Edit Course"
                    description="Update the course details below"
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                    onSubmit={handleSubmit}
                    action="edit"
                    isPending={isPending}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};
