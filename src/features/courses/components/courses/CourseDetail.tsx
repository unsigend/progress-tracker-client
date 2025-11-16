import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Loader2,
    GraduationCap,
    ExternalLink,
    Globe,
    Lock,
} from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { useCourse } from "@/features/courses/api/courses/hooks/useCourse";
import { useDeleteCourse } from "@/features/courses/api/courses/hooks/useDeleteCourse";
import { useCreateUserCourse } from "@/features/courses/api/user-courses/hooks/useCreateUserCourse";
import { useMe } from "@/entities/users/hooks/useMe";
import { UserRole } from "@/entities/users/models/model";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";

/**
 * CourseDetailProps - Interface for CourseDetail component props
 */
interface CourseDetailProps {
    courseId: string;
}

/**
 * CourseDetail - Smart component for displaying course details
 * Handles data fetching, actions (add, edit, delete), and UI rendering
 * @param props - The props for the CourseDetail component
 * @param props.courseId - The course ID to display
 * @returns CourseDetail component
 */
export const CourseDetail = ({ courseId }: CourseDetailProps) => {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { data: course, isLoading } = useCourse(courseId);
    const { mutate: createUserCourse } = useCreateUserCourse();
    const { data: currentUser } = useMe();
    const { mutate: deleteCourse } = useDeleteCourse(courseId);

    // Check if user has permission to edit/delete
    const hasPermission =
        !!course &&
        !!currentUser &&
        (course.createdById === currentUser.id ||
            currentUser.role === UserRole.ADMIN);

    const handleAddClick = () => {
        createUserCourse(
            { courseId },
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

    const handleEditClick = () => {
        navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().EDIT(courseId));
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        deleteCourse(undefined, {
            onSuccess: () => {
                toast.success("Course deleted successfully");
                navigate(ROUTES_CONSTANTS.DASHBOARD().COURSES().LIST().HOME());
            },
        });
    };

    return (
        <div className="w-full max-w-7xl">
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-8 sm:p-10 lg:p-12">
                    {/* Navigation Buttons */}
                    <div className="mb-8 sm:mb-10 flex justify-between items-center">
                        {/* Back Button */}
                        <BackButton onClick={() => navigate(-1)} />

                        {/* Actions Dropdown Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="shadow-sm"
                                >
                                    Actions
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleAddClick}>
                                    Add
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleEditClick}
                                    disabled={!hasPermission}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={handleDeleteClick}
                                    disabled={!hasPermission}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <Loader2 className="size-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : course ? (
                        <div className="space-y-10 sm:space-y-12">
                            {/* Header Section */}
                            <div className="space-y-6 sm:space-y-8">
                                {/* Course Info */}
                                <div className="space-y-5 sm:space-y-6">
                                    {/* Title */}
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
                                            {course.name}
                                        </h1>
                                    </div>

                                    {/* Source */}
                                    {course.source &&
                                        course.source.trim() !== "" && (
                                            <div className="flex items-center gap-2.5">
                                                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/70 flex-shrink-0" />
                                                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/80 font-medium">
                                                    {course.source}
                                                </p>
                                            </div>
                                        )}

                                    {/* Visibility Badge and Course Website Row */}
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                        {/* Visibility Badge */}
                                        <div className="flex items-center gap-2">
                                            {course.isPublic ? (
                                                <>
                                                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/70" />
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs sm:text-sm font-normal px-3 py-1.5 bg-muted/50 text-muted-foreground border-0"
                                                    >
                                                        Public
                                                    </Badge>
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/70" />
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs sm:text-sm font-normal px-3 py-1.5 bg-muted/50 text-muted-foreground border-0"
                                                    >
                                                        Private
                                                    </Badge>
                                                </>
                                            )}
                                        </div>

                                        {/* Course Website */}
                                        {course.officialWebsiteUrl &&
                                            course.officialWebsiteUrl.trim() !==
                                                "" && (
                                                <a
                                                    href={
                                                        course.officialWebsiteUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm sm:text-base font-medium"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span>
                                                        Visit Course Website
                                                    </span>
                                                </a>
                                            )}
                                    </div>

                                    {/* Categories */}
                                    {course.categories &&
                                        course.categories.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                                <span className="text-sm sm:text-base font-semibold text-foreground/90">
                                                    Categories:
                                                </span>
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    {course.categories
                                                        .filter(
                                                            (cat) =>
                                                                cat &&
                                                                cat.trim() !==
                                                                    ""
                                                        )
                                                        .map(
                                                            (
                                                                category,
                                                                index
                                                            ) => (
                                                                <Badge
                                                                    key={index}
                                                                    variant="secondary"
                                                                    className="text-xs sm:text-sm font-normal px-3.5 py-1.5 bg-muted/50 hover:bg-muted/70 text-muted-foreground border-0 transition-colors"
                                                                >
                                                                    {category
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase() +
                                                                        category.slice(
                                                                            1
                                                                        )}
                                                                </Badge>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>

                            {/* Description Section */}
                            {course.description &&
                                course.description.trim() !== "" && (
                                    <div className="space-y-4 sm:space-y-5 pt-6 sm:pt-8 border-t border-border/50">
                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                            About This Course
                                        </h2>
                                        <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed whitespace-pre-wrap">
                                            {course.description}
                                        </p>
                                    </div>
                                )}

                            {/* Metadata */}
                            <div className="pt-6 sm:pt-8 border-t border-border/50">
                                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground/70">
                                    <span>
                                        Created:{" "}
                                        {new Date(
                                            course.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                    {course.updatedAt !== course.createdAt && (
                                        <span>
                                            Updated:{" "}
                                            {new Date(
                                                course.updatedAt
                                            ).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground text-lg sm:text-xl">
                                Course not found
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <DeleteDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                title="Delete Course"
                description="Are you sure you want to delete this course? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};
