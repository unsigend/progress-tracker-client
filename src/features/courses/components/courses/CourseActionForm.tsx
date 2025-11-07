import { Link, useNavigate } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    GraduationCap,
    FileText,
    Link as LinkIcon,
    Loader2,
    BookOpen,
    Globe,
    Lock,
} from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { CategorySelector } from "./CategorySelector";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type {
    ICourseCreate,
    ICourseUpdate,
} from "@/entities/course/courses/models/model";

/**
 * CourseActionFormProps - Interface for CourseActionForm component props
 */
interface CourseActionFormProps {
    title: string;
    description: string;
    formData: ICourseCreate | ICourseUpdate;
    onFormDataChange: (data: ICourseCreate | ICourseUpdate) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    action: "add" | "edit";
    isLoading?: boolean;
    isPending?: boolean;
}

/**
 * CourseActionForm - Pure UI component for adding/editing a course
 * @param props - The props for the CourseActionForm component
 * @param props.title - Form title
 * @param props.description - Form description
 * @param props.formData - Current form data
 * @param props.onFormDataChange - Handler for form data changes
 * @param props.onSubmit - Handler for form submission
 * @param props.action - Action type: "add" or "edit"
 * @param props.isLoading - Whether data is loading (shows spinner overlay)
 * @param props.isPending - Whether form submission is pending (shows button text)
 * @returns CourseActionForm component
 */
export const CourseActionForm = ({
    title,
    description,
    formData,
    onFormDataChange,
    onSubmit,
    action,
    isLoading = false,
    isPending = false,
}: CourseActionFormProps) => {
    const navigate = useNavigate();
    const handleInputChange = <K extends keyof (ICourseCreate & ICourseUpdate)>(
        field: K,
        value: string | undefined | File | boolean | string[]
    ) => {
        onFormDataChange({
            ...formData,
            [field]: value,
        } as ICourseCreate | ICourseUpdate);
    };

    return (
        <Card className="min-h-[600px]">
            <CardHeader>
                {/* Back Button - Top Left */}
                <div className="flex items-center justify-start mb-4">
                    <BackButton onClick={() => navigate(-1)} />
                </div>

                {/* Header Section */}
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                        <GraduationCap className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <CardTitle className="text-2xl font-semibold text-foreground mb-2">
                            {title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="size-6 animate-spin" />
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {/* Course Name Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <BookOpen className="w-4 h-4" />
                                Course Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter course name"
                                value={formData.name || ""}
                                onChange={(e) =>
                                    handleInputChange("name", e.target.value)
                                }
                                className="w-full transition-all duration-200"
                            />
                        </div>

                        {/* Course Description Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <FileText className="w-4 h-4" />
                                Description
                            </Label>
                            <textarea
                                id="description"
                                placeholder="Enter course description"
                                value={formData.description || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full min-h-[150px] px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-background text-foreground transition-all duration-200"
                            />
                        </div>

                        {/* Publicity Toggle */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                {formData.isPublic ? (
                                    <Globe className="w-4 h-4" />
                                ) : (
                                    <Lock className="w-4 h-4" />
                                )}
                                Visibility
                            </Label>
                            <div className="flex items-center gap-3 p-4 border border-border rounded-md bg-background">
                                <Switch
                                    id="isPublic"
                                    checked={formData.isPublic ?? false}
                                    onCheckedChange={(checked) =>
                                        handleInputChange("isPublic", checked)
                                    }
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor="isPublic"
                                        className="text-sm font-medium text-foreground cursor-pointer"
                                    >
                                        {formData.isPublic
                                            ? "Public"
                                            : "Private"}
                                    </Label>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {formData.isPublic
                                            ? "Anyone can view this course"
                                            : "Only you can view this course"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Categories Section */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <BookOpen className="w-4 h-4" />
                                Categories
                            </Label>
                            <CategorySelector
                                selectedCategories={formData.categories || []}
                                onCategoriesChange={(categories) =>
                                    handleInputChange("categories", categories)
                                }
                            />
                        </div>

                        {/* Course Source and Site URL Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Course Source Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="source"
                                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                                >
                                    <FileText className="w-4 h-4" />
                                    Course Source
                                </Label>
                                <Input
                                    id="source"
                                    type="text"
                                    placeholder="e.g., MIT, Stanford, Harvard, Berkeley..."
                                    value={formData.source || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "source",
                                            e.target.value
                                        )
                                    }
                                    className="w-full transition-all duration-200"
                                />
                            </div>

                            {/* Site URL Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="officialWebsiteUrl"
                                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    Course Website
                                </Label>
                                <Input
                                    id="officialWebsiteUrl"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={formData.officialWebsiteUrl || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "officialWebsiteUrl",
                                            e.target.value
                                        )
                                    }
                                    className="w-full transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-border">
                            <Link
                                to={ROUTES_CONSTANTS.DASHBOARD()
                                    .COURSES()
                                    .HOME()}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6 transition-all duration-200"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                className="px-6 transition-all duration-200"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {action === "add"
                                            ? "Creating Course..."
                                            : "Updating Course..."}
                                    </>
                                ) : action === "add" ? (
                                    "Create Course"
                                ) : (
                                    "Update Course"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};
