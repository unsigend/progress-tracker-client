import { Link, useNavigate } from "react-router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, User, FileText, Hash, Image, Loader2 } from "lucide-react";
import { BackButton } from "@/components/common/BackButton";
import { FileUpload } from "@/components/common/FileUpload";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import type {
    BookCreate,
    BookUpdate,
} from "@/entities/reading/books/models/model";
import { TextUtils } from "@/lib/utils/text";

/**
 * BookActionFormProps - Interface for BookActionForm component props
 */
interface BookActionFormProps {
    title: string;
    description: string;
    formData: BookCreate | BookUpdate;
    onFormDataChange: (data: BookCreate | BookUpdate) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    action: "add" | "edit";
    onFileUpload?: (file: File) => Promise<void>;
    isLoading?: boolean;
}

/**
 * BookActionForm - Pure UI component for adding/editing a book
 * @param props - The props for the BookActionForm component
 * @param props.title - Form title
 * @param props.description - Form description
 * @param props.formData - Current form data
 * @param props.onFormDataChange - Handler for form data changes
 * @param props.onSubmit - Handler for form submission
 * @param props.action - Action type: "add" or "edit"
 * @param props.onFileUpload - Handler for file upload
 * @param props.isLoading - Whether data is loading
 * @param props.onBack - Handler for back button click
 * @returns BookActionForm component
 */
export const BookActionForm = ({
    title,
    description,
    formData,
    onFormDataChange,
    onSubmit,
    action,
    onFileUpload,
    isLoading = false,
}: BookActionFormProps) => {
    const navigate = useNavigate();
    const handleInputChange = <K extends keyof (BookCreate & BookUpdate)>(
        field: K,
        value: string | number | undefined | File
    ) => {
        onFormDataChange({
            ...formData,
            [field]: value,
        } as BookCreate | BookUpdate);
    };

    return (
        <Card>
            <CardHeader className="text-center">
                {/* Back Button - Top Left */}
                <div className="flex items-center justify-start mb-2">
                    <BackButton onClick={() => navigate(-1)} />
                </div>

                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-muted rounded-full">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground">
                    {title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">{description}</p>
            </CardHeader>

            <CardContent className="min-h-[800px]">
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="size-6 animate-spin" />
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={onSubmit}>
                        {/* Title Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="title"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <BookOpen className="w-4 h-4" />
                                Book Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter book title"
                                value={formData.title || ""}
                                onChange={(e) =>
                                    handleInputChange("title", e.target.value)
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Author Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="author"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <User className="w-4 h-4" />
                                Author
                            </Label>
                            <Input
                                id="author"
                                type="text"
                                placeholder="Enter author name"
                                value={formData.author || ""}
                                onChange={(e) =>
                                    handleInputChange("author", e.target.value)
                                }
                                className="w-full"
                            />
                        </div>

                        {/* Description Field */}
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
                                placeholder="Enter book description"
                                value={formData.description || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="w-full min-h-[200px] px-3 py-2 border border-input 
                            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring
                             focus:border-transparent resize-none bg-background text-foreground"
                            />
                        </div>

                        {/* Pages Field */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="pages"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <FileText className="w-4 h-4" />
                                Pages
                            </Label>
                            <Input
                                id="pages"
                                type="number"
                                placeholder="Number of pages"
                                value={formData.pages || ""}
                                onChange={(e) =>
                                    handleInputChange(
                                        "pages",
                                        e.target.value === ""
                                            ? undefined
                                            : parseInt(e.target.value, 10)
                                    )
                                }
                                className="w-full"
                            />
                        </div>

                        {/* ISBN 10 and ISBN 13 Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* ISBN 10 Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="isbn10"
                                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                                >
                                    <Hash className="w-4 h-4" />
                                    ISBN 10
                                </Label>
                                <Input
                                    id="isbn10"
                                    type="text"
                                    placeholder="Enter ISBN 10"
                                    value={formData.ISBN10 || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "ISBN10",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>

                            {/* ISBN 13 Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="isbn13"
                                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                                >
                                    <Hash className="w-4 h-4" />
                                    ISBN 13
                                </Label>
                                <Input
                                    id="isbn13"
                                    type="text"
                                    placeholder="Enter ISBN 13"
                                    value={formData.ISBN13 || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "ISBN13",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Cover Image Section */}
                        <div className="space-y-4">
                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Image className="w-4 h-4" />
                                Cover Image
                            </Label>

                            {onFileUpload && (
                                <div className="space-y-2">
                                    <FileUpload
                                        handleUpload={onFileUpload}
                                        text="Choose Cover Image"
                                        icon={<Image className="w-4 h-4" />}
                                        acceptedFileTypes="image/*"
                                        maxFileSizeMB={1}
                                        className="w-full"
                                    />

                                    {/* Show selected file name */}
                                    {formData.coverImage && (
                                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                            <Image className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-foreground">
                                                {formData.coverImage.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                (
                                                {TextUtils.formatFileSize(
                                                    formData.coverImage.size
                                                )}{" "}
                                                MB)
                                            </span>
                                        </div>
                                    )}

                                    <p className="text-xs text-muted-foreground">
                                        Upload an image file (PNG, JPG, GIF up
                                        to 1MB)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                to={ROUTES_CONSTANTS.DASHBOARD()
                                    .READING()
                                    .BOOKS()
                                    .LIST()}
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="px-6"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" className="px-6">
                                {action === "add" ? "Add Book" : "Update Book"}
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    );
};
