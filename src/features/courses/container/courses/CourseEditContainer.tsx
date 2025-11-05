import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CourseActionForm } from "@/features/courses/components/courses/CourseActionForm";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type {
    ICourseCreate,
    ICourseUpdate,
} from "@/entities/course/courses/models/model";

/**
 * CourseEditContainer - Container component for editing a course
 * Handles form state and submission logic
 * @returns CourseEditContainer component
 */
export const CourseEditContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    // TODO: Implement useCourse and useUpdateCourse hooks
    // const { data: course, isLoading: isLoadingCourse } = useCourse(id || "");
    // const { mutate: updateCourse, isPending } = useUpdateCourse();

    const [formData, setFormData] = useState<ICourseUpdate>({
        name: "",
        description: "",
        source: "",
        officialWebsite: "",
        courseImage: undefined,
    });

    // TODO: Load course data when component mounts
    // useEffect(() => {
    //     if (course) {
    //         setFormData({
    //             name: course.name,
    //             description: course.description || "",
    //             source: course.source || "",
    //             officialWebsite: course.officialWebsite || "",
    //         });
    //     }
    // }, [course]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: Implement validation and submission logic
        // Simple validation
        // if (formData.name === "") {
        //     toast.error("Course name is required");
        //     return;
        // }

        // Build course update data using ICourseUpdate from model
        // const courseData: ICourseUpdate = {};

        // if (formData.name) courseData.name = formData.name;
        // if (formData.description !== undefined) courseData.description = formData.description;
        // if (formData.source !== undefined) courseData.source = formData.source;
        // if (formData.officialWebsite !== undefined) courseData.officialWebsite = formData.officialWebsite;
        // if (formData.courseImage) courseData.courseImage = formData.courseImage;

        // updateCourse({ id: id || "", data: courseData }, {
        //     onSuccess: () => {
        //         toast.success("Course updated successfully");
        //         navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().HOME());
        //     },
        // });
    };

    const handleFileUpload = async (file: File) => {
        setFormData((prev) => ({
            ...prev,
            courseImage: file,
        }));
    };

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
                    onFileUpload={handleFileUpload}
                    isPending={false}
                    isLoading={false}
                />
            </div>
        </div>
    );
};
