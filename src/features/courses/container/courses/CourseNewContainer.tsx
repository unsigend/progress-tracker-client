import { useState } from "react";
import { useNavigate } from "react-router";
import { CourseActionForm } from "@/features/courses/components/courses/CourseActionForm";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type {
    CourseCreate,
    CourseUpdate,
} from "@/entities/course/courses/models/model";
import { useCreateCourse } from "@/entities/course/courses/hooks/useCreateCourse";
import { toast } from "sonner";

/**
 * CourseNewContainer - Container component for creating a new course
 * Handles form state and submission logic
 * @returns CourseNewContainer component
 */
export const CourseNewContainer = () => {
    const navigate = useNavigate();
    const { mutate: createCourse, isPending } = useCreateCourse();

    const [formData, setFormData] = useState<CourseCreate>({
        name: "",
        description: "",
        source: "",
        officialWebsiteUrl: undefined,
        isPublic: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || formData.name.trim() === "") {
            toast.error("Course name is required");
            return;
        }

        createCourse(formData, {
            onSuccess: () => {
                toast.success("Course created successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME());
            },
        });
    };

    const handleFormDataChange = (data: CourseCreate | CourseUpdate) => {
        setFormData(data as CourseCreate);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl">
                <CourseActionForm
                    title="Create New Course"
                    description="Fill in the details to add a new course to your collection"
                    formData={formData}
                    onFormDataChange={handleFormDataChange}
                    onSubmit={handleSubmit}
                    action="add"
                    isPending={isPending}
                />
            </div>
        </div>
    );
};
